<?php
declare(strict_types=1);
/*
 * /api/attendance.php - site check-in / check-out.
 *   GET  ?a=open                    -> the signed-in user's open check-in (or null)
 *   GET  ?a=list&project_id=&user_id=&from=&to=&page=   (contractor: own records only)
 *   POST ?a=checkin  {project_id}   (contractor assigned to an active project)
 *   POST ?a=checkout multipart {note, image?}   closes the open check-in
 * Times are stored in UTC.
 */
require __DIR__ . '/lib/bootstrap.php';
require __DIR__ . '/lib/projects.php';
require __DIR__ . '/lib/files.php';

$m = method('GET', 'POST');
$u = require_user();
$staff = is_staff($u);
$uid = (int)$u['id'];
$a = $_GET['a'] ?? '';

function open_attendance(int $uid): ?array
{
    $st = db()->prepare('SELECT a.id, a.project_id, a.checked_in_at, p.title FROM attendances a JOIN projects p ON p.id = a.project_id
                          WHERE a.user_id = ? AND a.checked_out_at IS NULL ORDER BY a.id DESC LIMIT 1');
    $st->execute([$uid]);
    $r = $st->fetch();
    if (!$r) return null;
    $r['id'] = (int)$r['id']; $r['project_id'] = (int)$r['project_id'];
    return $r;
}

if ($m === 'GET' && $a === 'open') {
    json_out(['ok' => true, 'open' => open_attendance($uid)]);
}

if ($m === 'GET' && $a === 'list') {
    $page = max(1, int_in($_GET, 'page')); $per = 30; $off = ($page - 1) * $per;
    $where = []; $args = [];
    if (!$staff) { $where[] = 'a.user_id = ?'; $args[] = $uid; }
    elseif (int_in($_GET, 'user_id')) { $where[] = 'a.user_id = ?'; $args[] = int_in($_GET, 'user_id'); }
    if (int_in($_GET, 'project_id')) { $where[] = 'a.project_id = ?'; $args[] = int_in($_GET, 'project_id'); }
    $from = str_in($_GET, 'from', 10); $to = str_in($_GET, 'to', 10);
    if ($from !== '' && valid_date_or_empty($from)) { $where[] = 'a.checked_in_at >= ?'; $args[] = $from . ' 00:00:00'; }
    if ($to !== '' && valid_date_or_empty($to)) { $where[] = 'a.checked_in_at < DATE_ADD(?, INTERVAL 1 DAY)'; $args[] = $to; }
    $w = $where ? 'WHERE ' . implode(' AND ', $where) : '';
    $st = db()->prepare("SELECT COUNT(*) FROM attendances a $w"); $st->execute($args); $total = (int)$st->fetchColumn();
    $st = db()->prepare("SELECT a.id, a.project_id, a.user_id, a.checked_in_at, a.checked_out_at, a.checkout_note, (a.checkout_image IS NOT NULL) AS has_image,
                                p.title, u.name FROM attendances a JOIN projects p ON p.id = a.project_id JOIN users u ON u.id = a.user_id
                         $w ORDER BY a.checked_in_at DESC LIMIT $per OFFSET $off");
    $st->execute($args);
    $items = array_map(function ($r) { foreach (['id', 'project_id', 'user_id', 'has_image'] as $k) $r[$k] = (int)$r[$k]; return $r; }, $st->fetchAll());
    json_out(['ok' => true, 'total' => $total, 'page' => $page, 'per_page' => $per, 'items' => $items]);
}

if ($m !== 'POST') fail('Not found.', 404);
require_csrf();

if ($a === 'checkin') {
    $pid = int_in(body(), 'project_id');
    $p = project_get($pid);
    if (!$p || !pivot_for($pid, $uid)) fail('You are not assigned to this project.', 422);
    if (!$p['status']) fail('This project is closed.', 422);
    if ($open = open_attendance($uid)) fail('You are still checked in at "' . $open['title'] . '". Check out first.', 422);
    db()->prepare('INSERT INTO attendances (project_id, user_id, checked_in_at, created_at, updated_at) VALUES (?,?,?,?,?)')
        ->execute([$pid, $uid, now_utc(), now_utc(), now_utc()]);
    json_out(['ok' => true, 'open' => open_attendance($uid)]);
}

if ($a === 'checkout') {
    $open = open_attendance($uid);
    if (!$open) fail('You are not checked in.', 422);
    $note = text_in(body(), 'note', 2000);
    $img = store_upload('image', 'attendance/checkout', true);
    db()->prepare('UPDATE attendances SET checked_out_at = ?, checkout_image = ?, checkout_note = ?, updated_at = ? WHERE id = ?')
        ->execute([now_utc(), $img, $note !== '' ? $note : null, now_utc(), $open['id']]);
    json_out(['ok' => true, 'open' => null]);
}

fail('Not found.', 404);
