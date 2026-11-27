<?php
declare(strict_types=1);
/*
 * /api/me.php - the signed-in user's own details.
 *   GET          -> { user, profile }   (profile = contractor business details; contractors only)
 *   POST (CSRF)  {name, business_name, phone, trade, licence_no, abn, insurance_expiry}
 * Email (the login) and role/status are changed by an admin.
 */
require __DIR__ . '/lib/bootstrap.php';
require __DIR__ . '/lib/users.php';

$m = method('GET', 'POST');
$u = require_user();
$id = (int)$u['id'];
$contractor = $u['role'] === 'user';

if ($m === 'POST') {
    require_csrf();
    $in = body();
    $name = str_in($in, 'name', 255);
    $errors = [];
    if ($name === '') $errors['name'] = 'Required.';
    $profile = [];
    if ($contractor) {
        [$profile, $pe] = profile_input($in, false);
        $errors += $pe;
    }
    if ($errors) fail('Please check the highlighted fields.', 422, ['fields' => $errors]);
    db()->prepare('UPDATE users SET name = ?, updated_at = ? WHERE id = ?')->execute([$name, now_utc(), $id]);
    if ($contractor) profile_save($id, $profile);
    $u = current_user();
}
json_out(['ok' => true, 'user' => public_user($u), 'profile' => $contractor ? profile_get($id, false) : null]);
