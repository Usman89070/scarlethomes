<?php
declare(strict_types=1);
/*
 * /api/me.php - the signed-in contractor's own profile.
 *   GET            -> { contractor }
 *   POST (CSRF)    -> update own editable fields
 * Status and notes are admin-only; email is the login and is changed by an admin.
 */
require __DIR__ . '/lib/bootstrap.php';
require __DIR__ . '/lib/contractors.php';

$m = method('GET', 'POST');
$u = require_user();
if ($u['role'] !== 'contractor' || !$u['contractor_id']) fail('Forbidden.', 403);
$id = (int)$u['contractor_id'];

if ($m === 'POST') {
    require_csrf();
    [$data, $errors] = contractor_input(body(), false);
    if ($errors) fail('Please check the highlighted fields.', 422, ['fields' => $errors]);
    contractor_save($id, $data);
}
$c = contractor_get($id);
unset($c['notes']);
json_out(['ok' => true, 'contractor' => $c]);
