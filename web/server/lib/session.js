'use strict';
/*
 * Server-side sessions in MySQL (table portal_sessions), cookie SHPORTAL:
 * HttpOnly, SameSite=Strict, Secure (unless INSECURE_COOKIES=1 for local http).
 * Same behaviour as the PHP API: 30 min idle timeout, new id on login, CSRF token per session.
 */
const crypto = require('crypto');
const cfg = require('./config');
const db = require('./db');
const { parseCookies } = require('./http');

const NAME = 'SHPORTAL';
const newId = () => crypto.randomBytes(32).toString('hex');

async function load(req, res) {
  if (req.session) return req.session;
  const sid = parseCookies(req)[NAME];
  let data = null, id = null;
  if (sid && /^[0-9a-f]{64}$/.test(sid)) {
    const row = await db.one('SELECT data, last_activity FROM portal_sessions WHERE id = ?', [sid]);
    if (row) {
      const idle = Date.now() / 1000 - Number(row.last_activity);
      if (idle <= cfg.auth.idleMinutes * 60) { id = sid; try { data = JSON.parse(row.data); } catch { data = null; } }
      else await db.q('DELETE FROM portal_sessions WHERE id = ?', [sid]);
    }
  }
  const s = { id, data: data || {}, res: res || req._res, dirty: !id };
  if (!s.data.csrf) { s.data.csrf = crypto.randomBytes(32).toString('hex'); s.dirty = true; }
  req.session = s;
  return s;
}

/** Persist (and set the cookie when the id is new). Called before every response. */
async function save(req) {
  const s = req.session;
  if (!s || s.destroyed) return;
  const now = Math.floor(Date.now() / 1000);
  const fresh = !s.id;
  if (fresh) s.id = newId();
  await db.q('INSERT INTO portal_sessions (id, user_id, data, last_activity) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE user_id = VALUES(user_id), data = VALUES(data), last_activity = VALUES(last_activity)',
    [s.id, s.data.uid || null, JSON.stringify(s.data), now]);
  if (fresh) setCookie(s.res, s.id);
  if (Math.random() < 0.02) db.q('DELETE FROM portal_sessions WHERE last_activity < ?', [now - cfg.auth.idleMinutes * 60]).catch(() => {});
}

function setCookie(res, value, expire = false) {
  const parts = [`${NAME}=${value}`, 'Path=/', 'HttpOnly', 'SameSite=Strict'];
  if (!cfg.insecureCookies) parts.splice(2, 0, 'Secure');
  if (expire) parts.push('Max-Age=0');
  const prev = res.getHeader('Set-Cookie');
  res.setHeader('Set-Cookie', [...(Array.isArray(prev) ? prev : prev ? [prev] : []), parts.join('; ')]);
}

/** New session id, keeping the data (call on login / password change). */
async function regenerate(req) {
  const s = req.session;
  if (s.id) await db.q('DELETE FROM portal_sessions WHERE id = ?', [s.id]);
  s.id = null;
}

async function destroy(req) {
  const s = req.session;
  if (s && s.id) await db.q('DELETE FROM portal_sessions WHERE id = ?', [s.id]);
  setCookie(s.res, '', true);
  s.destroyed = true;
}

module.exports = { load, save, regenerate, destroy };
