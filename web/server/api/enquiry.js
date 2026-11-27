'use strict';
/* POST /api/enquiry.php - contact form. Contact Form 7 JSON shape (see api/enquiry.php). */
const cfg = require('../lib/config');
const db = require('../lib/db');
const { done, fail, readBody, sameOriginOrFail, clientIp } = require('../lib/http');
const { strIn, textIn, validEmail, ipHash, nowUtc } = require('../lib/util');
const { sendMail } = require('../lib/mailer');

const SERVICES = ['Duplex', 'Knockdown Rebuild', 'New Home', 'Granny Flat', 'Not sure yet'];

function cf7(status, message, invalid = {}, http = 200) {
  done({
    contact_form_id: 84, status, message,
    invalid_fields: Object.entries(invalid).map(([field, m]) => ({ field, message: m, idref: null, error_id: 'wpcf7-f84-o1-ve-' + field })),
    into: '#wpcf7-f84-o1',
  }, http);
}

module.exports = async function enquiry(req) {
  if (req.method !== 'POST') fail('Method not allowed.', 405);
  sameOriginOrFail(req);
  const { fields: inp } = await readBody(req);
  if (strIn(inp, 'website') !== '') cf7('mail_sent', 'Thank you for your message. It has been sent.');

  const name = strIn(inp, 'your-name', 120), phone = strIn(inp, 'your-phone', 40), email = strIn(inp, 'your-email', 190);
  const suburb = strIn(inp, 'your-suburb', 120), message = textIn(inp, 'your-message', 5000);
  let service = strIn(inp, 'your-service', 60);
  if (!SERVICES.includes(service)) service = '';

  const invalid = {};
  if (!name) invalid['your-name'] = 'Please fill out this field.';
  if (!phone) invalid['your-phone'] = 'Please fill out this field.';
  else if (!/^[+]?[0-9() -]*[0-9][0-9() -]*$/.test(phone)) invalid['your-phone'] = 'Please enter a telephone number.';
  if (!validEmail(email)) invalid['your-email'] = 'Please enter an email address.';
  if (Object.keys(invalid).length) cf7('validation_failed', 'One or more fields have an error. Please check and try again.', invalid);

  const ip = ipHash(clientIp(req));
  const n = await db.val('SELECT COUNT(*) FROM contacts WHERE ip_hash = ? AND created_at > (UTC_TIMESTAMP() - INTERVAL 1 HOUR)', [ip]);
  if (Number(n) >= cfg.enquiryMaxPerHour) cf7('mail_failed', 'Too many enquiries from this connection. Please call us on 1800 727 538.', {}, 429);

  const page = strIn({ r: req.headers.referer || '' }, 'r', 255), ua = strIn({ u: req.headers['user-agent'] || '' }, 'u', 255);
  let id = null;
  try {
    const r = await db.q('INSERT INTO contacts (name, phone, email, topic, message, suburb, page_url, ip_hash, user_agent, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
      [name, phone, email, service || 'Website enquiry', message, suburb, page, ip, ua, nowUtc(), nowUtc()]);
    id = r.insertId;
  } catch (err) { console.error('[enquiry] insert failed:', err.message); }

  const body = `New enquiry from the Scarlet Homes website\n\nName:    ${name}\nPhone:   ${phone}\nEmail:   ${email}\nSuburb:  ${suburb || '-'}\nBuild:   ${service || '-'}\n\nMessage:\n${message || '-'}\n\nPage: ${page || '-'}\nReceived: ${nowUtc().slice(0, 16)} UTC${id ? `  (enquiry #${id})` : ''}\n`;
  const sent = await sendMail(cfg.mail.to, 'Website enquiry: ' + name + (service ? ` (${service})` : ''), body, email);
  if (id) await db.q('UPDATE contacts SET mail_status = ? WHERE id = ?', [sent ? 'sent' : 'failed', id]);
  if (!id && !sent) cf7('mail_failed', 'There was an error trying to send your message. Please try again later.', {}, 500);
  cf7('mail_sent', 'Thank you for your message. It has been sent.');
};
