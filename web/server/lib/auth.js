'use strict';
const crypto = require('crypto');
const db = require('./db');
const session = require('./session');
const { fail, readBody, sameOriginOrFail } = require('./http');

const ROLE_SQL = "(SELECT r.role FROM roles r WHERE r.user_id = u.id ORDER BY FIELD(r.role,'admin','supervisor','user') LIMIT 1)";

async function currentUser(req) {
  const s = await session.load(req);
  if (!s.data.uid) return null;
  const u = await db.one('SELECT u.id, u.name, u.email, u.status, u.must_change_password, ' + ROLE_SQL + ' AS role FROM users u WHERE u.id = ?', [s.data.uid]);
  if (!u || !Number(u.status)) {
    s.data = { csrf: s.data.csrf };
    await session.regenerate(req);
    return null;
  }
  u.id = Number(u.id); u.status = Number(u.status); u.must_change_password = Number(u.must_change_password);
  u.role = u.role || 'user';
  return u;
}

async function requireUser(req, allowPending = false) {
  const u = await currentUser(req);
  if (!u) fail('Please sign in.', 401, { code: 'auth' });
  if (!allowPending && u.must_change_password) fail('Please set a new password first.', 403, { code: 'must_change_password' });
  return u;
}
const isStaff = (u) => u.role === 'admin' || u.role === 'supervisor';
async function requireStaff(req) { const u = await requireUser(req); if (!isStaff(u)) fail('Forbidden.', 403); return u; }
async function requireAdmin(req) { const u = await requireUser(req); if (u.role !== 'admin') fail('Forbidden.', 403); return u; }

async function requireCsrf(req) {
  const s = await session.load(req);
  sameOriginOrFail(req);
  let t = req.headers['x-csrf-token'];
  if (!t) t = (await readBody(req)).fields.csrf;
  const a = Buffer.from(String(t || '')), b = Buffer.from(s.data.csrf);
  if (!t || a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    fail('Your session has expired. Please refresh the page and try again.', 403, { code: 'csrf' });
  }
}

function publicUser(u) {
  return { id: u.id, email: u.email, name: u.name, role: u.role, must_change_password: !!u.must_change_password };
}

module.exports = { ROLE_SQL, currentUser, requireUser, requireStaff, requireAdmin, requireCsrf, isStaff, publicUser };
