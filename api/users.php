<?php
declare(strict_types=1);
/*
 * /api/users.php - user management (admin only).
 *   GET  ?a=list&q=&role=&status=&page=
 *   GET  ?a=get&id=                         -> { user, profile, projects }
 *   POST ?a=create  {name,email,role,status, ...profile, notes}  -> { user, temp_password }
 *   POST ?a=update&id= {name,email,role,status, ...profile, notes}
 *   POST ?a=reset_password&id=              -> { temp_password } (shown once)
 * Roles: admin, supervisor, user (= contractor). POSTs need X-CSRF-Token.
 */
require __DIR__ . '/lib/bootstrap.php';
require __DIR__ . '/lib/users.php';

$m = method('GET', 'POST');
$me = require_admin();
$a = $_GET['a'] ?? '';
$id = int_in($_GET, 'id');
if ($m === 'POST') require_csrf();

const ROLES = ['admin', 'supervisor', 'user'];

function like(string $q): string { return '%' . addcslashes($q, '%_\\') . '%'; }

function user_row(int $id): ?array
{
    $st = db()->prepare('SELECT u.id, u.name, u.email, u.status, u.must_change_password, u.last_login_at, u.created_at, u.updated_at, ' . ROLE_SQL . ' AS role FROM users u WHERE u.id = ?');
    $st->execute([$id]);
    $u = $st->fetch();
    if (!$u) return null;
    $u['id'] = (int)$u['id']; $u['status'] = (int)$u['status']; $u['must_change_password'] = (bool)$u['must_change_password'];
    $u['role'] = $u['role'] ?: 'user';
    return $u;
}

function set_role(int $userId, string $role): void
{
    $st = db()->prepare('UPDATE roles SET role = ?, updated_at = ? WHERE user_id = ?');
    $st->execute([$role, now_utc(), $userId]);
    if ($st->rowCount() === 0) {
        $chk = db()->prepare('SELECT COUNT(*) FROM roles WHERE user_id = ?');
        $chk->execute([$userId]);
        if (!(int)$chk->fetchColumn()) {
            db()->prepare('INSERT INTO roles (user_id, role, created_at, updated_at) VALUES (?,?,?,?)')->execute([$userId, $role, now_utc(), now_utc()]);
        }
    }
}

function user_input(array $in): array
{
    $d = [
        'name'   => str_in($in, 'name', 255),
        'email'  => mb_strtolower(str_in($in, 'email', 255)),
        'role'   => in_array($in['role'] ?? '', ROLES, true) ? $in['role'] : 'user',
        'status' => (string)($in['status'] ?? '1') === '0' ? 0 : 1,
    ];
    $e = [];
    if ($d['name'] === '') $e['name'] = 'Required.';
    if (!valid_email($d['email'])) $e['email'] = 'Enter a valid email address.';
    [$p, $pe] = profile_input($in, true);
    return [$d, $p, $e + $pe];
}

function email_taken(string $email, int $except): bool
{
    $st = db()->prepare('SELECT COUNT(*) FROM users WHERE email = ? AND id <> ?');
    $st->execute([$email, $except]);
    return (int)$st->fetchColumn() > 0;
}

if ($m === 'GET' && $a === 'list') {
    $page = max(1, int_in($_GET, 'page')); $per = 25; $off = ($page - 1) * $per;
    $q = str_in($_GET, 'q', 100);
    $where = []; $args = [];
    if ($q !== '') {
        $where[] = '(u.name LIKE ? OR u.email LIKE ? OR cp.business_name LIKE ? OR cp.trade LIKE ? OR cp.phone LIKE ? OR cp.licence_no LIKE ? OR cp.abn LIKE ?)';
        array_push($args, ...array_fill(0, 7, like($q)));
    }
    if (in_array($_GET['role'] ?? '', ROLES, true)) { $where[] = ROLE_SQL . ' = ?'; $args[] = $_GET['role']; }
    if (in_array($_GET['status'] ?? '', ['0', '1'], true)) { $where[] = 'u.status = ?'; $args[] = (int)$_GET['status']; }
    $w = $where ? 'WHERE ' . implode(' AND ', $where) : '';
    $from = "FROM users u LEFT JOIN contractor_profiles cp ON cp.user_id = u.id $w";
    $st = db()->prepare("SELECT COUNT(*) $from"); $st->execute($args); $total = (int)$st->fetchColumn();
    $st = db()->prepare("SELECT u.id, u.name, u.email, u.status, u.last_login_at, " . ROLE_SQL . " AS role,
                                cp.business_name, cp.trade, cp.phone, cp.insurance_expiry,
                                (SELECT COUNT(*) FROM project_user_pivots pv WHERE pv.user_id = u.id) AS projects
                         $from ORDER BY u.status DESC, u.name LIMIT $per OFFSET $off");
    $st->execute($args);
    $items = array_map(function ($r) { $r['role'] = $r['role'] ?: 'user'; $r['id'] = (int)$r['id']; $r['status'] = (int)$r['status']; $r['projects'] = (int)$r['projects']; return $r; }, $st->fetchAll());
    json_out(['ok' => true, 'total' => $total, 'page' => $page, 'per_page' => $per, 'items' => $items]);
}

if ($m === 'GET' && $a === 'get') {
    $u = user_row($id);
    if (!$u) fail('Not found.', 404);
    $st = db()->prepare('SELECT p.id, p.title, p.status AS project_status, pv.status, pv.booked_on, pv.worked_on, pv.completed_on
                           FROM project_user_pivots pv JOIN projects p ON p.id = pv.project_id WHERE pv.user_id = ? ORDER BY p.status DESC, p.id DESC');
    $st->execute([$id]);
    json_out(['ok' => true, 'user' => $u, 'profile' => profile_get($id, true), 'projects' => $st->fetchAll()]);
}

if ($m !== 'POST') fail('Not found.', 404);
$in = body();

if ($a === 'create') {
    [$d, $p, $e] = user_input($in);
    if (!$e && email_taken($d['email'], 0)) $e['email'] = 'This email is already in use.';
    if ($e) fail('Please check the highlighted fields.', 422, ['fields' => $e]);
    $temp = temp_password();
    $pdo = db();
    $pdo->beginTransaction();
    $pdo->prepare('INSERT INTO users (name, email, password, status, must_change_password, created_at, updated_at) VALUES (?,?,?,?,1,?,?)')
        ->execute([$d['name'], $d['email'], hash_password($temp), $d['status'], now_utc(), now_utc()]);
    $uid = (int)$pdo->lastInsertId();
    set_role($uid, $d['role']);
    profile_save($uid, $p);
    $pdo->commit();
    json_out(['ok' => true, 'user' => user_row($uid), 'temp_password' => $temp]);
}

$u = user_row($id);
if (!$u) fail('Not found.', 404);

if ($a === 'update') {
    [$d, $p, $e] = user_input($in);
    if (!$e && email_taken($d['email'], $id)) $e['email'] = 'This email is already in use.';
    if ($id === (int)$me['id'] && ($d['role'] !== 'admin' || $d['status'] !== 1)) $e['role'] = 'You cannot remove your own admin access.';
    if ($e) fail('Please check the highlighted fields.', 422, ['fields' => $e]);
    $pdo = db();
    $pdo->beginTransaction();
    $pdo->prepare('UPDATE users SET name = ?, email = ?, status = ?, updated_at = ? WHERE id = ?')->execute([$d['name'], $d['email'], $d['status'], now_utc(), $id]);
    set_role($id, $d['role']);
    profile_save($id, $p);
    $pdo->commit();
    json_out(['ok' => true, 'user' => user_row($id), 'profile' => profile_get($id, true)]);
}

if ($a === 'reset_password') {
    if ($id === (int)$me['id']) fail('Use "Change Password" for your own account.', 422);
    $temp = temp_password();
    db()->prepare('UPDATE users SET password = ?, must_change_password = 1, updated_at = ? WHERE id = ?')->execute([hash_password($temp), now_utc(), $id]);
    json_out(['ok' => true, 'temp_password' => $temp]);
}

fail('Not found.', 404);
