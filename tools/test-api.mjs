// End-to-end API tests (portal model from the old site's database).
// Needs: php -S 127.0.0.1:8080 tools/dev-router.php, a fresh DB with db/schema.sql + db/seed.sql,
// and an admin admin@example.com / Adm1nPassw0rd! (see README). usage: node tools/test-api.mjs [base]
const BASE = process.argv[2] || 'http://127.0.0.1:8080';
let pass = 0, failN = 0;
const ok = (c, m) => { if (c) { pass++; console.log('  ✓ ' + m); } else { failN++; console.log('  ✗ ' + m); } };
const PDF = Buffer.from('%PDF-1.4\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF\n');
const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');

class Client {
  constructor() { this.cookies = {}; this.csrf = ''; this.lastSetCookie = ''; }
  async req(path, { method = 'GET', json, form, multipart, headers = {}, csrf = true, raw = false } = {}) {
    const h = { ...headers };
    const c = Object.entries(this.cookies).map(([k, v]) => `${k}=${v}`).join('; ');
    if (c) h.Cookie = c;
    let body;
    if (json !== undefined) { body = JSON.stringify(json); h['Content-Type'] = 'application/json'; }
    if (form) body = new URLSearchParams(form);
    if (multipart) {
      body = new FormData();
      for (const [k, v] of Object.entries(multipart)) {
        if (v instanceof Buffer) body.append(k, new Blob([v]), k === 'image' ? 'photo.png' : 'plan.pdf');
        else body.append(k, v);
      }
    }
    if (method === 'POST' && csrf && (json !== undefined || multipart)) h['X-CSRF-Token'] = this.csrf;
    const r = await fetch(BASE + path, { method, headers: h, body, redirect: 'manual' });
    for (const sc of r.headers.getSetCookie()) {
      this.lastSetCookie = sc;
      const [kv] = sc.split(';'); const i = kv.indexOf('=');
      this.cookies[kv.slice(0, i)] = kv.slice(i + 1);
    }
    if (raw) { const buf = Buffer.from(await r.arrayBuffer()); return { status: r.status, buf, type: r.headers.get('content-type') }; }
    let data = null; try { data = await r.json(); } catch {}
    if (data && data.csrf) this.csrf = data.csrf;
    return { status: r.status, data };
  }
  session() { return this.req('/api/auth.php?a=session'); }
  login(email, password) { return this.req('/api/auth.php?a=login', { method: 'POST', json: { email, password } }); }
  async loginFresh(email, temp, next) {
    await this.session(); await this.login(email, temp);
    return this.req('/api/auth.php?a=password', { method: 'POST', json: { current: temp, next } });
  }
}

(async () => {
  console.log('enquiry (table contacts)');
  const e = new Client();
  let r = await e.req('/api/enquiry.php', { method: 'POST', form: { 'your-name': '', 'your-phone': '', 'your-email': 'nope' } });
  ok(r.data.status === 'validation_failed' && r.data.invalid_fields.map((f) => f.field).join() === 'your-name,your-phone,your-email', 'missing fields -> CF7 validation_failed');
  r = await e.req('/api/enquiry.php', { method: 'POST', form: { 'your-name': 'Bot', 'your-phone': '0400000000', 'your-email': 'b@b.co', website: 'x' } });
  ok(r.data.status === 'mail_sent', 'honeypot -> silent success');
  r = await e.req('/api/enquiry.php', { method: 'POST', form: { 'your-name': 'X', 'your-phone': '0400000000', 'your-email': 'x@y.co' }, headers: { Origin: 'https://evil.example' } });
  ok(r.status === 403, 'cross-origin post rejected');
  const st = [];
  for (let i = 0; i < 6; i++) st.push((await e.req('/api/enquiry.php', { method: 'POST', form: { 'your-name': 'Test ' + i, 'your-phone': '0400 000 00' + i, 'your-email': 't@example.com', 'your-suburb': 'Hornsby', 'your-service': 'Duplex', 'your-message': 'hello' } })).status);
  ok(st.slice(0, 5).every((s) => s === 200) && st[5] === 429, 'stored; rate limit after 5/hour (' + st.join(',') + ')');

  console.log('auth');
  const a = new Client();
  r = await a.session();
  ok(r.data.user === null && /^[0-9a-f]{64}$/.test(r.data.csrf), 'anonymous session + CSRF token');
  ok(/HttpOnly/i.test(a.lastSetCookie) && /SameSite=Strict/i.test(a.lastSetCookie), 'cookie HttpOnly + SameSite=Strict');
  r = await a.req('/api/auth.php?a=login', { method: 'POST', json: { email: 'admin@example.com', password: 'Adm1nPassw0rd!' }, csrf: false });
  ok(r.status === 403, 'login without CSRF rejected');
  r = await a.login('admin@example.com', 'wrong-pass-1');
  ok(r.status === 401 && r.data.error === 'Incorrect email or password.', 'wrong password -> generic error');
  r = await a.login('liam@example.com', '!seed-no-login!');
  ok(r.status === 401, 'seed placeholder hash never logs in');
  const sid = a.cookies.SHPORTAL;
  r = await a.login('admin@example.com', 'Adm1nPassw0rd!');
  ok(r.status === 200 && r.data.user.role === 'admin' && a.cookies.SHPORTAL !== sid, 'admin login, session id regenerated');

  console.log('users (admin)');
  r = await a.req('/api/users.php?a=list');
  ok(r.data.total === 6, 'list users (5 seed + admin) = ' + r.data.total);
  r = await a.req('/api/users.php?a=list&q=plumb');
  ok(r.data.total === 1 && r.data.items[0].trade === 'Plumber', 'search by profile trade');
  r = await a.req('/api/users.php?a=list&role=user&status=1');
  ok(r.data.total === 3, 'filter role=user + active');
  r = await a.req('/api/users.php?a=create', { method: 'POST', json: { name: '', email: 'bad' } });
  ok(r.status === 422 && r.data.fields.name && r.data.fields.email, 'create validation');
  r = await a.req('/api/users.php?a=create', { method: 'POST', json: { name: 'Riley Test', email: 'Riley@Example.com', role: 'user', status: '1', business_name: 'Test Roofing', trade: 'Roofer', phone: '0400 123 456', abn: '12 345 678 901', insurance_expiry: '2027-01-31', notes: 'staff note' } });
  ok(r.status === 200 && r.data.temp_password && r.data.user.role === 'user', 'create contractor -> temp password');
  const riley = r.data.user.id, rileyTemp = r.data.temp_password;
  r = await a.req('/api/users.php?a=create', { method: 'POST', json: { name: 'Dup', email: 'riley@example.com', role: 'user' } });
  ok(r.status === 422 && r.data.fields.email, 'duplicate email rejected');
  r = await a.req('/api/users.php?a=create', { method: 'POST', json: { name: 'Sam Super', email: 'sam@example.com', role: 'supervisor', status: '1' } });
  const samTemp = r.data.temp_password;
  ok(r.data.user.role === 'supervisor', 'create supervisor');
  r = await a.req('/api/users.php?a=list');
  const adminId = r.data.items.find((x) => x.email === 'admin@example.com').id;
  r = await a.req('/api/users.php?a=update&id=' + adminId, { method: 'POST', json: { name: 'Test Admin', email: 'admin@example.com', role: 'user', status: '1' } });
  ok(r.status === 422, 'admin cannot demote themself');
  r = await a.req('/api/users.php?a=update&id=' + riley, { method: 'POST', json: { name: 'Riley T', email: 'riley@example.com', role: 'user', status: '1', business_name: 'Riley Roofing', trade: 'Roofer', insurance_expiry: '2027-02-28', notes: 'updated' } });
  ok(r.status === 200 && r.data.profile.business_name === 'Riley Roofing' && r.data.profile.notes === 'updated', 'update user + profile');
  r = await a.req('/api/users.php?a=update&id=' + riley, { method: 'POST', json: { name: 'X' }, csrf: false });
  ok(r.status === 403, 'POST without CSRF rejected');

  console.log('projects (staff)');
  r = await a.req('/api/projects.php?a=create', { method: 'POST', json: { title: 'Test Duplex', description: 'Line 1\nLine 2', status: '1' } });
  ok(r.status === 200 && r.data.project.title === 'Test Duplex', 'create project');
  const pid = r.data.project.id;
  r = await a.req('/api/projects.php?a=update&id=' + pid, { method: 'POST', json: { title: 'Test Duplex - Hornsby', description: 'Line 1\nLine 2', status: '1' } });
  r = await a.req('/api/projects.php?a=get&id=' + pid);
  ok(r.data.logs.length === 2 && r.data.logs[0].action === 'Updated' && r.data.logs[0].old_title === 'Test Duplex', 'project_logs: Created + Updated');
  r = await a.req('/api/projects.php?a=assignable');
  ok(r.data.items.some((x) => x.id === riley) && !r.data.items.some((x) => x.email === 'mia@example.com') && !r.data.items.some((x) => x.email === 'sam@example.com'), 'assignable = active contractors only');
  r = await a.req('/api/projects.php?a=assign&id=' + pid, { method: 'POST', json: { user_id: riley } });
  ok(r.status === 200 && r.data.assignments.length === 1, 'assign contractor');
  r = await a.req('/api/projects.php?a=assign&id=' + pid, { method: 'POST', json: { user_id: riley } });
  ok(r.status === 422, 'duplicate assignment rejected');
  r = await a.req('/api/files.php?a=upload', { method: 'POST', multipart: { project_id: String(pid), title: 'Site plan', file: PDF } });
  ok(r.status === 200 && r.data.id, 'upload PDF');
  const fileId = r.data.id;
  r = await a.req('/api/files.php?a=upload', { method: 'POST', multipart: { project_id: String(pid), title: 'Bad', file: Buffer.from('MZ\x90\x00 not allowed') } });
  ok(r.status === 422, 'disallowed file type rejected');
  r = await a.req('/api/files.php?a=attachment&id=' + fileId, { raw: true });
  ok(r.status === 200 && r.type === 'application/pdf' && r.buf.equals(PDF), 'staff downloads file');
  r = await fetch(BASE + '/api/storage/uploads/');
  ok(r.status === 404 || r.status === 403, 'uploads folder not served directly (' + r.status + ')');

  console.log('contractor');
  const c = new Client();
  r = await c.loginFresh('riley@example.com', rileyTemp, 'RileyNewPass42');
  ok(r.status === 200 && !r.data.user.must_change_password, 'first login: temp password -> own password');
  r = await c.req('/api/projects.php?a=list');
  ok(r.data.total === 1 && r.data.items[0].id === pid && r.data.items[0].my_status === 'default', 'sees only assigned project');
  r = await c.req('/api/projects.php?a=get&id=1');
  ok(r.status === 404, 'unassigned project hidden');
  r = await c.req('/api/projects.php?a=get&id=' + pid);
  ok(r.data.attachments.length === 1 && r.data.logs === null && r.data.assignments.length === 1, 'project detail: files, own assignment, no logs');
  const pv = r.data.assignments[0].id;
  r = await c.req('/api/files.php?a=attachment&id=' + fileId, { raw: true });
  ok(r.status === 200, 'contractor downloads plan');
  r = await c.req('/api/projects.php?a=assignment_status&id=' + pv, { method: 'POST', multipart: { status: 'booked' } });
  ok(r.data.assignment.status === 'booked' && /^\d{4}-\d\d-\d\d$/.test(r.data.assignment.booked_on), 'mark booked (date set)');
  r = await c.req('/api/projects.php?a=create', { method: 'POST', json: { title: 'x' } });
  ok(r.status === 403, 'contractor cannot create projects');
  r = await c.req('/api/users.php?a=list');
  ok(r.status === 403, 'contractor cannot use users API');
  r = await c.req('/api/attendance.php?a=checkin', { method: 'POST', json: { project_id: 1 } });
  ok(r.status === 422, 'cannot check in to unassigned project');
  r = await c.req('/api/attendance.php?a=checkin', { method: 'POST', json: { project_id: pid } });
  ok(r.status === 200 && r.data.open.project_id === pid, 'check in');
  r = await c.req('/api/attendance.php?a=checkin', { method: 'POST', json: { project_id: pid } });
  ok(r.status === 422, 'double check-in rejected');
  r = await c.req('/api/attendance.php?a=checkout', { method: 'POST', multipart: { note: 'Frames done', image: PDF } });
  ok(r.status === 422, 'check-out photo must be an image');
  r = await c.req('/api/attendance.php?a=checkout', { method: 'POST', multipart: { note: 'Frames done', image: PNG } });
  ok(r.status === 200 && r.data.open === null, 'check out with photo + note');
  r = await c.req('/api/attendance.php?a=list');
  ok(r.data.total === 1 && r.data.items[0].has_image === 1 && r.data.items[0].checkout_note === 'Frames done', 'own attendance list');
  const attId = r.data.items[0].id;
  r = await c.req('/api/projects.php?a=assignment_status&id=' + pv, { method: 'POST', multipart: { status: 'completed', file: PDF } });
  ok(r.data.assignment.status === 'completed' && r.data.assignment.completion_attachment_id, 'mark completed with completion file');
  r = await c.req('/api/me.php', { method: 'POST', json: { name: 'Riley Roofer', business_name: 'Riley Roofing', phone: 'abc' } });
  ok(r.status === 422 && r.data.fields.phone, 'profile validation');
  r = await c.req('/api/me.php', { method: 'POST', json: { name: 'Riley Roofer', business_name: 'Riley Roofing Pty', phone: '0400 999 999', trade: 'Roofer', notes: 'hack' } });
  ok(r.status === 200 && r.data.profile.business_name === 'Riley Roofing Pty' && !('notes' in r.data.profile), 'edit own details (no staff notes)');

  console.log('supervisor');
  const s = new Client();
  r = await s.loginFresh('sam@example.com', samTemp, 'SamSuperPass77');
  ok(r.status === 200 && r.data.user.role === 'supervisor', 'supervisor login');
  r = await s.req('/api/attendance.php?a=list&project_id=' + pid);
  ok(r.data.total === 1 && r.data.items[0].name === 'Riley Roofer', 'supervisor sees attendance');
  r = await s.req('/api/files.php?a=checkout&id=' + attId, { raw: true });
  ok(r.status === 200 && r.type === 'image/png', 'supervisor views check-out photo');
  r = await s.req('/api/projects.php?a=get&id=' + pid);
  ok(r.data.assignments[0].status === 'completed' && r.data.attachments.length === 2, 'supervisor sees assignment + completion file');
  r = await s.req('/api/users.php?a=list');
  ok(r.status === 403, 'supervisor cannot manage users');
  r = await s.req('/api/enquiries.php');
  ok(r.status === 403, 'supervisor cannot read enquiries');
  r = await s.req('/api/projects.php?a=delete&id=' + pid, { method: 'POST', json: {} });
  ok(r.status === 403, 'supervisor cannot delete projects');

  console.log('admin: archive, delete, enquiries, reset');
  r = await a.req('/api/projects.php?a=delete&id=' + pid, { method: 'POST', json: {} });
  ok(r.status === 422, 'delete blocked while project has files');
  r = await a.req('/api/projects.php?a=update&id=' + pid, { method: 'POST', json: { title: 'Test Duplex - Hornsby', description: 'Line 1\nLine 2', status: '0' } });
  r = await c.req('/api/attendance.php?a=checkin', { method: 'POST', json: { project_id: pid } });
  ok(r.status === 422, 'archived project: no check-in');
  r = await a.req('/api/projects.php?a=create', { method: 'POST', json: { title: 'Temp project', description: '' } });
  const tmp = r.data.project.id;
  r = await a.req('/api/projects.php?a=delete&id=' + tmp, { method: 'POST', json: {} });
  ok(r.status === 200, 'delete empty project');
  r = await a.req('/api/files.php?a=delete&id=' + fileId, { method: 'POST', json: {} });
  ok(r.status === 200, 'delete file');
  r = await a.req('/api/enquiries.php');
  ok(r.data.total >= 6 && r.data.items[0].topic === 'Duplex' && r.data.items[0].suburb === 'Hornsby', 'enquiries list (contacts)');
  r = await a.req('/api/users.php?a=reset_password&id=' + riley, { method: 'POST', json: {} });
  const t2 = r.data.temp_password;
  const c2 = new Client(); await c2.session();
  r = await c2.login('riley@example.com', 'RileyNewPass42');
  ok(r.status === 401, 'old password invalid after reset');
  r = await c2.login('riley@example.com', t2);
  ok(r.status === 200 && r.data.user.must_change_password, 'reset temp password works, must change');
  r = await c2.req('/api/projects.php?a=list');
  ok(r.status === 403 && r.data.code === 'must_change_password', 'blocked until password changed');
  r = await a.req('/api/users.php?a=update&id=' + riley, { method: 'POST', json: { name: 'Riley T', email: 'riley@example.com', role: 'user', status: '0' } });
  r = await c.req('/api/projects.php?a=list');
  ok(r.status === 401, 'deactivated user session ends');

  console.log('lockout + logout');
  const l = new Client(); await l.session();
  const codes = [];
  for (let i = 0; i < 6; i++) codes.push((await l.login('ava@example.com', 'wrong' + i)).status);
  ok(codes.slice(0, 5).every((x) => x === 401) && codes[5] === 429, 'lockout after 5 failures (' + codes.join(',') + ')');
  await a.req('/api/auth.php?a=logout', { method: 'POST', json: {} });
  r = await a.req('/api/users.php?a=list');
  ok(r.status === 401, 'logged out');

  console.log(`\n${pass} passed, ${failN} failed`);
  process.exit(failN ? 1 : 0);
})();
