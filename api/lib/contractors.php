<?php
declare(strict_types=1);

const CONTRACTOR_COLS = 'id, business_name, contact_name, email, phone, trade, licence_no, abn, insurance_expiry, status, notes, created_at, updated_at';

/* Validate + sanitise contractor fields. $admin = may set email/status/notes. Returns [data, errors]. */
function contractor_input(array $in, bool $admin, bool $creating = false): array
{
    $d = [
        'business_name'    => str_in($in, 'business_name', 160),
        'contact_name'     => str_in($in, 'contact_name', 120),
        'phone'            => str_in($in, 'phone', 40),
        'trade'            => str_in($in, 'trade', 80),
        'licence_no'       => str_in($in, 'licence_no', 60),
        'abn'              => preg_replace('/[^0-9 ]/', '', str_in($in, 'abn', 20)) ?? '',
        'insurance_expiry' => str_in($in, 'insurance_expiry', 10),
    ];
    $e = [];
    if ($d['business_name'] === '') $e['business_name'] = 'Required.';
    if ($d['contact_name'] === '') $e['contact_name'] = 'Required.';
    if ($d['phone'] !== '' && !preg_match('/^[+]?[0-9() -]{6,}$/', $d['phone'])) $e['phone'] = 'Enter a valid phone number.';
    if ($d['abn'] !== '' && strlen(str_replace(' ', '', $d['abn'])) !== 11) $e['abn'] = 'ABN must be 11 digits.';
    if (!valid_date_or_empty($d['insurance_expiry'])) $e['insurance_expiry'] = 'Use a valid date.';
    if ($admin) {
        $d['email'] = mb_strtolower(str_in($in, 'email', 190));
        $d['status'] = ($in['status'] ?? 'active') === 'inactive' ? 'inactive' : 'active';
        $d['notes'] = text_in($in, 'notes', 5000);
        if (!valid_email($d['email'])) $e['email'] = 'Enter a valid email address.';
    }
    return [$d, $e];
}

function contractor_get(int $id): ?array
{
    $st = db()->prepare('SELECT ' . CONTRACTOR_COLS . ' FROM contractors WHERE id = ?');
    $st->execute([$id]);
    $c = $st->fetch();
    if (!$c) return null;
    $c['id'] = (int)$c['id'];
    return $c;
}

function contractor_save(int $id, array $d): void
{
    $cols = array_keys($d);
    $set = implode(', ', array_map(fn($c) => "$c = ?", $cols));
    $vals = array_map(fn($c) => ($c === 'insurance_expiry' && $d[$c] === '') ? null : $d[$c], $cols);
    $vals[] = $id;
    db()->prepare("UPDATE contractors SET $set WHERE id = ?")->execute($vals);
}
