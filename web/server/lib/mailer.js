'use strict';
const nodemailer = require('nodemailer');
const cfg = require('./config');

let transport = null;
/** Plain-text mail via SMTP (Hostinger: smtp.hostinger.com:465). Resolves true/false, never throws. */
async function sendMail(to, subject, text, replyTo) {
  const s = cfg.mail.smtp;
  if (!s.host || !s.user || !s.pass) { console.error('[mail] SMTP not configured'); return false; }
  try {
    transport = transport || nodemailer.createTransport({ host: s.host, port: s.port, secure: s.secure, requireTLS: !s.secure, auth: { user: s.user, pass: s.pass }, connectionTimeout: 15000 });
    await transport.sendMail({ from: { name: cfg.mail.fromName, address: cfg.mail.from }, to, subject, text, replyTo: replyTo || undefined });
    return true;
  } catch (err) {
    console.error('[mail] send failed:', err.message);
    return false;
  }
}
module.exports = { sendMail };
