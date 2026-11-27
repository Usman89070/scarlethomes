'use strict';
/* /api/auth.php  ?a=session | login | logout | password  (see api/auth.php) */
const crypto = require('crypto');
const cfg = require('../lib/config');
const db = require('../lib/db');
const session = require('../lib/session');
const { done, fail, readBody, clientIp } = require('../lib/http');
const { currentUser, requireUser, requireCsrf, publicUser } = require('../lib/auth');
const { strIn, ipHash, verifyPassword, needsRehash, hashPassword, passwordPolicyError, nowUtc } = require('../lib/util');

module.exports = async function auth(req, res, q) {
  const a = q.a || '';
  if (req.method === 'GET' && a === 'session') {
    const u = await currentUser(req);
    done({ ok: true, user: u ? publicUser(u) : null, csrf: req.session.data.csrf });
  }
  if (req.method !== 'POST') fail('Not found.', 404);
  await requireCsrf(req);
  const { fields: inp } = await readBody(req);
  const s = req.session;

  if (a === 'login') {
    const email = strIn(inp, 'email', 190).toLowerCase();
    const pass = typeof inp.password === 'string' ? inp.password : '';
    const ip = ipHash(clientIp(req));
    const win = cfg.auth.lockoutMinutes;
    const c = await db.one(`SELECT
      (SELECT COUNT(*) FROM login_attempts WHERE email = ? AND success = 0 AND created_at > UTC_TIMESTAMP() - INTERVAL ${win} MINUTE) AS by_email,
      (SELECT COUNT(*) FROM login_attempts WHERE ip_hash = ? AND success = 0 AND created_at > UTC_TIMESTAMP() - INTERVAL ${win} MINUTE) AS by_ip`, [email, ip]);
    if (Number(c.by_email) >= cfg.auth.maxFailsPerEmail || Number(c.by_ip) >= cfg.auth.maxFailsPerIp) {
      fail(`Too many sign-in attempts. Please wait ${win} minutes and try again.`, 429, { code: 'locked' });
    }
    const u = await db.one('SELECT id, password, status FROM users WHERE email = ?', [email]);
    const okPw = await verifyPassword(pass, u ? u.password : null);
    const ok = okPw && u && Number(u.status) === 1;
    await db.q('INSERT INTO login_attempts (ip_hash, email, success, created_at) VALUES (?,?,?,?)', [ip, email, ok ? 1 : 0, nowUtc()]);
    if (!ok) fail('Incorrect email or password.', 401);
    if (needsRehash(u.password)) await db.q('UPDATE users SET password = ? WHERE id = ?', [await hashPassword(pass), u.id]);
    await session.regenerate(req);
    s.data = { uid: Number(u.id), csrf: crypto.randomBytes(32).toString('hex') };
    await db.q('UPDATE users SET last_login_at = UTC_TIMESTAMP() WHERE id = ?', [u.id]);
    await db.q('DELETE FROM login_attempts WHERE email = ? AND success = 0', [email]);
    done({ ok: true, user: publicUser(await currentUser(req)), csrf: s.data.csrf });
  }

  if (a === 'logout') {
    await session.destroy(req);
    done({ ok: true });
  }

  if (a === 'password') {
    const u = await requireUser(req, true);
    const cur = typeof inp.current === 'string' ? inp.current : '';
    const next = typeof inp.next === 'string' ? inp.next : '';
    const row = await db.one('SELECT password FROM users WHERE id = ?', [u.id]);
    if (!(await verifyPassword(cur, row && row.password))) fail('Your current password is incorrect.', 400);
    const err = passwordPolicyError(next);
    if (err) fail(err, 400);
    if (cur === next) fail('Choose a password you have not used here before.', 400);
    await db.q('UPDATE users SET password = ?, must_change_password = 0, updated_at = ? WHERE id = ?', [await hashPassword(next), nowUtc(), u.id]);
    await session.regenerate(req);
    done({ ok: true, user: publicUser(await currentUser(req)) });
  }
  fail('Not found.', 404);
};
