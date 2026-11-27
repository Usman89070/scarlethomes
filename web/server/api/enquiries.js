'use strict';
/* /api/enquiries.php - admin only */
const db = require('../lib/db');
const { done, fail } = require('../lib/http');
const { requireAdmin } = require('../lib/auth');
const { strIn, intIn, likeArg } = require('../lib/util');

module.exports = async function enquiries(req, res, q) {
  if (req.method !== 'GET') fail('Method not allowed.', 405);
  await requireAdmin(req);
  const page = Math.max(1, intIn(q, 'page')), per = 25, off = (page - 1) * per;
  const qq = strIn(q, 'q', 100);
  let w = '', args = [];
  if (qq) { w = 'WHERE name LIKE ? OR email LIKE ? OR phone LIKE ? OR suburb LIKE ? OR topic LIKE ? OR message LIKE ?'; args = Array(6).fill(likeArg(qq)); }
  const total = Number(await db.val(`SELECT COUNT(*) FROM contacts ${w}`, args));
  const items = await db.q(`SELECT id, name, phone, email, suburb, topic, message, page_url, mail_status, created_at FROM contacts ${w} ORDER BY id DESC LIMIT ${per} OFFSET ${off}`, args);
  done({ ok: true, total, page, per_page: per, items });
};
