'use strict';
/*
 * Private portal files. DB paths are relative to UPLOADS_DIR, same shape as the old Laravel
 * storage/app/public ("project/attachments/x.pdf"). Type is checked from the file content.
 */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const cfg = require('./config');
const { fail } = require('./http');

function sniff(buf) {
  if (buf.length >= 5 && buf.slice(0, 5).toString('latin1') === '%PDF-') return ['pdf', 'application/pdf'];
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return ['jpg', 'image/jpeg'];
  if (buf.length >= 8 && buf.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return ['png', 'image/png'];
  if (buf.length >= 12 && buf.slice(0, 4).toString('latin1') === 'RIFF' && buf.slice(8, 12).toString('latin1') === 'WEBP') return ['webp', 'image/webp'];
  return null;
}

/** Validate + store an uploaded file; returns the relative path or null when none was sent. */
function storeUpload(file, subdir, imagesOnly = false) {
  if (!file || (!file.buffer.length && !file.filename)) return null;
  if (file.truncated) fail(`The file is too large (max ${cfg.maxUploadMb} MB).`, 422);
  if (!file.buffer.length) fail('The upload failed. Please try again.', 422);
  const t = sniff(file.buffer);
  if (!t || (imagesOnly && t[0] === 'pdf')) fail(imagesOnly ? 'Upload a JPG, PNG or WebP photo.' : 'Upload a PDF, JPG, PNG or WebP file.', 422);
  const rel = subdir.replace(/^\/+|\/+$/g, '') + '/' + crypto.randomBytes(16).toString('hex') + '.' + t[0];
  const abs = path.join(cfg.uploadsDir, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true, mode: 0o750 });
  fs.writeFileSync(abs, file.buffer, { mode: 0o640 });
  return rel;
}

function uploadPath(rel) {
  if (!rel || rel.includes('\0')) return null;
  let base;
  try { base = fs.realpathSync(cfg.uploadsDir); } catch { return null; }
  let p;
  try { p = fs.realpathSync(path.join(base, rel.replace(/^\/+/, ''))); } catch { return null; }
  if (!p.startsWith(base + path.sep)) return null;
  try { return fs.statSync(p).isFile() ? p : null; } catch { return null; }
}

function deleteUpload(rel) { const p = uploadPath(rel); if (p) try { fs.unlinkSync(p); } catch { /* ignore */ } }

function sendFile(res, rel, name) {
  const p = uploadPath(rel);
  if (!p) fail('File not found.', 404);
  const buf = fs.readFileSync(p);
  const t = sniff(buf);
  const mime = t ? t[1] : 'application/octet-stream';
  const ext = path.extname(p).slice(1);
  let fname = String(name).replace(/[^A-Za-z0-9 ._-]+/g, '') || 'file';
  if (!fname.toLowerCase().endsWith('.' + ext.toLowerCase())) fname += '.' + ext;
  res.writeHead(200, {
    'Content-Type': mime, 'Content-Length': buf.length,
    'Content-Disposition': `${t ? 'inline' : 'attachment'}; filename="${fname}"`,
    'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff',
    'Content-Security-Policy': "default-src 'none'; img-src 'self'; style-src 'unsafe-inline'; sandbox",
  });
  res.end(buf);
}

module.exports = { storeUpload, uploadPath, deleteUpload, sendFile };
