// Browser behaviour tests on the built site served by tools/dev-router.php.
// usage: node tools/test-ui.js [base] [adminEmail] [adminPassword]
const { chromium } = require('playwright');
const BASE = process.argv[2] || 'http://127.0.0.1:8080';
const ADMIN = [process.argv[3] || 'admin@example.com', process.argv[4] || 'Adm1nPassw0rd!'];
const PAGES = ['/', '/duplex-builders-sydney/', '/knockdown-rebuild-sydney/', '/new-home-builders-sydney/', '/granny-flat-builders-sydney/', '/projects/', '/about/', '/contact/', '/service-areas/', '/home-builders-hornsby/', '/home-builders-hills-district/', '/home-builders-parramatta/', '/home-builders-leppington/', '/portal/'];
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) { pass++; console.log('  ✓ ' + m); } else { fail++; console.log('  ✗ ' + m); } };
const vis = (p, sel) => p.evaluate((s) => { const e = document.querySelector(s); if (!e) return false; const c = getComputedStyle(e); const r = e.getBoundingClientRect(); return c.visibility !== 'hidden' && c.display !== 'none' && +c.opacity > 0.5 && r.height > 0; }, sel);

(async () => {
  const b = await chromium.launch();
  const newPage = async (w, h = 900) => {
    const ctx = await b.newContext({ viewport: { width: w, height: h } });
    const p = await ctx.newPage();
    p.errors = [];
    p.on('pageerror', (e) => p.errors.push(e.message));
    p.on('console', (m) => { if (m.type() === 'error' && !/ERR_TUNNEL|ytimg|youtube|google/.test(m.text())) p.errors.push(m.text()); });
    return p;
  };

  console.log('all pages: errors, H1, title, links');
  const links = new Set();
  for (const path of PAGES) {
    const p = await newPage(1366);
    await p.goto(BASE + path, { waitUntil: 'load' });
    await p.waitForTimeout(700);
    const info = await p.evaluate(() => ({ h1: document.querySelectorAll('h1').length, title: document.title, canon: document.querySelector('link[rel=canonical]')?.href, imgsNoAlt: [...document.images].filter((i) => !i.hasAttribute('alt')).length, broken: [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && i.getAttribute('src') && !/ytimg/.test(i.src)).map((i) => i.src), links: [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href')), portal: !!document.querySelector('.sh-pt #sh-hb') }));
    info.links.forEach((l) => links.add(l.split('#')[0]));
    ok(p.errors.length === 0, `${path} no console errors ${p.errors.slice(0, 2).join(' | ')}`);
    ok(info.h1 === 1 && info.imgsNoAlt === 0 && info.broken.length === 0, `${path} one H1, all imgs have alt and load ${info.broken.slice(0, 2)}`);
    ok(info.portal, `${path} header moved to body-level portal`);
    await p.context().close();
  }
  for (const l of links) {
    const r = await fetch(BASE + l, { redirect: 'manual' }); await r.arrayBuffer();
    ok(r.status === 200, `link ${l} -> ${r.status}`);
  }

  console.log('desktop header');
  let p = await newPage(1366);
  await p.goto(BASE + '/duplex-builders-sydney/', { waitUntil: 'load' }); await p.waitForTimeout(500);
  ok(await p.evaluate(() => document.querySelector('.sh-nav > li.sh-dd.on .sh-ddm a.on[aria-current=page]')?.getAttribute('href') === '/duplex-builders-sydney/'), 'active service highlighted');
  ok(!(await vis(p, '.sh-nav > li.sh-dd .sh-ddm')), 'Services menu closed initially');
  await p.hover('.sh-nav > li.sh-dd >> nth=0'); await p.waitForTimeout(500);
  ok(await vis(p, '.sh-nav > li.sh-dd:nth-child(2) .sh-ddm'), 'Services dropdown opens on hover');
  await p.mouse.move(5, 600); await p.waitForTimeout(600);
  await p.focus('.sh-nav > li.sh-dd:nth-child(3) > .sh-ddt'); await p.waitForTimeout(700);
  ok(await vis(p, '.sh-nav > li.sh-dd:nth-child(3) .sh-ddm'), 'Service Areas dropdown opens when its link gets keyboard focus');
  await p.keyboard.press('Tab'); await p.waitForTimeout(700);
  ok(await vis(p, '.sh-nav > li.sh-dd:nth-child(3) .sh-ddm'), 'dropdown stays open while tabbing through its items');
  const hts = await p.evaluate(() => [...document.querySelectorAll('.sh-nav > li > a, .sh-nav > li > button')].map((e) => [Math.round(e.getBoundingClientRect().top), Math.round(e.getBoundingClientRect().height)]));
  ok(new Set(hts.map((x) => x.join())).size === 1, 'top-level nav items aligned ' + JSON.stringify(hts[0]));
  await p.evaluate(() => scrollTo(0, 800)); await p.waitForTimeout(500);
  ok(await p.evaluate(() => document.getElementById('sh-hb').classList.contains('s')), 'header shrinks on scroll');
  await p.evaluate(() => scrollTo(0, 80)); await p.waitForTimeout(400);
  ok(await p.evaluate(() => document.getElementById('sh-hb').classList.contains('s')), 'hysteresis: still shrunk at 80px');
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(400);
  ok(await p.evaluate(() => !document.getElementById('sh-hb').classList.contains('s')), 'header restored at top');
  await p.context().close();

  console.log('mobile menu');
  p = await newPage(360, 780);
  await p.goto(BASE + '/', { waitUntil: 'load' }); await p.waitForTimeout(500);
  ok(await vis(p, '#sh-burger'), 'burger visible <1100px');
  await p.click('#sh-burger'); await p.waitForTimeout(500);
  ok(await p.evaluate(() => document.getElementById('sh-mnav').classList.contains('o') && document.getElementById('sh-burger').getAttribute('aria-expanded') === 'true'), 'mobile menu opens');
  await p.click('#sh-burger'); await p.waitForTimeout(400);
  ok(await p.evaluate(() => !document.getElementById('sh-mnav').classList.contains('o')), 'mobile menu closes');
  await p.evaluate(() => scrollTo(0, 1200)); await p.waitForTimeout(400);
  ok(await p.evaluate(() => document.querySelector('.sh-mbar').classList.contains('on')), 'mobile action bar appears on scroll');

  console.log('home: slider, tabs, arrows, estimator, FAQ');
  await p.evaluate(() => scrollTo(0, 0));
  const n0 = await p.textContent('#sh-hname').catch(() => null);
  const dots = await p.$$('.sh-dots button');
  if (dots.length > 1) { await dots[1].click(); await p.waitForTimeout(300); }
  ok(dots.length > 1 && (await p.textContent('#sh-hname')) !== n0 && await p.evaluate(() => document.querySelectorAll('.sh-hero .sh-sl')[1].classList.contains('on')), 'hero slider dot changes slide + label');
  const tabs = await p.$$('.sh-tab');
  if (tabs.length > 1) { await tabs[1].scrollIntoViewIfNeeded(); await tabs[1].click(); await p.waitForTimeout(600); }
  ok(tabs.length > 1 && await p.evaluate(() => { const t = document.querySelectorAll('.sh-tab')[1]; return t.classList.contains('on') && document.querySelector('.sh-fp.on').getAttribute('data-p') === t.getAttribute('data-t'); }), 'facade tab switches pane');
  ok(await p.evaluate(() => !!document.querySelector('.sh-scr .sh-arw.r')), 'scroll arrows added to tab row');
  if (await p.$('#sh-calc')) {
    await p.click('#sh-calc'); await p.waitForTimeout(200);
    ok(/^\$[\d,]+ – \$[\d,]+$/.test((await p.textContent('#sh-res-v')).trim()), 'price estimator result: ' + (await p.textContent('#sh-res-v')).trim());
  }
  const det = await p.$('details:not([open]) summary');
  if (det) { await det.scrollIntoViewIfNeeded(); await det.click(); await p.waitForTimeout(200); }
  ok(!!det && await det.evaluate((s) => s.parentElement.open), 'FAQ accordion opens');
  await p.context().close();

  console.log('projects: filters + lightbox');
  p = await newPage(1366);
  await p.goto(BASE + '/projects/', { waitUntil: 'load' }); await p.waitForTimeout(500);
  await p.click('.sh-flt button[data-f="french-facade"]'); await p.waitForTimeout(400);
  const shown = await p.evaluate(() => [...document.querySelectorAll('#gallery .sh-gi')].filter((g) => !g.classList.contains('hide')).length);
  const cnt = await p.evaluate(() => +document.querySelector('.sh-flt button[data-f="french-facade"] b').textContent);
  ok(shown === cnt, `filter shows ${shown} = count ${cnt}`);
  await p.click('#gallery .sh-gi:not(.hide) >> nth=0'); await p.waitForTimeout(400);
  ok(await p.evaluate(() => document.querySelector('.sh-lb').classList.contains('o')), 'lightbox opens');
  const s1 = await p.evaluate(() => document.querySelector('.sh-lb img').src);
  await p.keyboard.press('ArrowRight'); await p.waitForTimeout(200);
  ok(s1 !== await p.evaluate(() => document.querySelector('.sh-lb img').src), 'lightbox next (keyboard)');
  ok(/French Facade/.test(await p.textContent('.sh-lb .t')), 'lightbox caption');
  await p.keyboard.press('Escape'); await p.waitForTimeout(200);
  ok(await p.evaluate(() => !document.querySelector('.sh-lb').classList.contains('o')), 'lightbox closes on Escape');
  await p.context().close();
  p = await newPage(360, 780);
  await p.goto(BASE + '/projects/', { waitUntil: 'load' }); await p.waitForTimeout(900);
  ok(await p.evaluate(() => document.querySelector('.sh-scr').classList.contains('can-r')), 'mobile filter row shows right arrow');
  await p.click('.sh-scr .sh-arw.r', { force: true }); await p.waitForTimeout(800);
  ok(await p.evaluate(() => document.querySelector('.sh-flt').scrollLeft > 0 && document.querySelector('.sh-scr').classList.contains('can-l')), 'arrow scrolls row, left arrow appears');
  await p.context().close();

  console.log('contact form');
  p = await newPage(1366);
  await p.goto(BASE + '/contact/', { waitUntil: 'load' }); await p.waitForTimeout(500);
  ok(/t=k/.test(await p.getAttribute('.sh-map iframe, iframe', 'src')), 'map embed satellite view');
  await p.click('#sh-cform button[type=submit]'); await p.waitForSelector('#sh-cform .sh-msg.bad');
  ok((await p.textContent('#sh-cform .sh-msg')) === 'Please check: name, phone, email. One or more fields have an error. Please check and try again.', 'invalid submit -> inline error: ' + await p.textContent('#sh-cform .sh-msg'));
  await p.fill('#cf-n', 'UI Test'); await p.fill('#cf-p', '0400 111 222'); await p.fill('#cf-e', 'ui@example.com'); await p.fill('#cf-s', 'Hornsby'); await p.selectOption('#cf-t', 'Granny Flat'); await p.fill('#cf-m', 'Testing the form');
  await p.click('#sh-cform button[type=submit]'); await p.waitForSelector('#sh-cform .sh-msg.ok');
  ok((await p.textContent('#sh-cform .sh-msg')) === 'Thanks! Your enquiry has been sent. Our directors will be in touch shortly.' && (await p.inputValue('#cf-n')) === '', 'valid submit -> success + form reset');
  await p.context().close();

  console.log('portal (admin)');
  const fs = require('fs'), os = require('os'), path = require('path');
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'po-'));
  const pdf = path.join(tmp, 'plan.pdf'); fs.writeFileSync(pdf, '%PDF-1.4\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF\n');
  const png = path.join(tmp, 'photo.png'); fs.writeFileSync(png, Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64'));
  p = await newPage(1366);
  p.on('dialog', (d) => d.accept());
  await p.goto(BASE + '/portal/', { waitUntil: 'load' }); await p.waitForSelector('#po-email');
  await p.fill('#po-email', ADMIN[0]); await p.fill('#po-pass', 'wrong-pass-123'); await p.click('form.sh-cf button[type=submit]');
  await p.waitForSelector('.sh-msg.bad');
  ok((await p.textContent('.sh-msg.bad')) === 'Incorrect email or password.', 'wrong password message');
  await p.fill('#po-pass', ADMIN[1]); await p.click('form.sh-cf button[type=submit]');
  await p.waitForSelector('.sh-po-table');
  ok(await p.isVisible('text=New Project'), 'admin lands on Projects');
  // add a contractor
  await p.click('.sh-po-tabs >> text=Users'); await p.click('text=Add User');
  await p.fill('#uf-n', 'UI Contractor'); await p.fill('#uf-e', 'ui-contractor@example.com'); await p.fill('#uf-b', 'UI Building Co'); await p.fill('#uf-t', 'Carpenter');
  await p.click('form button[type=submit]'); await p.waitForSelector('.sh-po-temp code');
  const temp = (await p.textContent('.sh-po-temp code')).trim();
  ok(temp.length >= 10, 'user created, temp password shown once');
  // create a project, upload a plan, assign the contractor
  await p.click('.sh-po-tabs >> text=Projects'); await p.click('text=New Project');
  await p.fill('#pe-t', 'UI Test Project'); await p.fill('#pe-d', 'Access via rear lane.\nPark on street.');
  await p.click('form button[type=submit]'); await p.waitForSelector('text=Plans & files');
  ok(await p.isVisible('text=Access via rear lane.'), 'project created');
  await p.fill('[id^=fu-t-]', 'Ground floor plan'); await p.setInputFiles('[id^=fu-f-]', pdf);
  await p.click('form.sh-po-upload button[type=submit]'); await p.waitForSelector('.sh-po-files a');
  ok((await p.textContent('.sh-po-files a')) === 'Ground floor plan', 'plan uploaded');
  const opt = await p.$eval('[id^=as-p-]', (s) => [...s.options].find((o) => o.textContent.startsWith('UI Contractor'))?.value);
  await p.selectOption('[id^=as-p-]', opt); await p.click('.sh-po-assign button');
  await p.waitForSelector('td >> text=UI Contractor');
  ok(true, 'contractor assigned');
  ok(await p.isVisible('.sh-po-log >> text=Created'), 'activity log shows Created');
  await p.click('.sh-po-tabs >> text=Enquiries'); await p.waitForTimeout(700);
  ok(await p.evaluate(() => [...document.querySelectorAll('.sh-po-table td b')].some((b) => b.textContent === 'UI Test')), 'enquiry from the contact form is listed');
  const perr = p.errors.filter((e) => !/status of 401/.test(e));
  ok(perr.length === 0, 'admin portal: no console errors ' + perr.join(' | '));
  await p.click('text=Sign out'); await p.waitForSelector('#po-email');
  await p.context().close();

  console.log('portal (contractor, mobile)');
  p = await newPage(360, 780);
  await p.goto(BASE + '/portal/', { waitUntil: 'load' }); await p.waitForSelector('#po-email');
  await p.fill('#po-email', 'ui-contractor@example.com'); await p.fill('#po-pass', temp); await p.click('form.sh-cf button[type=submit]');
  await p.waitForSelector('#pw-cur');
  await p.fill('#pw-cur', temp); await p.fill('#pw-new', 'UiContractor99'); await p.fill('#pw-new2', 'UiContractor99'); await p.click('form button[type=submit]');
  await p.waitForSelector('text=My Jobs');
  ok(true, 'first sign-in forces a new password');
  await p.click('td >> text=Open'); await p.waitForSelector('text=Mark as Booked');
  ok(await p.isVisible('.sh-po-files a'), 'contractor sees the plan');
  await p.click('text=Mark as Booked'); await p.waitForSelector('text=Start Work');
  ok(true, 'status: booked');
  await p.click('text=Check In Here'); await p.waitForSelector('text=Check Out');
  await p.fill('#co-n', 'Frames up'); await p.setInputFiles('#co-p', png); await p.click('text=Check Out');
  await p.waitForSelector('.sh-msg.ok >> text=Checked out');
  ok(true, 'check in / check out with photo');
  await p.click('.sh-po-tabs >> text=Attendance'); await p.waitForSelector('text=View photo');
  ok(await p.isVisible('td >> text=Frames up'), 'attendance record listed');
  ok(p.errors.length === 0, 'contractor portal: no console errors ' + p.errors.join(' | '));
  await p.context().close();

  await b.close();
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})();
