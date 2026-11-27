<?php
declare(strict_types=1);

/*
 * Minimal mail sender: PHP mail() or authenticated SMTP (SSL on 465 or STARTTLS on 587).
 * Plain-text UTF-8 messages only. Returns true on success; errors go to the server log.
 */

function send_mail(string $to, string $subject, string $body, ?string $replyTo = null): bool
{
    $m = cfg('mail');
    $from = $m['from'];
    $fromName = $m['from_name'] ?? 'Website';
    $enc = fn(string $s) => '=?UTF-8?B?' . base64_encode($s) . '?=';
    $headers = [
        'From' => $enc($fromName) . ' <' . $from . '>',
        'MIME-Version' => '1.0',
        'Content-Type' => 'text/plain; charset=UTF-8',
        'Content-Transfer-Encoding' => 'base64',
        'X-Mailer' => 'ScarletHomes',
    ];
    if ($replyTo && valid_email($replyTo)) $headers['Reply-To'] = $replyTo;
    $payload = chunk_split(base64_encode($body));

    if (($m['transport'] ?? 'mail') !== 'smtp') {
        $h = '';
        foreach ($headers as $k => $v) $h .= "$k: $v\r\n";
        $ok = @mail($to, $enc($subject), $payload, rtrim($h), '-f' . $from);
        if (!$ok) error_log('[scarlet api] mail() failed');
        return $ok;
    }
    try {
        return smtp_send($m['smtp'], $from, $to, $enc($subject), $headers, $payload);
    } catch (Throwable $e) {
        error_log('[scarlet api] SMTP failed: ' . $e->getMessage());
        return false;
    }
}

function smtp_send(array $s, string $from, string $to, string $subject, array $headers, string $payload): bool
{
    $host = $s['host'];
    $port = (int)$s['port'];
    $ssl = ($s['encryption'] ?? 'ssl') === 'ssl';
    $ctx = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true, 'peer_name' => $host]]);
    $fp = @stream_socket_client(($ssl ? 'ssl://' : 'tcp://') . $host . ':' . $port, $errno, $errstr, (int)($s['timeout'] ?? 15), STREAM_CLIENT_CONNECT, $ctx);
    if (!$fp) throw new RuntimeException("connect $host:$port: $errstr");
    stream_set_timeout($fp, (int)($s['timeout'] ?? 15));
    $read = function () use ($fp) {
        $data = '';
        while (($line = fgets($fp, 515)) !== false) {
            $data .= $line;
            if (isset($line[3]) && $line[3] === ' ') break;
        }
        return $data;
    };
    $cmd = function (string $c, array $expect) use ($fp, $read) {
        if ($c !== '') fwrite($fp, $c . "\r\n");
        $r = $read();
        $code = (int)substr($r, 0, 3);
        if (!in_array($code, $expect, true)) throw new RuntimeException('SMTP ' . preg_replace('/\s+/', ' ', substr($r, 0, 200)) . ' after ' . strtok($c, ' '));
        return $r;
    };
    $ehlo = preg_replace('/[^a-z0-9.-]/i', '', parse_url((string)cfg('site_url'), PHP_URL_HOST) ?: 'localhost');
    $cmd('', [220]);
    $cmd('EHLO ' . $ehlo, [250]);
    if (!$ssl) {
        $cmd('STARTTLS', [220]);
        if (!stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT)) throw new RuntimeException('STARTTLS failed');
        $cmd('EHLO ' . $ehlo, [250]);
    }
    $cmd('AUTH LOGIN', [334]);
    $cmd(base64_encode($s['user']), [334]);
    $cmd(base64_encode($s['pass']), [235]);
    $cmd('MAIL FROM:<' . $from . '>', [250]);
    $cmd('RCPT TO:<' . $to . '>', [250, 251]);
    $cmd('DATA', [354]);
    $h = 'Date: ' . date('r') . "\r\nTo: <$to>\r\nSubject: $subject\r\nMessage-ID: <" . bin2hex(random_bytes(12)) . '@' . $ehlo . ">\r\n";
    foreach ($headers as $k => $v) $h .= "$k: $v\r\n";
    $data = $h . "\r\n" . str_replace("\n.", "\n..", $payload);
    $cmd($data . "\r\n.", [250]);
    $cmd('QUIT', [221, 250]);
    fclose($fp);
    return true;
}
