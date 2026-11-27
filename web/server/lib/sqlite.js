'use strict';
/*
 * Zero-configuration database: a SQLite file (pure JavaScript sql.js - nothing to compile or
 * install on the server). Used when no MySQL settings (DB_NAME) are given.
 * On first start the file is created from data-seed/scarlethomes.sqlite when the package
 * includes one (e.g. the old site's data), else from server/schema.sqlite.sql.
 * The API's SQL is written for MySQL; translate() maps the few MySQL-only parts.
 * Every write is saved to disk atomically (write temp file + rename).
 */
const fs = require('fs');
const path = require('path');
const cfg = require('./config');

let SQL = null, dbh = null, opening = null;
let chain = Promise.resolve();

async function open() {
  if (dbh) return dbh;
  if (opening) return opening;
  opening = (async () => {
    SQL = await require('sql.js')();
    const file = cfg.sqliteFile;
    fs.mkdirSync(path.dirname(file), { recursive: true });
    if (!fs.existsSync(file)) {
      const seed = path.join(__dirname, '..', '..', 'data-seed', 'scarlethomes.sqlite');
      if (fs.existsSync(seed)) {
        fs.copyFileSync(seed, file);
        console.log('[db] created ' + file + ' from the bundled data');
      } else {
        const d = new SQL.Database();
        d.exec(fs.readFileSync(path.join(__dirname, '..', 'schema.sqlite.sql'), 'utf8'));
        writeFile(file, d.export());
        d.close();
        console.log('[db] created empty database ' + file);
      }
    }
    const h = new SQL.Database(fs.readFileSync(file));
    // make sure newer tables exist in an older file
    h.exec(fs.readFileSync(path.join(__dirname, '..', 'schema.sqlite.sql'), 'utf8'));
    h.exec('PRAGMA foreign_keys = ON');
    dbh = h;
    return h;
  })();
  return opening;
}

function writeFile(file, bytes) {
  const tmp = file + '.tmp-' + process.pid;
  fs.writeFileSync(tmp, Buffer.from(bytes), { mode: 0o600 });
  fs.renameSync(tmp, file);
}
function persist() { writeFile(cfg.sqliteFile, dbh.export()); }

const KEYS = { contractor_profiles: 'user_id', portal_sessions: 'id' };
function translate(sql) {
  let s = sql
    .replace(/UTC_TIMESTAMP\(\)\s*-\s*INTERVAL\s+(\d+)\s+(HOUR|MINUTE|DAY)/gi, (m, n, u) => `datetime('now','-${n} ${u.toLowerCase()}s')`)
    .replace(/UTC_TIMESTAMP\(\)/gi, "datetime('now')")
    .replace(/DATE_ADD\(\?,\s*INTERVAL\s+1\s+DAY\)/gi, "date(?, '+1 day')")
    .replace(/FIELD\(([\w.]+),\s*'admin',\s*'supervisor',\s*'user'\)/g, "CASE $1 WHEN 'admin' THEN 1 WHEN 'supervisor' THEN 2 ELSE 3 END")
    .replace(/ LIKE \?/g, " LIKE ? ESCAPE '\\'");
  const dup = s.match(/^\s*INSERT INTO (\w+)[\s\S]*?ON DUPLICATE KEY UPDATE([\s\S]*)$/i);
  if (dup) {
    const key = KEYS[dup[1]];
    if (!key) throw new Error('no conflict key for ' + dup[1]);
    s = s.replace(/ON DUPLICATE KEY UPDATE[\s\S]*$/i, `ON CONFLICT(${key}) DO UPDATE SET` + dup[2].replace(/VALUES\((\w+)\)/g, 'excluded.$1'));
  }
  return s;
}

function exec(sql, args) {
  const st = dbh.prepare(translate(sql));
  try {
    st.bind(args.map((v) => (v === undefined ? null : typeof v === 'boolean' ? (v ? 1 : 0) : v)));
    if (/^\s*(SELECT|WITH|PRAGMA)/i.test(sql)) {
      const rows = [];
      while (st.step()) rows.push(st.getAsObject());
      return rows;
    }
    st.step();
    const affectedRows = dbh.getRowsModified();
    const insertId = dbh.exec('SELECT last_insert_rowid()')[0].values[0][0];
    return { insertId: Number(insertId), affectedRows };
  } finally { st.free(); }
}

/** Serialise all access (one in-memory connection). */
function locked(fn) {
  const run = chain.then(fn, fn);
  chain = run.catch(() => {});
  return run;
}

async function q(sql, args = []) {
  await open();
  return locked(() => {
    const r = exec(sql, args);
    if (!Array.isArray(r)) persist();
    return r;
  });
}
async function one(sql, args) { return (await q(sql, args))[0] || null; }
async function val(sql, args) { const r = await one(sql, args); return r ? Object.values(r)[0] : null; }

async function tx(fn) {
  await open();
  return locked(async () => {
    dbh.exec('BEGIN');
    const cq = async (sql, args = []) => exec(sql, args);
    try {
      const r = await fn({ q: cq, one: async (s, a) => (await cq(s, a))[0] || null });
      dbh.exec('COMMIT');
      persist();
      return r;
    } catch (err) {
      try { dbh.exec('ROLLBACK'); } catch { /* ignore */ }
      throw err;
    }
  });
}

module.exports = { q, one, val, tx, open, getPool: () => ({ end: async () => {} }), translate };
