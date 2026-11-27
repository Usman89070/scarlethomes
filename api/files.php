<?php
declare(strict_types=1);
/*
 * /api/files.php - private portal files (never served directly by the web server).
 *   GET  ?a=attachment&id=          download a project file (staff, or a contractor assigned to it)
 *   GET  ?a=checkout&id=<attendance> view a check-out photo (staff, or its owner)
 *   POST ?a=upload  multipart {project_id, title, file}   (staff)
 *   POST ?a=delete&id=              (staff)
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

if ($m === 'GET' && $a === 'attachment') {
    $st = db()->prepare('SELECT * FROM project_attachments WHERE id = ?');
    $st->execute([$id]);
    $f = $st->fetch();
    if (!$f) fail('Not found.', 404);
    require_project_access($u, (int)$f['project_id']);
    if (!$staff) {
        $st = db()->prepare('SELECT COUNT(*) FROM project_user_pivots WHERE completion_attachment_id = ? AND user_id <> ?');
        $st->execute([$id, $uid]);
        if ((int)$st->fetchColumn()) fail('Not found.', 404);
    }
    send_file($f['attachment'], $f['title'] ?: basename($f['attachment']));
}

if ($m === 'GET' && $a === 'checkout') {
    $st = db()->prepare('SELECT * FROM attendances WHERE id = ?');
    $st->execute([$id]);
    $r = $st->fetch();
    if (!$r || !$r['checkout_image'] || (!$staff && (int)$r['user_id'] !== $uid)) fail('Not found.', 404);
    send_file($r['checkout_image'], 'checkout-' . $id);
}

if ($m !== 'POST') fail('Not found.', 404);
require_csrf();
if (!$staff) fail('Forbidden.', 403);

if ($a === 'upload') {
    $in = body();
    $pid = int_in($in, 'project_id');
    if (!project_get($pid)) fail('Not found.', 404);
    $title = str_in($in, 'title', 200);
    $rel = store_upload('file', 'project/attachments');
    if (!$rel) fail('Choose a file to upload.', 422);
    if ($title === '') $title = pathinfo(str_in(['n' => $_FILES['file']['name'] ?? ''], 'n', 200), PATHINFO_FILENAME) ?: 'File';
    db()->prepare('INSERT INTO project_attachments (project_id, attachment, title, created_at, updated_at) VALUES (?,?,?,?,?)')
        ->execute([$pid, $rel, $title, now_utc(), now_utc()]);
    json_out(['ok' => true, 'id' => (int)db()->lastInsertId()]);
}

if ($a === 'delete') {
    $st = db()->prepare('SELECT * FROM project_attachments WHERE id = ?');
    $st->execute([$id]);
    $f = $st->fetch();
    if (!$f) fail('Not found.', 404);
    db()->prepare('DELETE FROM project_attachments WHERE id = ?')->execute([$id]); // completion links -> NULL
    delete_upload($f['attachment']);
    json_out(['ok' => true]);
}

fail('Not found.', 404);
