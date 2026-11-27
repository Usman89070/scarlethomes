'use strict';
/*
 * Settings for the built-in Node.js API, from environment variables (Hostinger: Node.js app
 * -> Settings -> Environment variables) or a `.env` file next to package.json.
 * See .env.example for every variable.
 */
const fs = require('fs');
const path = require('path');

const envFile = path.join(__dirname, '..', '..', '.env');
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (!m || line.trim().startsWith('#')) continue;
    let v = m[2];
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (process.env[m[1]] === undefined) process.env[m[1]] = v;
  }
}

const e = (k, d = '') => (process.env[k] !== undefined && process.env[k] !== '' ? process.env[k] : d);
const bool = (k, d) => { const v = e(k, d ? '1' : '0').toLowerCase(); return v === '1' || v === 'true' || v === 'yes'; };

module.exports = {
  db: { host: e('DB_HOST', 'localhost'), port: Number(e('DB_PORT', '3306')), name: e('DB_NAME'), user: e('DB_USER'), pass: e('DB_PASS') },
  siteUrl: e('SITE_URL', 'https://scarlethomes.com.au').replace(/\/$/, ''),
  appSecret: e('APP_SECRET'),
  mail: {
    to: e('MAIL_TO', 'info@scarlethomes.com.au'),
    from: e('MAIL_FROM', 'website@scarlethomes.com.au'),
    fromName: e('MAIL_FROM_NAME', 'Scarlet Homes Website'),
    smtp: { host: e('SMTP_HOST', 'smtp.hostinger.com'), port: Number(e('SMTP_PORT', '465')), secure: e('SMTP_ENCRYPTION', 'ssl') === 'ssl', user: e('SMTP_USER'), pass: e('SMTP_PASS') },
  },
  uploadsDir: path.resolve(e('UPLOADS_DIR', path.join(__dirname, '..', '..', 'storage', 'uploads'))),
  maxUploadMb: Number(e('MAX_UPLOAD_MB', '20')),
  timezone: e('TIMEZONE', 'Australia/Sydney'),
  enquiryMaxPerHour: Number(e('ENQUIRY_MAX_PER_HOUR', '5')),
  auth: {
    idleMinutes: Number(e('SESSION_IDLE_MINUTES', '30')),
    maxFailsPerEmail: Number(e('LOGIN_MAX_FAILS_PER_EMAIL', '5')),
    maxFailsPerIp: Number(e('LOGIN_MAX_FAILS_PER_IP', '20')),
    lockoutMinutes: Number(e('LOGIN_LOCKOUT_MINUTES', '15')),
  },
  insecureCookies: bool('INSECURE_COOKIES', false),
  trustProxy: bool('TRUST_PROXY', true),
  devCorsOrigin: e('DEV_CORS_ORIGIN'),
  setupAdmin: { email: e('SETUP_ADMIN_EMAIL'), name: e('SETUP_ADMIN_NAME'), password: e('SETUP_ADMIN_PASSWORD') },
};
