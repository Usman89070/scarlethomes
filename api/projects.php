<?php
declare(strict_types=1);
/*
 * /api/projects.php
 *  Everyone signed in (contractors only see projects they are assigned to):
 *   GET  ?a=list&q=&status=&page=
 *   GET  ?a=get&id=                -> { project, attachments, assignments, logs(staff) }
 *   POST ?a=assignment_status&id=<pivot id>  multipart {status, file?}   (contractor: own only)
 *  Staff (admin + supervisor):
 *   GET  ?a=assignable             -> active contractors for the "assign" picker
 *   POST ?a=create  {title, description, status}
 *   POST ?a=update&id= {title, description, status}
 *   POST ?a=assign&id= {user_id}
 *   POST ?a=unassign&id=<pivot id>
 *  Admin:
 *   POST ?a=delete&id=             (only when the project has no files)
 * Every create/update is written to project_logs, as in the old app.
 */
require __DIR__ . '/lib/bootstrap.php';
require __DIR__ . '/lib/projects.php';
require __DIR__ . '/lib/files.php';

$m = method('GET', 'POST');
$u = require_user();
$staff = is_staff($u);
$uid = (int)$u['id'];
$a = $_GET['a'] ?? '';
$id = int_in($_GET, 'id');
if ($m === 'POST') require_csrf();

const PIVOT_STATUSES = ['default', 'booked', 'working', 'completed'];

function like(string $q): string { return '%' . addcslashes($q, '%_\\') . '%'; }

function assignments(int $projectId, ?int $onlyUser): array
{
    $sql = 'SELECT pv.id, pv.user_id, pv.status, pv.booked_on, pv.worked_on, pv.completed_on, pv.completion_attachment_id, pv.created_at,
                   u.name, u.email, cp.business_name, cp.trade, cp.phone
              FROM project_user_pivots pv JOIN users u ON u.id = pv.user_id LEFT JOIN contractor_profiles cp ON cp.user_id = u.id
             WHERE pv.project_id = ?' . ($onlyUser ? ' AND pv.user_id = ?' : '') . ' ORDER BY u.name';
    $st = db()->prepare($sql);
    $st->execute($onlyUser ? [$projectId, $onlyUser] : [$projectId]);
    return array_map(function ($r) {
        foreach (['id', 'user_id'] as $k) $r[$k] = (int)$r[$k];
        $r['completion_attachment_id'] = $r['completion_attachment_id'] !== null ? (int)$r['completion_attachment_id'] : null;
        return $r;
    }, $st->fetchAll());
}

if ($m === 'GET' && $a === 'list') {
    $page = max(1, int_in($_GET, 'page')); $per = 25; $off = ($page - 1) * $per;
    $q = str_in($_GET, 'q', 100);
    $where = []; $args = [];
    $join = '';
    if (!$staff) { $join = 'JOIN project_user_pivots mine ON mine.project_id = p.id AND mine.user_id = ?'; $args[] = $uid; }
    if ($q !== '') { $where[] = '(p.title LIKE ? OR p.description LIKE ?)'; array_push($args, like($q), like($q)); }
    if (in_array($_GET['status'] ?? '', ['0', '1'], true)) { $where[] = 'p.status = ?'; $args[] = (int)$_GET['status']; }
    $w = $where ? 'WHERE ' . implode(' AND ', $where) : '';
    $st = db()->prepare("SELECT COUNT(*) FROM projects p $join $w"); $st->execute($args); $total = (int)$st->fetchColumn();
    $cols = 'p.id, p.title, p.status, p.created_at, p.updated_at,
             (SELECT COUNT(*) FROM project_user_pivots x WHERE x.project_id = p.id) AS assigned,
             (SELECT COUNT(*) FROM project_attachments f WHERE f.project_id = p.id) AS files';
    if (!$staff) $cols .= ', mine.id AS pivot_id, mine.status AS my_status';
    $st = db()->prepare("SELECT $cols FROM projects p $join $w ORDER BY p.status DESC, p.updated_at DESC, p.id DESC LIMIT $per OFFSET $off");
    $st->execute($args);
    $items = array_map(function ($r) { foreach (['id', 'status', 'assigned', 'files'] as $k) $r[$k] = (int)$r[$k]; return $r; }, $st->fetchAll());
    json_out(['ok' => true, 'total' => $total, 'page' => $page, 'per_page' => $per, 'items' => $items]);
}

if ($m === 'GET' && $a === 'get') {
    $p = require_project_access($u, $id);
    $as = assignments($id, $staff ? null : $uid);
    // contractors don't see other contractors' completion files
    $hidden = [];
    if (!$staff) {
        $st = db()->prepare('SELECT completion_attachment_id FROM project_user_pivots WHERE project_id = ? AND user_id <> ? AND completion_attachment_id IS NOT NULL');
        $st->execute([$id, $uid]);
        $hidden = array_map('intval', $st->fetchAll(PDO::FETCH_COLUMN));
    }
    $st = db()->prepare('SELECT id, title, attachment, created_at FROM project_attachments WHERE project_id = ? ORDER BY id');
    $st->execute([$id]);
    $files = [];
    foreach ($st->fetchAll() as $f) {
        if (in_array((int)$f['id'], $hidden, true)) continue;
        $files[] = ['id' => (int)$f['id'], 'title' => $f['title'] ?: basename($f['attachment']), 'type' => strtolower(pathinfo($f['attachment'], PATHINFO_EXTENSION)), 'created_at' => $f['created_at'], 'available' => upload_path($f['attachment']) !== null];
    }
    $logs = null;
    if ($staff) {
        $st = db()->prepare('SELECT l.id, l.action, l.old_title, l.new_title, l.action_date, l.action_time, u.name FROM project_logs l LEFT JOIN users u ON u.id = l.user_id WHERE l.project_id = ? ORDER BY l.id DESC LIMIT 50');
        $st->execute([$id]);
        $logs = $st->fetchAll();
    }
    json_out(['ok' => true, 'project' => $p, 'attachments' => $files, 'assignments' => $as, 'logs' => $logs]);
}

if ($m === 'GET' && $a === 'assignable') {
    if (!$staff) fail('Forbidden.', 403);
    $st = db()->query("SELECT u.id, u.name, u.email, cp.business_name, cp.trade FROM users u LEFT JOIN contractor_profiles cp ON cp.user_id = u.id
                        WHERE u.status = 1 AND " . ROLE_SQL . " = 'user' ORDER BY u.name");
    json_out(['ok' => true, 'items' => array_map(function ($r) { $r['id'] = (int)$r['id']; return $r; }, $st->fetchAll())]);
}

if ($m !== 'POST') fail('Not found.', 404);

/* -------- contractor or staff: move an assignment along default -> booked -> working -> completed */
if ($a === 'assignment_status') {
    $st = db()->prepare('SELECT * FROM project_user_pivots WHERE id = ?');
    $st->execute([$id]);
    $pv = $st->fetch();
    if (!$pv || (!$staff && (int)$pv['user_id'] !== $uid)) fail('Not found.', 404);
    $p = project_get((int)$pv['project_id']);
    if (!$staff && !$p['status']) fail('This project is closed.', 422);
    $in = body();
    $status = $in['status'] ?? '';
    if (!in_array($status, PIVOT_STATUSES, true)) fail('Invalid status.', 422);
    $today = today_local();
    $set = ['status' => $status, 'updated_at' => now_utc()];
    if ($status === 'default') { $set += ['booked_on' => null, 'worked_on' => null, 'completed_on' => null]; }
    if ($status === 'booked') { $set += ['booked_on' => $pv['booked_on'] ?: $today, 'worked_on' => null, 'completed_on' => null]; }
    if ($status === 'working') { $set += ['booked_on' => $pv['booked_on'] ?: $today, 'worked_on' => $pv['worked_on'] ?: $today, 'completed_on' => null]; }
    if ($status === 'completed') {
        $set += ['booked_on' => $pv['booked_on'] ?: $today, 'worked_on' => $pv['worked_on'] ?: $today, 'completed_on' => $today];
        $rel = store_upload('file', 'project/attachments');
        if ($rel) {
            $who = db()->prepare('SELECT name FROM users WHERE id = ?'); $who->execute([(int)$pv['user_id']]);
            $title = str_in(body(), 'title', 200) ?: 'Completion - ' . $who->fetchColumn();
            db()->prepare('INSERT INTO project_attachments (project_id, attachment, title, created_at, updated_at) VALUES (?,?,?,?,?)')
                ->execute([(int)$pv['project_id'], $rel, $title, now_utc(), now_utc()]);
            $set['completion_attachment_id'] = (int)db()->lastInsertId();
        }
    }
    $cols = array_keys($set);
    db()->prepare('UPDATE project_user_pivots SET ' . implode(', ', array_map(fn($c) => "$c = ?", $cols)) . ' WHERE id = ?')
        ->execute([...array_values($set), $id]);
    json_out(['ok' => true, 'assignment' => assignments((int)$pv['project_id'], (int)$pv['user_id'])[0] ?? null]);
}

/* -------- staff only from here */
if (!$staff) fail('Forbidden.', 403);
$in = body();

function project_input(array $in): array
{
    $d = ['title' => str_in($in, 'title', 255), 'description' => text_in($in, 'description', 60000), 'status' => (string)($in['status'] ?? '1') === '0' ? 0 : 1];
    $e = [];
    if ($d['title'] === '') $e['title'] = 'Required.';
    return [$d, $e];
}

if ($a === 'create') {
    [$d, $e] = project_input($in);
    if ($e) fail('Please check the highlighted fields.', 422, ['fields' => $e]);
    db()->prepare('INSERT INTO projects (title, description, user_id, status, created_at, updated_at) VALUES (?,?,?,?,?,?)')
        ->execute([$d['title'], $d['description'], $uid, $d['status'], now_utc(), now_utc()]);
    $pid = (int)db()->lastInsertId();
    project_log($uid, $pid, 'Created', null, $d);
    json_out(['ok' => true, 'project' => project_get($pid)]);
}

if ($a === 'unassign') {
    $st = db()->prepare('DELETE FROM project_user_pivots WHERE id = ?');
    $st->execute([$id]);
    if (!$st->rowCount()) fail('Not found.', 404);
    json_out(['ok' => true]);
}

$p = project_get($id);
if (!$p) fail('Not found.', 404);

if ($a === 'update') {
    [$d, $e] = project_input($in);
    if ($e) fail('Please check the highlighted fields.', 422, ['fields' => $e]);
    db()->prepare('UPDATE projects SET title = ?, description = ?, status = ?, updated_at = ? WHERE id = ?')
        ->execute([$d['title'], $d['description'], $d['status'], now_utc(), $id]);
    if ($d['title'] !== $p['title'] || $d['description'] !== $p['description'] || $d['status'] !== $p['status']) {
        project_log($uid, $id, 'Updated', $p, $d);
    }
    json_out(['ok' => true, 'project' => project_get($id)]);
}

if ($a === 'assign') {
    $cid = int_in($in, 'user_id');
    $st = db()->prepare('SELECT u.id FROM users u WHERE u.id = ? AND u.status = 1 AND ' . ROLE_SQL . " = 'user'");
    $st->execute([$cid]);
    if (!$st->fetch()) fail('Choose an active contractor.', 422);
    if (pivot_for($id, $cid)) fail('This contractor is already assigned.', 422);
    db()->prepare("INSERT INTO project_user_pivots (project_id, user_id, status, created_at, updated_at) VALUES (?,?, 'default', ?, ?)")
        ->execute([$id, $cid, now_utc(), now_utc()]);
    json_out(['ok' => true, 'assignments' => assignments($id, null)]);
}

if ($a === 'delete') {
    if ($u['role'] !== 'admin') fail('Forbidden.', 403);
    $st = db()->prepare('SELECT COUNT(*) FROM project_attachments WHERE project_id = ?');
    $st->execute([$id]);
    if ((int)$st->fetchColumn() > 0) fail('Delete the project files first, or archive the project instead.', 422);
    $pdo = db();
    $pdo->beginTransaction();
    $pdo->prepare('DELETE FROM project_user_pivots WHERE project_id = ?')->execute([$id]);
    $pdo->prepare('DELETE FROM projects WHERE id = ?')->execute([$id]); // logs + attendance cascade
    $pdo->commit();
    json_out(['ok' => true]);
}

fail('Not found.', 404);
