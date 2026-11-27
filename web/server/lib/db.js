'use strict';
const mysql = require('mysql2/promise');
const cfg = require('./config');

let pool = null;
function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: cfg.db.host, port: cfg.db.port, database: cfg.db.name, user: cfg.db.user, password: cfg.db.pass,
      charset: 'utf8mb4', timezone: 'Z', dateStrings: true, connectionLimit: 8, waitForConnections: true,
    });
    pool.on('connection', (c) => c.query("SET time_zone = '+00:00'"));
  }
  return pool;
}

/** Rows of a SELECT (or the result header of a write). */
async function q(sql, args = []) {
  const [rows] = await getPool().execute(sql, args.map((v) => (v === undefined ? null : v)));
  return rows;
}
async function one(sql, args) { return (await q(sql, args))[0] || null; }
async function val(sql, args) { const r = await one(sql, args); return r ? Object.values(r)[0] : null; }

/** Run fn(conn) in a transaction; conn has q/one like above. */
async function tx(fn) {
  const c = await getPool().getConnection();
  const cq = async (sql, args = []) => (await c.execute(sql, args.map((v) => (v === undefined ? null : v))))[0];
  try {
    await c.beginTransaction();
    const r = await fn({ q: cq, one: async (s, a) => (await cq(s, a))[0] || null });
    await c.commit();
    return r;
  } catch (err) {
    await c.rollback().catch(() => {});
    throw err;
  } finally { c.release(); }
}

module.exports = { q, one, val, tx, getPool };
