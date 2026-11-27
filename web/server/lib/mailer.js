'use strict';
/*
 * Enquiry emails. With SMTP_USER + SMTP_PASS: authenticated SMTP (smtp.hostinger.com:465).
 * Without them: the server's own sendmail (the same program PHP mail() uses on Hostinger),
 * so no mailbox password is needed. Resolves true/false, never throws.
 */
const fs = require('fs');
const nodemailer = require('nodemailer');
const cfg = require('./config');

const SENDMAIL = process.env.SENDMAIL_PATH || ['/usr/sbin/sendmail', '/usr/bin/sendmail', '/usr/lib/sendmail'].find((p) => fs.existsSync(p));
let transport = null;

function getTransport() {
  if (transport) return transport;
  const s = cfg.mail.smtp;
  if (s.user && s.pass) {
    transport = nodemailer.createTransport({ host: s.host, port: s.port, secure: s.secure, requireTLS: !s.secure, auth: { user: s.user, pass: s.pass }, connectionTimeout: 15000 });
  } else if (SENDMAIL) {
    transport = nodemailer.createTransport({ sendmail: true, newline: 'unix', path: SENDMAIL });
  }
  return transport;
}

async function sendMail(to, subject, text, replyTo) {
  const t = getTransport();
  if (!t) { console.error('[mail] no SMTP login and no sendmail on this server'); return false; }
  try {
    await t.sendMail({ from: { name: cfg.mail.fromName, address: cfg.mail.from }, envelope: { from: cfg.mail.from, to }, to, subject, text, replyTo: replyTo || undefined });
    return true;
  } catch (err) {
    console.error('[mail] send failed:', err.message);
    return false;
  }
}
module.exports = { sendMail };
