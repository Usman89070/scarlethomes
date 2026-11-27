'use strict';
/* /api/files.php (see api/files.php) */
const path = require('path');
const db = require('../lib/db');
const session = require('../lib/session');
const { done, fail, readBody } = require('../lib/http');
const { requireUser, requireCsrf, isStaff } = require('../lib/auth');
const { strIn, intIn, nowUtc } = require('../lib/util');
const { projectGet, requireProjectAccess } = require('../lib/projects');
const { storeUpload, deleteUpload, sendFile } = require('../lib/files');

module.exports = async function files(req, res, q) {
  const u = await requireUser(req);
  const staff = isStaff(u), uid = u.id;
  const a = q.a || '', id = intIn(q, 'id');

  if (req.method === 'GET' && a === 'attachment') {
    const f = await db.one('SELECT * FROM project_attachments WHERE id = ?', [id]);
    if (!f) fail('Not found.', 404);
    await requireProjectAccess(u, Number(f.project_id));
    if (!staff && Number(await db.val('SELECT COUNT(*) FROM project_user_pivots WHERE completion_attachment_id = ? AND user_id <> ?', [id, uid]))) fail('Not found.', 404);
    await session.save(req);
    return sendFile(res, f.attachment, f.title || path.basename(f.attachment));
  }
  if (req.method === 'GET' && a === 'checkout') {
    const r = await db.one('SELECT * FROM attendances WHERE id = ?', [id]);
    if (!r || !r.checkout_image || (!staff && Number(r.user_id) !== uid)) fail('Not found.', 404);
    await session.save(req);
    return sendFile(res, r.checkout_image, 'checkout-' + id);
  }
  if (req.method !== 'POST') fail('Not found.', 404);
  await requireCsrf(req);
  if (!staff) fail('Forbidden.', 403);
  const { fields: inp, files: up } = await readBody(req);

  if (a === 'upload') {
    const pid = intIn(inp, 'project_id');
    if (!(await projectGet(pid))) fail('Not found.', 404);
    let title = strIn(inp, 'title', 200);
    const rel = storeUpload(up.file, 'project/attachments');
    if (!rel) fail('Choose a file to upload.', 422);
    if (!title) title = path.parse(strIn({ n: up.file.filename }, 'n', 200)).name || 'File';
    const r = await db.q('INSERT INTO project_attachments (project_id, attachment, title, created_at, updated_at) VALUES (?,?,?,?,?)', [pid, rel, title, nowUtc(), nowUtc()]);
    done({ ok: true, id: r.insertId });
  }
  if (a === 'delete') {
    const f = await db.one('SELECT * FROM project_attachments WHERE id = ?', [id]);
    if (!f) fail('Not found.', 404);
    await db.q('DELETE FROM project_attachments WHERE id = ?', [id]);
    deleteUpload(f.attachment);
    done({ ok: true });
  }
  fail('Not found.', 404);
};
