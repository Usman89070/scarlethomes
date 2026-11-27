'use strict';
const db = require('./db');
const { strIn, textIn, validDateOrEmpty, nowUtc } = require('./util');

const PROFILE_FIELDS = ['business_name', 'phone', 'trade', 'licence_no', 'abn', 'insurance_expiry'];

function profileInput(inp, withNotes) {
  const d = {
    business_name: strIn(inp, 'business_name', 160), phone: strIn(inp, 'phone', 40), trade: strIn(inp, 'trade', 80),
    licence_no: strIn(inp, 'licence_no', 60), abn: strIn(inp, 'abn', 20).replace(/[^0-9 ]/g, ''), insurance_expiry: strIn(inp, 'insurance_expiry', 10),
  };
  const e = {};
  if (d.phone && !/^[+]?[0-9() -]{6,}$/.test(d.phone)) e.phone = 'Enter a valid phone number.';
  if (d.abn && d.abn.replace(/ /g, '').length !== 11) e.abn = 'ABN must be 11 digits.';
  if (!validDateOrEmpty(d.insurance_expiry)) e.insurance_expiry = 'Use a valid date.';
  if (withNotes) d.notes = textIn(inp, 'notes', 5000);
  return [d, e];
}

async function profileGet(userId, withNotes) {
  const p = (await db.one('SELECT business_name, phone, trade, licence_no, abn, insurance_expiry, notes FROM contractor_profiles WHERE user_id = ?', [userId])) || {};
  const out = {};
  for (const k of PROFILE_FIELDS) out[k] = p[k] ?? (k === 'insurance_expiry' ? null : '');
  if (withNotes) out.notes = p.notes ?? '';
  return out;
}

async function profileSave(userId, d, conn = db) {
  const v = { ...d };
  if ('insurance_expiry' in v && v.insurance_expiry === '') v.insurance_expiry = null;
  const cols = Object.keys(v);
  await conn.q(`INSERT INTO contractor_profiles (user_id, ${cols.join(', ')}, created_at, updated_at) VALUES (?${', ?'.repeat(cols.length)}, ?, ?)
    ON DUPLICATE KEY UPDATE ${cols.map((c) => `${c} = VALUES(${c})`).join(', ')}, updated_at = VALUES(updated_at)`, [userId, ...cols.map((c) => v[c]), nowUtc(), nowUtc()]);
}

module.exports = { PROFILE_FIELDS, profileInput, profileGet, profileSave };
