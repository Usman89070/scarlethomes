'use strict';
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const cfg = require('./config');

/** Same sanitising as the PHP API: trimmed single-line string, control chars removed, capped. */
function strIn(src, k, max = 255) {
  let v = src ? src[k] : '';
  if (typeof v !== 'string') return '';
  v = v.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').replace(/\s+/g, ' ').trim();
  return [...v].slice(0, max).join('');
}
function textIn(src, k, max = 5000) {
  let v = src ? src[k] : '';
  if (typeof v !== 'string') return '';
  v = v.replace(/\r\n?/g, '\n').replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim();
  return [...v].slice(0, max).join('');
}
function intIn(src, k) { const v = src ? src[k] : 0; const n = Number(v); return Number.isFinite(n) ? Math.trunc(n) : 0; }

const EMAIL_RE = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;
function validEmail(e) { return !!e && e.length <= 190 && EMAIL_RE.test(e) && !e.includes('..'); }
function validDateOrEmpty(d) {
  if (d === '') return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return false;
  const t = new Date(d + 'T00:00:00Z');
  return !isNaN(t.getTime()) && t.toISOString().slice(0, 10) === d;
}
function passwordPolicyError(p) {
  if ([...p].length < 10) return 'Password must be at least 10 characters.';
  if ([...p].length > 200) return 'Password is too long.';
  if (!/[A-Za-z]/.test(p) || !/\d/.test(p)) return 'Password must contain letters and numbers.';
  return null;
}
function tempPassword() {
  const a = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
  let p;
  do { p = Array.from({ length: 14 }, () => a[crypto.randomInt(a.length)]).join(''); } while (passwordPolicyError(p));
  return p;
}
/** bcrypt cost 12, "$2y$" prefix: identical to the PHP API / old Laravel hashes. */
async function hashPassword(p) { return (await bcrypt.hash(p, 12)).replace(/^\$2[ab]\$/, '$2y$'); }
async function verifyPassword(p, hash) {
  if (typeof hash !== 'string' || !/^\$2[aby]\$\d\d\$/.test(hash)) { await bcrypt.compare(p, dummy()); return false; }
  return bcrypt.compare(p, hash.replace(/^\$2y\$/, '$2b$'));
}
// real hash of a random string: unknown accounts take as long as real ones (no timing leak)
let DUMMY = null;
function dummy() { return DUMMY || (DUMMY = bcrypt.hashSync(crypto.randomBytes(16).toString('hex'), 12)); }
function needsRehash(hash) { return !/^\$2[aby]\$12\$/.test(hash || ''); }

function nowUtc() { return new Date().toISOString().slice(0, 19).replace('T', ' '); }
function todayUtc() { return new Date().toISOString().slice(0, 10); }
function timeUtc() { return new Date().toISOString().slice(11, 19); }
function todayLocal() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: cfg.timezone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}
function ipHash(ip) { return crypto.createHash('sha256').update(ip + '|' + cfg.appSecret).digest('hex'); }
function likeArg(q) { return '%' + q.replace(/[\\%_]/g, (m) => '\\' + m) + '%'; }

module.exports = { strIn, textIn, intIn, validEmail, validDateOrEmpty, passwordPolicyError, tempPassword, hashPassword, verifyPassword, needsRehash, nowUtc, todayUtc, timeUtc, todayLocal, ipHash, likeArg };
