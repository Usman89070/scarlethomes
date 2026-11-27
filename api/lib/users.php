<?php
declare(strict_types=1);

const PROFILE_FIELDS = ['business_name', 'phone', 'trade', 'licence_no', 'abn', 'insurance_expiry'];

/* Validate contractor profile fields (+ notes for staff). Returns [data, errors]. */
function profile_input(array $in, bool $withNotes): array
{
    $d = [
        'business_name'    => str_in($in, 'business_name', 160),
        'phone'            => str_in($in, 'phone', 40),
        'trade'            => str_in($in, 'trade', 80),
        'licence_no'       => str_in($in, 'licence_no', 60),
        'abn'              => preg_replace('/[^0-9 ]/', '', str_in($in, 'abn', 20)) ?? '',
        'insurance_expiry' => str_in($in, 'insurance_expiry', 10),
    ];
    $e = [];
    if ($d['phone'] !== '' && !preg_match('/^[+]?[0-9() -]{6,}$/', $d['phone'])) $e['phone'] = 'Enter a valid phone number.';
    if ($d['abn'] !== '' && strlen(str_replace(' ', '', $d['abn'])) !== 11) $e['abn'] = 'ABN must be 11 digits.';
    if (!valid_date_or_empty($d['insurance_expiry'])) $e['insurance_expiry'] = 'Use a valid date.';
    if ($withNotes) $d['notes'] = text_in($in, 'notes', 5000);
    return [$d, $e];
}

function profile_get(int $userId, bool $withNotes): array
{
    $st = db()->prepare('SELECT business_name, phone, trade, licence_no, abn, insurance_expiry, notes FROM contractor_profiles WHERE user_id = ?');
    $st->execute([$userId]);
    $p = $st->fetch() ?: array_fill_keys([...PROFILE_FIELDS, 'notes'], null);
    foreach (PROFILE_FIELDS as $k) $p[$k] = $p[$k] ?? ($k === 'insurance_expiry' ? null : '');
    if (!$withNotes) unset($p['notes']);
    else $p['notes'] = $p['notes'] ?? '';
    return $p;
}

function profile_save(int $userId, array $d): void
{
    if (array_key_exists('insurance_expiry', $d) && $d['insurance_expiry'] === '') $d['insurance_expiry'] = null;
    $cols = array_keys($d);
    $sql = 'INSERT INTO contractor_profiles (user_id, ' . implode(', ', $cols) . ', created_at, updated_at) VALUES (?' . str_repeat(', ?', count($cols)) . ', ?, ?)
            ON DUPLICATE KEY UPDATE ' . implode(', ', array_map(fn($c) => "$c = VALUES($c)", $cols)) . ', updated_at = VALUES(updated_at)';
    db()->prepare($sql)->execute([$userId, ...array_values($d), now_utc(), now_utc()]);
}
