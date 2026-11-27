'use strict';
/*
 * Built-in Node.js API: the same endpoints, URLs and JSON as the PHP API in /api, so the
 * website scripts and the portal work unchanged on Node.js hosting.
 */
const { HttpError, send, cors } = require('../lib/http');
const session = require('../lib/session');

const ROUTES = {
  'enquiry.php': require('./enquiry'),
  'auth.php': require('./auth'),
  'me.php': require('./me'),
  'users.php': require('./users'),
  'projects.php': require('./projects'),
  'files.php': require('./files'),
  'attendance.php': require('./attendance'),
  'enquiries.php': require('./enquiries'),
};

module.exports = async function handleApi(req, res, pathname, searchParams) {
  const name = pathname.replace(/^\/api\//, '');
  const handler = ROUTES[name];
  if (!handler) return send(res, 404, { ok: false, error: 'Not found.' });
  if (req.method === 'OPTIONS') { res.writeHead(204, cors(req)); return res.end(); }
  if (!['GET', 'POST'].includes(req.method)) return send(res, 405, { ok: false, error: 'Method not allowed.' }, { Allow: 'GET, POST' });
  const q = Object.fromEntries(searchParams);
  req._res = res;
  try {
    await handler(req, res, q);
    if (!res.headersSent) throw new Error('handler returned without a response');
  } catch (err) {
    if (res.headersSent) return;
    if (err instanceof HttpError) {
      try { if (req.session) await session.save(req); } catch (e) { console.error('[api] session save failed:', e.message); }
      return send(res, err.status, err.body);
    }
    console.error('[api]', name, err && err.stack ? err.stack : err);
    const dbDown = err && /ECONNREFUSED|ER_ACCESS_DENIED|ENOTFOUND|ER_BAD_DB|PROTOCOL_CONNECTION_LOST/.test(String(err.code || err.message));
    send(res, dbDown ? 503 : 500, { ok: false, error: dbDown ? 'Service unavailable.' : 'Something went wrong. Please try again.' });
  }
};
