'use strict';
/* /api/me.php - own details (see api/me.php) */
const db = require('../lib/db');
const { done, fail, readBody } = require('../lib/http');
const { requireUser, requireCsrf, currentUser, publicUser } = require('../lib/auth');
const { strIn, nowUtc } = require('../lib/util');
const { profileInput, profileGet, profileSave } = require('../lib/users');

module.exports = async function me(req) {
  if (req.method !== 'GET' && req.method !== 'POST') fail('Method not allowed.', 405);
  let u = await requireUser(req);
  const contractor = u.role === 'user';
  if (req.method === 'POST') {
    await requireCsrf(req);
    const { fields: inp } = await readBody(req);
    const name = strIn(inp, 'name', 255);
    let errors = {};
    if (!name) errors.name = 'Required.';
    let profile = {};
    if (contractor) { const [p, pe] = profileInput(inp, false); profile = p; errors = { ...errors, ...pe }; }
    if (Object.keys(errors).length) fail('Please check the highlighted fields.', 422, { fields: errors });
    await db.q('UPDATE users SET name = ?, updated_at = ? WHERE id = ?', [name, nowUtc(), u.id]);
    if (contractor) await profileSave(u.id, profile);
    u = await currentUser(req);
  }
  done({ ok: true, user: publicUser(u), profile: contractor ? await profileGet(u.id, false) : null });
};
