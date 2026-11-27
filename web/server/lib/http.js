'use strict';
const Busboy = require('busboy');
const cfg = require('./config');

class HttpError extends Error {
  constructor(status, body) { super(body.error || 'error'); this.status = status; this.body = body; }
}
/** Throw to answer {ok:false,error,...extra} with the given status (like PHP fail()). */
function fail(msg, status = 400, extra = {}) { throw new HttpError(status, { ok: false, error: msg, ...extra }); }
/** Throw to answer with an arbitrary JSON body (like PHP json_out()). */
function done(body, status = 200) { throw new HttpError(status, body); }

function send(res, status, body, headers = {}) {
  if (res.headersSent) return;
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'DENY', 'Referrer-Policy': 'same-origin', ...cors(res.req), ...headers });
  res.end(JSON.stringify(body));
}

function cors(req) {
  const o = req && req.headers.origin;
  if (cfg.devCorsOrigin && o === cfg.devCorsOrigin) {
    return { 'Access-Control-Allow-Origin': o, 'Access-Control-Allow-Credentials': 'true', 'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-Token', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', Vary: 'Origin' };
  }
  return {};
}

function clientIp(req) {
  const remote = (req.socket.remoteAddress || '').replace(/^::ffff:/, '');
  if (cfg.trustProxy && req.headers['x-forwarded-for']) {
    // the entry added by the hosting's own proxy (rightmost) cannot be forged by the visitor
    const parts = String(req.headers['x-forwarded-for']).split(',').map((s) => s.trim()).filter(Boolean);
    const ip = parts[parts.length - 1];
    if (ip) return ip.replace(/^::ffff:/, '');
  }
  return remote || '0.0.0.0';
}

/** Reject cross-site state-changing requests (on top of CSRF + SameSite=Strict). */
function sameOriginOrFail(req) {
  const origin = req.headers.origin;
  if (!origin) return;
  const host = req.headers['x-forwarded-host'] || req.headers.host || '';
  const base = cfg.siteUrl.replace(/^(https?:\/\/)www\./, '$1');
  const allowed = [cfg.siteUrl, base, base.replace(/^(https?:\/\/)/, '$1www.'), 'https://' + host, 'http://' + host];
  if (cfg.devCorsOrigin) allowed.push(cfg.devCorsOrigin);
  if (!allowed.includes(origin.replace(/\/$/, ''))) fail('Forbidden.', 403);
}

/**
 * Parse the request body: JSON, urlencoded, or multipart (files kept in memory, size-capped).
 * Returns { fields, files: { name: { buffer, filename, truncated } } }.
 */
function readBody(req) {
  if (req._body) return Promise.resolve(req._body);
  const ct = req.headers['content-type'] || '';
  const maxFile = cfg.maxUploadMb * 1024 * 1024;
  return new Promise((resolve, reject) => {
    if (/multipart\/form-data/i.test(ct)) {
      let bb;
      try { bb = Busboy({ headers: req.headers, limits: { fileSize: maxFile, files: 3, fields: 50, fieldSize: 100 * 1024 } }); } catch { return reject(new HttpError(400, { ok: false, error: 'Invalid request.' })); }
      const fields = {}, files = {};
      bb.on('field', (n, v) => { fields[n] = v; });
      bb.on('file', (n, stream, info) => {
        const chunks = []; let truncated = false;
        stream.on('data', (d) => chunks.push(d));
        stream.on('limit', () => { truncated = true; });
        stream.on('close', () => { files[n] = { buffer: Buffer.concat(chunks), filename: info.filename || '', truncated }; });
      });
      bb.on('close', () => resolve((req._body = { fields, files })));
      bb.on('error', () => reject(new HttpError(400, { ok: false, error: 'Invalid request.' })));
      req.pipe(bb);
      return;
    }
    let size = 0; const chunks = [];
    req.on('data', (d) => { size += d.length; if (size > 1024 * 1024) { req.destroy(); reject(new HttpError(413, { ok: false, error: 'Request too large.' })); } else chunks.push(d); });
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      let fields = {};
      if (/application\/json/i.test(ct)) {
        try { fields = raw ? JSON.parse(raw) : {}; } catch { return reject(new HttpError(400, { ok: false, error: 'Invalid request.' })); }
        if (!fields || typeof fields !== 'object' || Array.isArray(fields)) return reject(new HttpError(400, { ok: false, error: 'Invalid request.' }));
      } else if (raw) {
        fields = Object.fromEntries(new URLSearchParams(raw));
      }
      resolve((req._body = { fields, files: {} }));
    });
    req.on('error', reject);
  });
}

function parseCookies(req) {
  const out = {};
  for (const part of String(req.headers.cookie || '').split(';')) {
    const i = part.indexOf('=');
    if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

module.exports = { HttpError, fail, done, send, cors, clientIp, sameOriginOrFail, readBody, parseCookies };
