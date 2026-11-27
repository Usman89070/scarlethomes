'use strict';
/* /api/users.php - admin only (see api/users.php) */
const db = require('../lib/db');
const { done, fail, readBody } = require('../lib/http');
const { ROLE_SQL, requireAdmin, requireCsrf } = require('../lib/auth');
const { strIn, intIn, validEmail, likeArg, tempPassword, hashPassword, nowUtc } = require('../lib/util');
const { profileInput, profileGet, profileSave } = require('../lib/users');

const ROLES = ['admin', 'supervisor', 'user'];

async function userRow(id) {
  const u = await db.one('SELECT u.id, u.name, u.email, u.status, u.must_change_password, u.last_login_at, u.created_at, u.updated_at, ' + ROLE_SQL + ' AS role FROM users u WHERE u.id = ?', [id]);
  if (!u) return null;
  return { ...u, id: Number(u.id), status: Number(u.status), must_change_password: !!Number(u.must_change_password), role: u.role || 'user' };
}

async function setRole(conn, userId, role) {
  const r = await conn.q('UPDATE roles SET role = ?, updated_at = ? WHERE user_id = ?', [role, nowUtc(), userId]);
  if (r.affectedRows === 0) await conn.q('INSERT INTO roles (user_id, role, created_at, updated_at) VALUES (?,?,?,?)', [userId, role, nowUtc(), nowUtc()]);
}

function userInput(inp) {
  const d = {
    name: strIn(inp, 'name', 255), email: strIn(inp, 'email', 255).toLowerCase(),
    role: ROLES.includes(inp.role) ? inp.role : 'user', status: String(inp.status ?? '1') === '0' ? 0 : 1,
  };
  const e = {};
  if (!d.name) e.name = 'Required.';
  if (!validEmail(d.email)) e.email = 'Enter a valid email address.';
  const [p, pe] = profileInput(inp, true);
  return [d, p, { ...e, ...pe }];
}
const emailTaken = async (email, except) => Number(await db.val('SELECT COUNT(*) FROM users WHERE email = ? AND id <> ?', [email, except])) > 0;

module.exports = async function users(req, res, q) {
  const me = await requireAdmin(req);
  const a = q.a || '';
  const id = intIn(q, 'id');
  if (req.method === 'POST') await requireCsrf(req);

  if (req.method === 'GET' && a === 'list') {
    const page = Math.max(1, intIn(q, 'page')), per = 25, off = (page - 1) * per;
    const qq = strIn(q, 'q', 100);
    const where = [], args = [];
    if (qq) { where.push('(u.name LIKE ? OR u.email LIKE ? OR cp.business_name LIKE ? OR cp.trade LIKE ? OR cp.phone LIKE ? OR cp.licence_no LIKE ? OR cp.abn LIKE ?)'); for (let i = 0; i < 7; i++) args.push(likeArg(qq)); }
    if (ROLES.includes(q.role)) { where.push(ROLE_SQL + ' = ?'); args.push(q.role); }
    if (q.status === '0' || q.status === '1') { where.push('u.status = ?'); args.push(Number(q.status)); }
    const from = `FROM users u LEFT JOIN contractor_profiles cp ON cp.user_id = u.id ${where.length ? 'WHERE ' + where.join(' AND ') : ''}`;
    const total = Number(await db.val(`SELECT COUNT(*) ${from}`, args));
    const rows = await db.q(`SELECT u.id, u.name, u.email, u.status, u.last_login_at, ${ROLE_SQL} AS role, cp.business_name, cp.trade, cp.phone, cp.insurance_expiry,
      (SELECT COUNT(*) FROM project_user_pivots pv WHERE pv.user_id = u.id) AS projects ${from} ORDER BY u.status DESC, u.name LIMIT ${per} OFFSET ${off}`, args);
    done({ ok: true, total, page, per_page: per, items: rows.map((r) => ({ ...r, id: Number(r.id), status: Number(r.status), projects: Number(r.projects), role: r.role || 'user' })) });
  }
  if (req.method === 'GET' && a === 'get') {
    const u = await userRow(id);
    if (!u) fail('Not found.', 404);
    const projects = await db.q('SELECT p.id, p.title, p.status AS project_status, pv.status, pv.booked_on, pv.worked_on, pv.completed_on FROM project_user_pivots pv JOIN projects p ON p.id = pv.project_id WHERE pv.user_id = ? ORDER BY p.status DESC, p.id DESC', [id]);
    done({ ok: true, user: u, profile: await profileGet(id, true), projects });
  }
  if (req.method !== 'POST') fail('Not found.', 404);
  const { fields: inp } = await readBody(req);

  if (a === 'create') {
    const [d, p, e] = userInput(inp);
    if (!Object.keys(e).length && await emailTaken(d.email, 0)) e.email = 'This email is already in use.';
    if (Object.keys(e).length) fail('Please check the highlighted fields.', 422, { fields: e });
    const temp = tempPassword();
    const hash = await hashPassword(temp);
    const uid = await db.tx(async (c) => {
      const r = await c.q('INSERT INTO users (name, email, password, status, must_change_password, created_at, updated_at) VALUES (?,?,?,?,1,?,?)', [d.name, d.email, hash, d.status, nowUtc(), nowUtc()]);
      await setRole(c, r.insertId, d.role);
      await profileSave(r.insertId, p, c);
      return r.insertId;
    });
    done({ ok: true, user: await userRow(uid), temp_password: temp });
  }

  const u = await userRow(id);
  if (!u) fail('Not found.', 404);

  if (a === 'update') {
    const [d, p, e] = userInput(inp);
    if (!Object.keys(e).length && await emailTaken(d.email, id)) e.email = 'This email is already in use.';
    if (id === me.id && (d.role !== 'admin' || d.status !== 1)) e.role = 'You cannot remove your own admin access.';
    if (Object.keys(e).length) fail('Please check the highlighted fields.', 422, { fields: e });
    await db.tx(async (c) => {
      await c.q('UPDATE users SET name = ?, email = ?, status = ?, updated_at = ? WHERE id = ?', [d.name, d.email, d.status, nowUtc(), id]);
      await setRole(c, id, d.role);
      await profileSave(id, p, c);
    });
    done({ ok: true, user: await userRow(id), profile: await profileGet(id, true) });
  }
  if (a === 'reset_password') {
    if (id === me.id) fail('Use "Change Password" for your own account.', 422);
    const temp = tempPassword();
    await db.q('UPDATE users SET password = ?, must_change_password = 1, updated_at = ? WHERE id = ?', [await hashPassword(temp), nowUtc(), id]);
    done({ ok: true, temp_password: temp });
  }
  fail('Not found.', 404);
};
