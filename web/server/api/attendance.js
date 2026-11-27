'use strict';
/* /api/attendance.php (see api/attendance.php) */
const db = require('../lib/db');
const { done, fail, readBody } = require('../lib/http');
const { requireUser, requireCsrf, isStaff } = require('../lib/auth');
const { strIn, textIn, intIn, validDateOrEmpty, nowUtc } = require('../lib/util');
const { projectGet, pivotFor } = require('../lib/projects');
const { storeUpload } = require('../lib/files');

async function openAttendance(uid) {
  const r = await db.one('SELECT a.id, a.project_id, a.checked_in_at, p.title FROM attendances a JOIN projects p ON p.id = a.project_id WHERE a.user_id = ? AND a.checked_out_at IS NULL ORDER BY a.id DESC LIMIT 1', [uid]);
  return r ? { ...r, id: Number(r.id), project_id: Number(r.project_id) } : null;
}

module.exports = async function attendance(req, res, q) {
  const u = await requireUser(req);
  const staff = isStaff(u), uid = u.id;
  const a = q.a || '';

  if (req.method === 'GET' && a === 'open') done({ ok: true, open: await openAttendance(uid) });
  if (req.method === 'GET' && a === 'list') {
    const page = Math.max(1, intIn(q, 'page')), per = 30, off = (page - 1) * per;
    const where = [], args = [];
    if (!staff) { where.push('a.user_id = ?'); args.push(uid); }
    else if (intIn(q, 'user_id')) { where.push('a.user_id = ?'); args.push(intIn(q, 'user_id')); }
    if (intIn(q, 'project_id')) { where.push('a.project_id = ?'); args.push(intIn(q, 'project_id')); }
    const from = strIn(q, 'from', 10), to = strIn(q, 'to', 10);
    if (from && validDateOrEmpty(from)) { where.push('a.checked_in_at >= ?'); args.push(from + ' 00:00:00'); }
    if (to && validDateOrEmpty(to)) { where.push('a.checked_in_at < DATE_ADD(?, INTERVAL 1 DAY)'); args.push(to); }
    const w = where.length ? 'WHERE ' + where.join(' AND ') : '';
    const total = Number(await db.val(`SELECT COUNT(*) FROM attendances a ${w}`, args));
    const rows = await db.q(`SELECT a.id, a.project_id, a.user_id, a.checked_in_at, a.checked_out_at, a.checkout_note, (a.checkout_image IS NOT NULL) AS has_image, p.title, u.name
      FROM attendances a JOIN projects p ON p.id = a.project_id JOIN users u ON u.id = a.user_id ${w} ORDER BY a.checked_in_at DESC LIMIT ${per} OFFSET ${off}`, args);
    done({ ok: true, total, page, per_page: per, items: rows.map((r) => ({ ...r, id: Number(r.id), project_id: Number(r.project_id), user_id: Number(r.user_id), has_image: Number(r.has_image) })) });
  }
  if (req.method !== 'POST') fail('Not found.', 404);
  await requireCsrf(req);
  const { fields: inp, files } = await readBody(req);

  if (a === 'checkin') {
    const pid = intIn(inp, 'project_id');
    const p = await projectGet(pid);
    if (!p || !(await pivotFor(pid, uid))) fail('You are not assigned to this project.', 422);
    if (!p.status) fail('This project is closed.', 422);
    const open = await openAttendance(uid);
    if (open) fail(`You are still checked in at "${open.title}". Check out first.`, 422);
    await db.q('INSERT INTO attendances (project_id, user_id, checked_in_at, created_at, updated_at) VALUES (?,?,?,?,?)', [pid, uid, nowUtc(), nowUtc(), nowUtc()]);
    done({ ok: true, open: await openAttendance(uid) });
  }
  if (a === 'checkout') {
    const open = await openAttendance(uid);
    if (!open) fail('You are not checked in.', 422);
    const note = textIn(inp, 'note', 2000);
    const img = storeUpload(files.image, 'attendance/checkout', true);
    await db.q('UPDATE attendances SET checked_out_at = ?, checkout_image = ?, checkout_note = ?, updated_at = ? WHERE id = ?', [nowUtc(), img, note || null, nowUtc(), open.id]);
    done({ ok: true, open: null });
  }
  fail('Not found.', 404);
};
