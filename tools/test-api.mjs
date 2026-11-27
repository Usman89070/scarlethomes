// End-to-end API tests against a running dev server (php -S 127.0.0.1:8080 tools/dev-router.php)
// with an empty test database. usage: node tools/test-api.mjs [base]
const BASE = process.argv[2] || 'http://127.0.0.1:8080';
let pass = 0, failN = 0;
const ok = (c, m) => { if (c) { pass++; console.log('  ✓ ' + m); } else { failN++; console.log('  ✗ ' + m); } };

class Client {
  constructor() { this.cookies = {}; this.csrf = ''; this.lastSetCookie = ''; }
  async req(path, { method = 'GET', json, form, headers = {}, csrf = true } = {}) {
    const h = { ...headers };
    const c = Object.entries(this.cookies).map(([k, v]) => `${k}=${v}`).join('; ');
    if (c) h.Cookie = c;
    let body;
    if (json !== undefined) { body = JSON.stringify(json); h['Content-Type'] = 'application/json'; }
    if (form) { body = new URLSearchParams(form); }
    if (method === 'POST' && csrf && json !== undefined) h['X-CSRF-Token'] = this.csrf;
    const r = await fetch(BASE + path, { method, headers: h, body, redirect: 'manual' });
    for (const sc of r.headers.getSetCookie()) {
      this.lastSetCookie = sc;
      const [kv] = sc.split(';'); const i = kv.indexOf('=');
      this.cookies[kv.slice(0, i)] = kv.slice(i + 1);
    }
    let data = null; try { data = await r.json(); } catch {}
    if (data && data.csrf) this.csrf = data.csrf;
    return { status: r.status, data };
  }
  session() { return this.req('/api/auth.php?a=session'); }
  login(email, password) { return this.req('/api/auth.php?a=login', { method: 'POST', json: { email, password } }); }
}

(async () => {
  console.log('enquiry');
  const e = new Client();
  let r = await e.req('/api/enquiry.php', { method: 'POST', form: { 'your-name': '', 'your-phone': '', 'your-email': 'nope' } });
  ok(r.data.status === 'validation_failed' && r.data.invalid_fields.map((f) => f.field).join() === 'your-name,your-phone,your-email', 'missing fields -> validation_failed with CF7 field list');
  ok(r.data.message === 'One or more fields have an error. Please check and try again.', 'CF7 validation message');
  r = await e.req('/api/enquiry.php', { method: 'POST', form: { 'your-name': 'A', 'your-phone': 'abc', 'your-email': 'a@b.co' } });
  ok(r.data.invalid_fields.length === 1 && r.data.invalid_fields[0].message === 'Please enter a telephone number.', 'bad phone rejected');
  r = await e.req('/api/enquiry.php', { method: 'POST', form: { 'your-name': 'Bot', 'your-phone': '0400000000', 'your-email': 'b@b.co', website: 'http://spam' } });
  ok(r.data.status === 'mail_sent', 'honeypot -> silent success');
  r = await e.req('/api/enquiry.php', { method: 'GET' });
  ok(r.status === 405, 'GET not allowed');
  r = await e.req('/api/enquiry.php', { method: 'POST', form: { 'your-name': 'X', 'your-phone': '0400000000', 'your-email': 'x@y.co' }, headers: { Origin: 'https://evil.example' } });
  ok(r.status === 403, 'cross-origin post rejected');
  let statuses = [];
  for (let i = 0; i < 6; i++) {
    r = await e.req('/api/enquiry.php', { method: 'POST', form: { 'your-name': 'Test Person ' + i, 'your-phone': '0400 000 00' + i, 'your-email': 't@example.com', 'your-suburb': 'Hornsby', 'your-service': 'Duplex', 'your-message': '<b>hi</b>\nline 2' } });
    statuses.push(r.status + ':' + r.data.status);
  }
  ok(statuses.slice(0, 5).every((s) => s === '200:mail_sent'), 'valid enquiries accepted and stored (' + statuses.slice(0, 5).join(' ') + ')');
  ok(statuses[5] === '429:mail_failed', 'per-IP rate limit after 5/hour (' + statuses[5] + ')');

  console.log('auth');
  const a = new Client();
  r = await a.session();
  ok(r.data.user === null && /^[0-9a-f]{64}$/.test(r.data.csrf), 'anonymous session has CSRF token');
  ok(/HttpOnly/i.test(a.lastSetCookie) && /SameSite=Strict/i.test(a.lastSetCookie), 'session cookie HttpOnly + SameSite=Strict: ' + a.lastSetCookie.replace(/=[^;]+/, '=…'));
  r = await a.req('/api/auth.php?a=login', { method: 'POST', json: { email: 'admin@example.com', password: 'Adm1nPassw0rd!' }, csrf: false });
  ok(r.status === 403 && r.data.code === 'csrf', 'login without CSRF token rejected');
  r = await a.login('admin@example.com', 'wrong-password-1');
  ok(r.status === 401 && r.data.error === 'Incorrect email or password.', 'wrong password -> generic error');
  r = await a.login('nobody@example.com', 'whatever123');
  ok(r.status === 401 && r.data.error === 'Incorrect email or password.', 'unknown email -> same generic error');
  const sidBefore = a.cookies.SHPORTAL;
  r = await a.login('admin@example.com', 'Adm1nPassw0rd!');
  ok(r.status === 200 && r.data.user.role === 'admin', 'admin login');
  ok(a.cookies.SHPORTAL && a.cookies.SHPORTAL !== sidBefore, 'session id regenerated on login');

  console.log('admin');
  r = await a.req('/api/admin.php?a=contractors');
  ok(r.data.total === 4, 'list contractors (seed: 4)');
  r = await a.req('/api/admin.php?a=contractors&q=plumb');
  ok(r.data.total === 1 && r.data.items[0].trade === 'Plumber', 'search');
  r = await a.req('/api/admin.php?a=contractors&status=inactive');
  ok(r.data.total === 1, 'status filter');
  r = await a.req('/api/admin.php?a=create', { method: 'POST', json: { business_name: '', contact_name: 'X', email: 'bad' } });
  ok(r.status === 422 && r.data.fields.business_name && r.data.fields.email, 'create validation');
  r = await a.req('/api/admin.php?a=create', { method: 'POST', json: { business_name: 'Test Roofing', contact_name: 'Riley Test', email: 'Riley@Example.com', phone: '0400 123 456', trade: 'Roofer', licence_no: 'RF123', abn: '12 345 678 901', insurance_expiry: '2027-01-31', status: 'active', notes: 'internal note' } });
  ok(r.status === 200 && r.data.temp_password && r.data.temp_password.length >= 10, 'create contractor -> temp password');
  const cid = r.data.contractor.id; const temp = r.data.temp_password;
  r = await a.req('/api/admin.php?a=create', { method: 'POST', json: { business_name: 'Dup', contact_name: 'D', email: 'riley@example.com' } });
  ok(r.status === 422 && r.data.fields.email, 'duplicate email rejected');
  r = await a.req('/api/admin.php?a=update&id=' + cid, { method: 'POST', json: { business_name: 'Test Roofing Pty Ltd', contact_name: 'Riley Test', email: 'riley@example.com', phone: '0400 123 456', trade: 'Roofer', licence_no: 'RF123', abn: '12345678901', insurance_expiry: '2027-02-28', status: 'active', notes: 'updated' } });
  ok(r.status === 200 && r.data.contractor.business_name === 'Test Roofing Pty Ltd' && r.data.contractor.insurance_expiry === '2027-02-28', 'update contractor');
  r = await a.req('/api/admin.php?a=enquiries');
  ok(r.data.total >= 5 && r.data.items[0].message.includes('<b>hi</b>'), 'enquiries list (stored raw, rendered as text by the UI)');
  r = await a.req('/api/admin.php?a=update&id=' + cid, { method: 'POST', json: { business_name: 'X' }, csrf: false });
  ok(r.status === 403, 'admin POST without CSRF rejected');

  console.log('contractor');
  const c = new Client(); await c.session();
  r = await c.login('riley@example.com', temp);
  ok(r.status === 200 && r.data.user.must_change_password === true, 'contractor login with temp password -> must change');
  r = await c.req('/api/me.php');
  ok(r.status === 403 && r.data.code === 'must_change_password', 'profile blocked until password changed');
  r = await c.req('/api/auth.php?a=password', { method: 'POST', json: { current: temp, next: 'short' } });
  ok(r.status === 400, 'weak password rejected');
  r = await c.req('/api/auth.php?a=password', { method: 'POST', json: { current: temp, next: 'RileyNewPass42' } });
  ok(r.status === 200 && r.data.user.must_change_password === false, 'password changed');
  r = await c.req('/api/me.php');
  ok(r.status === 200 && r.data.contractor.email === 'riley@example.com' && !('notes' in r.data.contractor), 'own profile (no staff notes)');
  r = await c.req('/api/me.php', { method: 'POST', json: { business_name: 'Riley Roofing', contact_name: 'Riley T', phone: '0400 999 999', trade: 'Roofer', licence_no: 'RF999', abn: '12 345 678 901', insurance_expiry: '2027-03-31', status: 'inactive', email: 'hacker@example.com', notes: 'x' } });
  ok(r.status === 200 && r.data.contractor.business_name === 'Riley Roofing' && r.data.contractor.status === 'active' && r.data.contractor.email === 'riley@example.com', 'edit own profile; status/email/notes ignored');
  r = await c.req('/api/admin.php?a=contractors');
  ok(r.status === 403, 'contractor cannot use admin API');

  console.log('deactivate / reset');
  r = await a.req('/api/admin.php?a=set_status&id=' + cid, { method: 'POST', json: { status: 'inactive' } });
  ok(r.data.contractor.status === 'inactive' && r.data.contractor.login.active === false, 'deactivate');
  r = await c.req('/api/me.php');
  ok(r.status === 401, 'deactivated contractor session ends');
  const c2 = new Client(); await c2.session();
  r = await c2.login('riley@example.com', 'RileyNewPass42');
  ok(r.status === 401, 'deactivated contractor cannot log in');
  await a.req('/api/admin.php?a=set_status&id=' + cid, { method: 'POST', json: { status: 'active' } });
  r = await a.req('/api/admin.php?a=reset_password&id=' + cid, { method: 'POST', json: {} });
  const temp2 = r.data.temp_password;
  r = await c2.login('riley@example.com', 'RileyNewPass42');
  ok(r.status === 401, 'old password invalid after reset');
  r = await c2.login('riley@example.com', temp2);
  ok(r.status === 200 && r.data.user.must_change_password, 'login with reset temp password');

  console.log('lockout');
  const l = new Client(); await l.session();
  const codes = [];
  for (let i = 0; i < 6; i++) codes.push((await l.login('ava@example.com', 'wrong' + i)).status);
  ok(codes.slice(0, 5).every((x) => x === 401) && codes[5] === 429, 'lockout after 5 failures (' + codes.join(',') + ')');

  console.log('logout');
  r = await a.req('/api/auth.php?a=logout', { method: 'POST', json: {} });
  r = await a.session();
  ok(r.data.user === null, 'logged out');
  r = await a.req('/api/admin.php?a=contractors');
  ok(r.status === 401, 'admin API requires login');

  console.log(`\n${pass} passed, ${failN} failed`);
  process.exit(failN ? 1 : 0);
})();
