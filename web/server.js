/*
 * Production server for Node.js hosting (Hostinger "Node.js app"): `npm run build` then `npm start`.
 * Serves the static export in ./out (clean URLs, 404 page, caching + security headers, gzip)
 * and the API under /api/*:
 *   - built-in Node.js API (server/api, same endpoints as the PHP API) when DB_NAME is set
 *     - see .env.example for the variables (database, mail, uploads folder, ...)
 *   - or, if API_ORIGIN is set, /api/* is forwarded to a PHP site running the api/ folder
 *     (PROXY_SECRET = 'proxy_secret' in api/config.php so PHP trusts the visitor IP).
 */
'use strict';
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT = path.join(__dirname, 'out');
const PORT = Number(process.env.PORT) || 3000;
const cfg = require('./server/lib/config'); // also loads .env
const API = process.env.API_ORIGIN ? new URL(process.env.API_ORIGIN) : null;
const NODE_API = !API; // built-in API: MySQL when DB_NAME is set, else a SQLite file (no setup)
const handleApi = NODE_API ? require('./server/api') : null;
const SECRET = process.env.PROXY_SECRET || '';

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.svg': 'image/svg+xml',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.woff': 'font/woff',
};
const COMPRESS = /^(text\/|application\/(javascript|json|xml)|image\/svg)/;
const SECURITY = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://i.ytimg.com; font-src 'self'; connect-src 'self'; frame-src https://www.youtube-nocookie.com https://maps.google.com https://www.google.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'",
};

function cacheFor(rel, ext) {
  if (rel.startsWith('/_next/static/') || rel.startsWith('/js/')) return 'public, max-age=31536000, immutable';
  if (rel.startsWith('/images/') || ext === '.ico' || ext === '.png') return 'public, max-age=2592000';
  return 'no-cache';
}

function sendFile(req, res, file, status) {
  const ext = path.extname(file).toLowerCase();
  const type = TYPES[ext] || 'application/octet-stream';
  const rel = '/' + path.relative(ROOT, file).split(path.sep).join('/');
  const headers = { ...SECURITY, 'Content-Type': type, 'Cache-Control': status === 200 ? cacheFor(rel, ext) : 'no-cache', Vary: 'Accept-Encoding' };
  const gzip = COMPRESS.test(type) && /\bgzip\b/.test(req.headers['accept-encoding'] || '');
  if (gzip) headers['Content-Encoding'] = 'gzip';
  else headers['Content-Length'] = fs.statSync(file).size;
  res.writeHead(status, headers);
  if (req.method === 'HEAD') return res.end();
  const stream = fs.createReadStream(file);
  (gzip ? stream.pipe(zlib.createGzip()) : stream).pipe(res);
}

function notFound(req, res) {
  const f = path.join(ROOT, '404.html');
  if (fs.existsSync(f)) return sendFile(req, res, f, 404);
  res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('Not found');
}

function redirect(res, to) {
  res.writeHead(301, { Location: to, 'Cache-Control': 'no-cache' }); res.end();
}

function proxyApi(req, res) {
  if (!API) {
    res.writeHead(503, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    return res.end(JSON.stringify({ ok: false, status: 'mail_failed', error: 'Service unavailable.', message: 'Something went wrong. Please call us on 1800 727 538.' }));
  }
  const headers = { ...req.headers, host: API.host };
  const ip = (req.socket.remoteAddress || '').replace(/^::ffff:/, '');
  const prior = req.headers['x-forwarded-for'];
  headers['x-forwarded-for'] = prior ? prior + ', ' + ip : ip;
  headers['x-forwarded-proto'] = req.headers['x-forwarded-proto'] || 'https';
  if (SECRET) headers['x-sh-proxy'] = SECRET; else delete headers['x-sh-proxy'];
  const lib = API.protocol === 'https:' ? https : http;
  const up = lib.request({ protocol: API.protocol, hostname: API.hostname, port: API.port || (API.protocol === 'https:' ? 443 : 80), method: req.method, path: (API.pathname.replace(/\/$/, '')) + req.url, headers, timeout: 30000 }, (r) => {
    res.writeHead(r.statusCode || 502, r.headers);
    r.pipe(res);
  });
  up.on('timeout', () => up.destroy(new Error('timeout')));
  up.on('error', () => {
    if (res.headersSent) return res.destroy();
    res.writeHead(502, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    res.end(JSON.stringify({ ok: false, status: 'mail_failed', error: 'Service unavailable.', message: 'Something went wrong. Please call us on 1800 727 538.' }));
  });
  req.pipe(up);
}

function handle(req, res) {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname); } catch { res.writeHead(400); return res.end(); }
  if (pathname.startsWith('/api/')) {
    if (handleApi) return handleApi(req, res, pathname, new URL(req.url, 'http://x').searchParams);
    return proxyApi(req, res);
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405, { Allow: 'GET, HEAD' }); return res.end(); }
  if (/^\/login\/?$/.test(pathname)) return redirect(res, '/portal/');
  const file = path.normalize(path.join(ROOT, pathname));
  if (file !== ROOT && !file.startsWith(ROOT + path.sep)) return notFound(req, res);
  if (path.basename(file).startsWith('.')) return notFound(req, res);
  fs.stat(file, (err, st) => {
    if (!err && st.isDirectory()) {
      if (!pathname.endsWith('/')) return redirect(res, pathname + '/' + (req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : ''));
      const idx = path.join(file, 'index.html');
      return fs.existsSync(idx) ? sendFile(req, res, idx, 200) : notFound(req, res);
    }
    if (!err && st.isFile()) return sendFile(req, res, file, 200);
    notFound(req, res);
  });
}

// Express when installed (Hostinger detects the app as "Express"); plain Node http otherwise.
let server;
try {
  const express = require('express');
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', true);
  app.use((req, res) => handle(req, res));
  server = http.createServer(app);
} catch {
  server = http.createServer(handle);
}

if (!fs.existsSync(path.join(ROOT, 'index.html'))) {
  console.error('out/ is missing: run "npm run build" before "npm start".');
  process.exit(1);
}
const ready = NODE_API ? require('./server/setup').startup() : Promise.resolve();
ready.catch((e) => console.error('[setup] database not ready:', e.message)).finally(() => {
  server.listen(PORT, () => console.log(`Scarlet Homes on port ${PORT} - API: ${NODE_API ? 'built-in (Node.js + ' + (cfg.db.name ? 'MySQL' : 'SQLite ' + cfg.sqliteFile) + ')' : API ? 'proxy -> ' + API.origin : 'not configured'}`));
});
