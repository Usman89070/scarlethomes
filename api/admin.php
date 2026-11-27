<?php
declare(strict_types=1);
/*
 * /api/admin.php - admin only (role check on every request).
 *   GET  ?a=contractors&q=&status=&page=   list/search
 *   GET  ?a=contractor&id=                 one contractor (+ login info)
 *   POST ?a=create        {...fields}      -> { contractor, temp_password }
 *   POST ?a=update&id=    {...fields}
 *   POST ?a=set_status&id= {status}        activate / deactivate (also disables the login)
 *   POST ?a=reset_password&id=             -> { temp_password } (shown once)
 *   GET  ?a=enquiries&q=&page=
 * POSTs need X-CSRF-Token.
 */
require __DIR__ . '/lib/bootstrap.php';
require __DIR__ . '/lib/contractors.php';

$m = method('GET', 'POST');
$admin = require_admin();
$a = $_GET['a'] ?? '';
$id = (int)($_GET['id'] ?? 0);
if ($m === 'POST') require_csrf();

function page_args(): array
{
    $page = max(1, (int)($_GET['page'] ?? 1));
    $per = 25;
    return [$page, $per, ($page - 1) * $per];
}

function like(string $q): string
{
    return '%' . addcslashes($q, '%_\\') . '%';
}

function with_login(array $c): array
{
    $st = db()->prepare('SELECT id, is_active, must_change_password, last_login_at FROM users WHERE contractor_id = ?');
    $st->execute([$c['id']]);
    $u = $st->fetch();
    $c['login'] = $u ? ['active' => (bool)$u['is_active'], 'must_change_password' => (bool)$u['must_change_password'], 'last_login_at' => $u['last_login_at']] : null;
    return $c;
}

if ($m === 'GET' && $a === 'contractors') {
    [$page, $per, $off] = page_args();
    $q = str_in($_GET, 'q', 100);
    $status = $_GET['status'] ?? '';
    $where = []; $args = [];
    if ($q !== '') {
        $where[] = '(business_name LIKE ? OR contact_name LIKE ? OR email LIKE ? OR trade LIKE ? OR licence_no LIKE ? OR abn LIKE ? OR phone LIKE ?)';
        array_push($args, ...array_fill(0, 7, like($q)));
    }
    if (in_array($status, ['active', 'inactive'], true)) { $where[] = 'status = ?'; $args[] = $status; }
    $w = $where ? 'WHERE ' . implode(' AND ', $where) : '';
    $st = db()->prepare("SELECT COUNT(*) FROM contractors $w");
    $st->execute($args);
    $total = (int)$st->fetchColumn();
    $st = db()->prepare("SELECT " . CONTRACTOR_COLS . " FROM contractors $w ORDER BY business_name LIMIT $per OFFSET $off");
    $st->execute($args);
    json_out(['ok' => true, 'total' => $total, 'page' => $page, 'per_page' => $per, 'items' => $st->fetchAll()]);
}

if ($m === 'GET' && $a === 'contractor') {
    $c = contractor_get($id);
    if (!$c) fail('Not found.', 404);
    json_out(['ok' => true, 'contractor' => with_login($c)]);
}

if ($m === 'GET' && $a === 'enquiries') {
    [$page, $per, $off] = page_args();
    $q = str_in($_GET, 'q', 100);
    $w = ''; $args = [];
    if ($q !== '') {
        $w = 'WHERE name LIKE ? OR email LIKE ? OR phone LIKE ? OR suburb LIKE ? OR service LIKE ?';
        $args = array_fill(0, 5, like($q));
    }
    $st = db()->prepare("SELECT COUNT(*) FROM enquiries $w");
    $st->execute($args);
    $total = (int)$st->fetchColumn();
    $st = db()->prepare("SELECT id, name, phone, email, suburb, service, message, page_url, mail_status, created_at FROM enquiries $w ORDER BY id DESC LIMIT $per OFFSET $off");
    $st->execute($args);
    json_out(['ok' => true, 'total' => $total, 'page' => $page, 'per_page' => $per, 'items' => $st->fetchAll()]);
}

if ($m !== 'POST') fail('Not found.', 404);
$in = body();

function email_taken(string $email, ?int $exceptContractor): bool
{
    $st = db()->prepare('SELECT COUNT(*) FROM users WHERE email = ? AND (contractor_id IS NULL OR contractor_id <> ?)');
    $st->execute([$email, $exceptContractor ?? 0]);
    if ((int)$st->fetchColumn() > 0) return true;
    $st = db()->prepare('SELECT COUNT(*) FROM contractors WHERE email = ? AND id <> ?');
    $st->execute([$email, $exceptContractor ?? 0]);
    return (int)$st->fetchColumn() > 0;
}

if ($a === 'create') {
    [$d, $e] = contractor_input($in, true, true);
    if (!$e && email_taken($d['email'], null)) $e['email'] = 'This email is already in use.';
    if ($e) fail('Please check the highlighted fields.', 422, ['fields' => $e]);
    $temp = temp_password();
    $pdo = db();
    $pdo->beginTransaction();
    $cols = array_keys($d);
    $vals = array_map(fn($c) => ($c === 'insurance_expiry' && $d[$c] === '') ? null : $d[$c], $cols);
    $pdo->prepare('INSERT INTO contractors (' . implode(',', $cols) . ') VALUES (' . implode(',', array_fill(0, count($cols), '?')) . ')')->execute($vals);
    $cid = (int)$pdo->lastInsertId();
    $pdo->prepare('INSERT INTO users (email, name, password_hash, role, contractor_id, is_active, must_change_password) VALUES (?,?,?,?,?,?,1)')
        ->execute([$d['email'], $d['contact_name'], password_hash($temp, PASSWORD_DEFAULT), 'contractor', $cid, $d['status'] === 'active' ? 1 : 0]);
    $pdo->commit();
    json_out(['ok' => true, 'contractor' => with_login(contractor_get($cid)), 'temp_password' => $temp]);
}

$c = contractor_get($id);
if (!$c) fail('Not found.', 404);

if ($a === 'update') {
    [$d, $e] = contractor_input($in, true);
    if (!$e && email_taken($d['email'], $id)) $e['email'] = 'This email is already in use.';
    if ($e) fail('Please check the highlighted fields.', 422, ['fields' => $e]);
    $pdo = db();
    $pdo->beginTransaction();
    contractor_save($id, $d);
    $pdo->prepare('UPDATE users SET email = ?, name = ?, is_active = ? WHERE contractor_id = ?')
        ->execute([$d['email'], $d['contact_name'], $d['status'] === 'active' ? 1 : 0, $id]);
    $pdo->commit();
    json_out(['ok' => true, 'contractor' => with_login(contractor_get($id))]);
}

if ($a === 'set_status') {
    $s = ($in['status'] ?? '') === 'active' ? 'active' : 'inactive';
    $pdo = db();
    $pdo->beginTransaction();
    $pdo->prepare('UPDATE contractors SET status = ? WHERE id = ?')->execute([$s, $id]);
    $pdo->prepare('UPDATE users SET is_active = ? WHERE contractor_id = ?')->execute([$s === 'active' ? 1 : 0, $id]);
    $pdo->commit();
    json_out(['ok' => true, 'contractor' => with_login(contractor_get($id))]);
}

if ($a === 'reset_password') {
    $temp = temp_password();
    $hash = password_hash($temp, PASSWORD_DEFAULT);
    $st = db()->prepare('UPDATE users SET password_hash = ?, must_change_password = 1 WHERE contractor_id = ?');
    $st->execute([$hash, $id]);
    if ($st->rowCount() === 0) {
        db()->prepare('INSERT INTO users (email, name, password_hash, role, contractor_id, is_active, must_change_password) VALUES (?,?,?,?,?,?,1)')
            ->execute([$c['email'], $c['contact_name'], $hash, 'contractor', $id, $c['status'] === 'active' ? 1 : 0]);
    }
    json_out(['ok' => true, 'temp_password' => $temp]);
}

fail('Not found.', 404);
