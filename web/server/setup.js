'use strict';
/*
 * Startup tasks for the built-in API:
 *  - creates the portal_sessions table if it is missing
 *  - one-time first admin from SETUP_ADMIN_EMAIL / SETUP_ADMIN_PASSWORD (only while no active
 *    admin exists; remove the variables afterwards)
 * Also usable from a terminal:  node server/setup.js admin <email> "<name>"   (asks nothing;
 * password from ADMIN_PASSWORD or generated and printed once)
 */
const cfg = require('./lib/config');
const db = require('./lib/db');
const { hashPassword, passwordPolicyError, tempPassword, validEmail, nowUtc } = require('./lib/util');

async function ensureTables() {
  if (db.kind === 'sqlite') return db.open(); // schema applied on open
  await db.q(`CREATE TABLE IF NOT EXISTS portal_sessions (
    id char(64) NOT NULL, user_id bigint UNSIGNED DEFAULT NULL, data text NOT NULL, last_activity int NOT NULL,
    PRIMARY KEY (id), KEY portal_sessions_activity (last_activity)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
}

async function adminExists() {
  return Number(await db.val("SELECT COUNT(*) FROM roles r JOIN users u ON u.id = r.user_id WHERE r.role = 'admin' AND u.status = 1")) > 0;
}

async function createAdmin(email, name, password) {
  email = String(email).toLowerCase();
  if (!validEmail(email)) throw new Error('invalid email');
  const err = passwordPolicyError(password);
  if (err) throw new Error(err);
  if (Number(await db.val('SELECT COUNT(*) FROM users WHERE email = ?', [email]))) throw new Error('a user with that email already exists');
  await db.tx(async (c) => {
    const r = await c.q('INSERT INTO users (name, email, password, status, must_change_password, created_at, updated_at) VALUES (?,?,?,1,0,?,?)', [name || email, email, await hashPassword(password), nowUtc(), nowUtc()]);
    await c.q("INSERT INTO roles (user_id, role, created_at, updated_at) VALUES (?, 'admin', ?, ?)", [r.insertId, nowUtc(), nowUtc()]);
  });
}

async function startup() {
  await ensureTables();
  const s = cfg.setupAdmin;
  if (s.email && s.password && !(await adminExists())) {
    await createAdmin(s.email, s.name, s.password);
    console.log('[setup] first admin created for ' + s.email + ' - now remove SETUP_ADMIN_* variables');
  }
}

module.exports = { startup, ensureTables, createAdmin };

if (require.main === module) {
  (async () => {
    const [cmd, email, name] = process.argv.slice(2);
    await ensureTables();
    if (cmd === 'admin') {
      let pw = process.env.ADMIN_PASSWORD || '';
      const gen = !pw;
      if (gen) pw = tempPassword();
      await createAdmin(email, name, pw);
      console.log('Admin created: ' + email + (gen ? '\nGenerated password (shown once): ' + pw : ''));
    } else console.log('tables ok');
    await db.getPool().end();
  })().catch(async (e) => { console.error(e.message); process.exitCode = 1; await db.getPool().end().catch(() => {}); });
}
