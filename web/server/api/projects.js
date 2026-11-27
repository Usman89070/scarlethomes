'use strict';
/* /api/projects.php (see api/projects.php for the full contract) */
const path = require('path');
const db = require('../lib/db');
const { done, fail, readBody } = require('../lib/http');
const { ROLE_SQL, requireUser, requireCsrf, isStaff } = require('../lib/auth');
const { strIn, textIn, intIn, likeArg, nowUtc, todayLocal } = require('../lib/util');
const { projectGet, pivotFor, requireProjectAccess, projectLog } = require('../lib/projects');
const { storeUpload, uploadPath } = require('../lib/files');

const PIVOT_STATUSES = ['default', 'booked', 'working', 'completed'];

async function assignments(projectId, onlyUser) {
  const rows = await db.q(`SELECT pv.id, pv.user_id, pv.status, pv.booked_on, pv.worked_on, pv.completed_on, pv.completion_attachment_id, pv.created_at,
      u.name, u.email, cp.business_name, cp.trade, cp.phone
    FROM project_user_pivots pv JOIN users u ON u.id = pv.user_id LEFT JOIN contractor_profiles cp ON cp.user_id = u.id
    WHERE pv.project_id = ?${onlyUser ? ' AND pv.user_id = ?' : ''} ORDER BY u.name`, onlyUser ? [projectId, onlyUser] : [projectId]);
  return rows.map((r) => ({ ...r, id: Number(r.id), user_id: Number(r.user_id), completion_attachment_id: r.completion_attachment_id !== null ? Number(r.completion_attachment_id) : null }));
}

function projectInput(inp) {
  const d = { title: strIn(inp, 'title', 255), description: textIn(inp, 'description', 60000), status: String(inp.status ?? '1') === '0' ? 0 : 1 };
  return [d, d.title ? {} : { title: 'Required.' }];
}

module.exports = async function projects(req, res, q) {
  const u = await requireUser(req);
  const staff = isStaff(u), uid = u.id;
  const a = q.a || '', id = intIn(q, 'id');
  if (req.method === 'POST') await requireCsrf(req);

  if (req.method === 'GET' && a === 'list') {
    const page = Math.max(1, intIn(q, 'page')), per = 25, off = (page - 1) * per;
    const qq = strIn(q, 'q', 100);
    const where = [], args = [];
    let join = '';
    if (!staff) { join = 'JOIN project_user_pivots mine ON mine.project_id = p.id AND mine.user_id = ?'; args.push(uid); }
    if (qq) { where.push('(p.title LIKE ? OR p.description LIKE ?)'); args.push(likeArg(qq), likeArg(qq)); }
    if (q.status === '0' || q.status === '1') { where.push('p.status = ?'); args.push(Number(q.status)); }
    const w = where.length ? 'WHERE ' + where.join(' AND ') : '';
    const total = Number(await db.val(`SELECT COUNT(*) FROM projects p ${join} ${w}`, args));
    let cols = `p.id, p.title, p.status, p.created_at, p.updated_at,
      (SELECT COUNT(*) FROM project_user_pivots x WHERE x.project_id = p.id) AS assigned,
      (SELECT COUNT(*) FROM project_attachments f WHERE f.project_id = p.id) AS files`;
    if (!staff) cols += ', mine.id AS pivot_id, mine.status AS my_status';
    const rows = await db.q(`SELECT ${cols} FROM projects p ${join} ${w} ORDER BY p.status DESC, p.updated_at DESC, p.id DESC LIMIT ${per} OFFSET ${off}`, args);
    done({ ok: true, total, page, per_page: per, items: rows.map((r) => ({ ...r, id: Number(r.id), status: Number(r.status), assigned: Number(r.assigned), files: Number(r.files), ...(r.pivot_id !== undefined ? { pivot_id: Number(r.pivot_id) } : {}) })) });
  }

  if (req.method === 'GET' && a === 'get') {
    const p = await requireProjectAccess(u, id);
    const as = await assignments(id, staff ? null : uid);
    let hidden = [];
    if (!staff) hidden = (await db.q('SELECT completion_attachment_id FROM project_user_pivots WHERE project_id = ? AND user_id <> ? AND completion_attachment_id IS NOT NULL', [id, uid])).map((r) => Number(r.completion_attachment_id));
    const files = (await db.q('SELECT id, title, attachment, created_at FROM project_attachments WHERE project_id = ? ORDER BY id', [id]))
      .filter((f) => !hidden.includes(Number(f.id)))
      .map((f) => ({ id: Number(f.id), title: f.title || path.basename(f.attachment), type: path.extname(f.attachment).slice(1).toLowerCase(), created_at: f.created_at, available: uploadPath(f.attachment) !== null }));
    const logs = staff ? await db.q('SELECT l.id, l.action, l.old_title, l.new_title, l.action_date, l.action_time, u.name FROM project_logs l LEFT JOIN users u ON u.id = l.user_id WHERE l.project_id = ? ORDER BY l.id DESC LIMIT 50', [id]) : null;
    done({ ok: true, project: p, attachments: files, assignments: as, logs });
  }

  if (req.method === 'GET' && a === 'assignable') {
    if (!staff) fail('Forbidden.', 403);
    const rows = await db.q(`SELECT u.id, u.name, u.email, cp.business_name, cp.trade FROM users u LEFT JOIN contractor_profiles cp ON cp.user_id = u.id WHERE u.status = 1 AND ${ROLE_SQL} = 'user' ORDER BY u.name`);
    done({ ok: true, items: rows.map((r) => ({ ...r, id: Number(r.id) })) });
  }
  if (req.method !== 'POST') fail('Not found.', 404);
  const { fields: inp, files } = await readBody(req);

  if (a === 'assignment_status') {
    const pv = await db.one('SELECT * FROM project_user_pivots WHERE id = ?', [id]);
    if (!pv || (!staff && Number(pv.user_id) !== uid)) fail('Not found.', 404);
    const p = await projectGet(Number(pv.project_id));
    if (!staff && !p.status) fail('This project is closed.', 422);
    const status = inp.status || '';
    if (!PIVOT_STATUSES.includes(status)) fail('Invalid status.', 422);
    const today = todayLocal();
    const set = { status, updated_at: nowUtc() };
    if (status === 'default') Object.assign(set, { booked_on: null, worked_on: null, completed_on: null });
    if (status === 'booked') Object.assign(set, { booked_on: pv.booked_on || today, worked_on: null, completed_on: null });
    if (status === 'working') Object.assign(set, { booked_on: pv.booked_on || today, worked_on: pv.worked_on || today, completed_on: null });
    if (status === 'completed') {
      Object.assign(set, { booked_on: pv.booked_on || today, worked_on: pv.worked_on || today, completed_on: today });
      const rel = storeUpload(files.file, 'project/attachments');
      if (rel) {
        const who = await db.val('SELECT name FROM users WHERE id = ?', [pv.user_id]);
        const title = strIn(inp, 'title', 200) || 'Completion - ' + who;
        const r = await db.q('INSERT INTO project_attachments (project_id, attachment, title, created_at, updated_at) VALUES (?,?,?,?,?)', [pv.project_id, rel, title, nowUtc(), nowUtc()]);
        set.completion_attachment_id = r.insertId;
      }
    }
    const cols = Object.keys(set);
    await db.q(`UPDATE project_user_pivots SET ${cols.map((c) => c + ' = ?').join(', ')} WHERE id = ?`, [...cols.map((c) => set[c]), id]);
    done({ ok: true, assignment: (await assignments(Number(pv.project_id), Number(pv.user_id)))[0] || null });
  }

  if (!staff) fail('Forbidden.', 403);

  if (a === 'create') {
    const [d, e] = projectInput(inp);
    if (Object.keys(e).length) fail('Please check the highlighted fields.', 422, { fields: e });
    const r = await db.q('INSERT INTO projects (title, description, user_id, status, created_at, updated_at) VALUES (?,?,?,?,?,?)', [d.title, d.description, uid, d.status, nowUtc(), nowUtc()]);
    await projectLog(uid, r.insertId, 'Created', null, d);
    done({ ok: true, project: await projectGet(r.insertId) });
  }
  if (a === 'unassign') {
    const r = await db.q('DELETE FROM project_user_pivots WHERE id = ?', [id]);
    if (!r.affectedRows) fail('Not found.', 404);
    done({ ok: true });
  }

  const p = await projectGet(id);
  if (!p) fail('Not found.', 404);

  if (a === 'update') {
    const [d, e] = projectInput(inp);
    if (Object.keys(e).length) fail('Please check the highlighted fields.', 422, { fields: e });
    await db.q('UPDATE projects SET title = ?, description = ?, status = ?, updated_at = ? WHERE id = ?', [d.title, d.description, d.status, nowUtc(), id]);
    if (d.title !== p.title || d.description !== p.description || d.status !== p.status) await projectLog(uid, id, 'Updated', p, d);
    done({ ok: true, project: await projectGet(id) });
  }
  if (a === 'assign') {
    const cid = intIn(inp, 'user_id');
    const ok = await db.one(`SELECT u.id FROM users u WHERE u.id = ? AND u.status = 1 AND ${ROLE_SQL} = 'user'`, [cid]);
    if (!ok) fail('Choose an active contractor.', 422);
    if (await pivotFor(id, cid)) fail('This contractor is already assigned.', 422);
    await db.q("INSERT INTO project_user_pivots (project_id, user_id, status, created_at, updated_at) VALUES (?,?, 'default', ?, ?)", [id, cid, nowUtc(), nowUtc()]);
    done({ ok: true, assignments: await assignments(id, null) });
  }
  if (a === 'delete') {
    if (u.role !== 'admin') fail('Forbidden.', 403);
    if (Number(await db.val('SELECT COUNT(*) FROM project_attachments WHERE project_id = ?', [id])) > 0) fail('Delete the project files first, or archive the project instead.', 422);
    await db.tx(async (c) => {
      await c.q('DELETE FROM project_user_pivots WHERE project_id = ?', [id]);
      await c.q('DELETE FROM projects WHERE id = ?', [id]);
    });
    done({ ok: true });
  }
  fail('Not found.', 404);
};
