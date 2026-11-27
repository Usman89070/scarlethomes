<?php
declare(strict_types=1);
/*
 * POST /api/enquiry.php - contact form (#sh-cform).
 * Responds in the Contact Form 7 JSON shape the reference front-end script already reads:
 *   { status: "mail_sent" | "validation_failed" | "mail_failed", message, invalid_fields: [{field, message}] }
 * Validation messages are the reference CF7 form's own.
 */
require __DIR__ . '/lib/bootstrap.php';
require __DIR__ . '/lib/mailer.php';

method('POST');
same_origin_or_fail();

const SERVICES = ['Duplex', 'Knockdown Rebuild', 'New Home', 'Granny Flat', 'Not sure yet'];

function cf7(string $status, string $message, array $invalid = [], int $http = 200): void
{
    $fields = [];
    foreach ($invalid as $f => $m) {
        $fields[] = ['field' => $f, 'message' => $m, 'idref' => null, 'error_id' => 'wpcf7-f84-o1-ve-' . $f];
    }
    json_out(['contact_form_id' => 84, 'status' => $status, 'message' => $message, 'invalid_fields' => $fields, 'into' => '#wpcf7-f84-o1'], $http);
}

$in = body();

// Honeypot: real visitors never see or fill this field. Pretend success, store nothing.
if (str_in($in, 'website') !== '') {
    cf7('mail_sent', 'Thank you for your message. It has been sent.');
}

$name    = str_in($in, 'your-name', 120);
$phone   = str_in($in, 'your-phone', 40);
$email   = str_in($in, 'your-email', 190);
$suburb  = str_in($in, 'your-suburb', 120);
$service = str_in($in, 'your-service', 60);
$message = text_in($in, 'your-message', 5000);
if (!in_array($service, SERVICES, true)) $service = '';

$invalid = [];
if ($name === '') $invalid['your-name'] = 'Please fill out this field.';
if ($phone === '') $invalid['your-phone'] = 'Please fill out this field.';
elseif (!preg_match('/^[+]?[0-9() -]*[0-9][0-9() -]*$/', $phone)) $invalid['your-phone'] = 'Please enter a telephone number.';
if (!valid_email($email)) $invalid['your-email'] = 'Please enter an email address.';
if ($invalid) {
    cf7('validation_failed', 'One or more fields have an error. Please check and try again.', $invalid);
}

// Per-IP rate limit
$ip = ip_hash();
$max = (int)(cfg('enquiry.max_per_hour_per_ip') ?: 5);
$st = db()->prepare('SELECT COUNT(*) FROM enquiries WHERE ip_hash = ? AND created_at > (UTC_TIMESTAMP() - INTERVAL 1 HOUR)');
$st->execute([$ip]);
if ((int)$st->fetchColumn() >= $max) {
    cf7('mail_failed', 'Too many enquiries from this connection. Please call us on 1800 727 538.', [], 429);
}

$page = str_in(['r' => $_SERVER['HTTP_REFERER'] ?? ''], 'r', 255);
$ua = str_in(['u' => $_SERVER['HTTP_USER_AGENT'] ?? ''], 'u', 255);

$id = null;
try {
    $st = db()->prepare('INSERT INTO enquiries (name, phone, email, suburb, service, message, page_url, ip_hash, user_agent) VALUES (?,?,?,?,?,?,?,?,?)');
    $st->execute([$name, $phone, $email, $suburb, $service, $message, $page, $ip, $ua]);
    $id = (int)db()->lastInsertId();
} catch (Throwable $e) {
    error_log('[scarlet api] enquiry insert failed: ' . $e->getMessage());
}

$body = "New enquiry from the Scarlet Homes website\n\n"
      . "Name:    $name\nPhone:   $phone\nEmail:   $email\nSuburb:  " . ($suburb ?: '-') . "\n"
      . "Build:   " . ($service ?: '-') . "\n\nMessage:\n" . ($message ?: '-') . "\n\n"
      . "Page: " . ($page ?: '-') . "\nReceived: " . gmdate('Y-m-d H:i') . " UTC" . ($id ? "  (enquiry #$id)" : '') . "\n";
$sent = send_mail((string)cfg('mail.to'), 'Website enquiry: ' . $name . ($service ? " ($service)" : ''), $body, $email);

if ($id) {
    db()->prepare('UPDATE enquiries SET mail_status = ? WHERE id = ?')->execute([$sent ? 'sent' : 'failed', $id]);
}
if (!$id && !$sent) {
    cf7('mail_failed', 'There was an error trying to send your message. Please try again later.', [], 500);
}
// Stored and/or emailed: the enquiry is not lost (admins also see it in the portal).
cf7('mail_sent', 'Thank you for your message. It has been sent.');
