// Visual/structural comparison of the build against the reference.
// usage: node tools/compare.js <localBase> [pages,comma] [widths,comma] [--shots]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const REF = 'https://gleaming-gold-raccoon-58.hostingersite.com';
const LOCAL = process.argv[2] || 'http://127.0.0.1:4100';
const ALL = ['', 'duplex-builders-sydney/', 'knockdown-rebuild-sydney/', 'new-home-builders-sydney/', 'granny-flat-builders-sydney/', 'projects/', 'about/', 'contact/', 'service-areas/', 'home-builders-hornsby/', 'home-builders-hills-district/', 'home-builders-parramatta/', 'home-builders-leppington/'];
const pages = process.argv[3] && process.argv[3] !== 'all' ? process.argv[3].split(',').map((p) => (p === 'home' ? '' : p.replace(/\/?$/, '/'))) : ALL;
const widths = process.argv[4] ? process.argv[4].split(',').map(Number) : [360, 768, 1366];
const shots = process.argv.includes('--shots');
const OUT = path.join(__dirname, '..', 'screens');
fs.mkdirSync(OUT, { recursive: true });
const PROPS = ['color', 'background-color', 'background-image', 'font-family', 'font-size', 'font-weight', 'font-style', 'line-height', 'letter-spacing', 'text-transform', 'text-decoration-line', 'opacity', 'border-top-width', 'border-top-color', 'border-radius', 'box-shadow', 'display', 'object-fit', 'object-position', 'padding-top', 'padding-left', 'margin-top', 'z-index', 'filter', 'white-space', 'visibility', 'clip-path', 'transform'];

async function snapshot(browser, url, width) {
  const ctx = await browser.newContext({ viewport: { width, height: width < 800 ? 780 : 900 }, deviceScaleFactor: 1, reducedMotion: 'no-preference' });
  await ctx.addInitScript(() => { window.setInterval = () => 0; });
  const p = await ctx.newPage();
  const errors = [];
  p.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  p.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  p.on('requestfailed', (r) => { if (!/google|youtube|ytimg|gstatic|hostinger\.com|wp-json|reach/.test(r.url())) errors.push('requestfailed: ' + r.url()); });
  p.on('response', (r) => { if (r.status() >= 400 && !/google|youtube|ytimg|reach|favicon/.test(r.url())) errors.push('HTTP ' + r.status() + ' ' + r.url()); });
  await p.goto(url, { waitUntil: 'load', timeout: 90000 });
  await p.waitForTimeout(800);
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 500) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(60); }
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(400);
  await p.evaluate(() => { document.querySelectorAll('.rv,.rvs,.rvl,.rvr,.rvi').forEach((e) => e.classList.add('in')); });
  await p.addStyleTag({ content: '*,*:before,*:after{transition:none!important;animation:none!important;caret-color:transparent!important}' });
  await p.evaluate(() => document.fonts.ready);
  await p.evaluate(() => Promise.all([...document.images].map((i) => { i.loading = 'eager'; return i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 8000); }); })));
  await p.waitForTimeout(600);
  const data = await p.evaluate((PROPS) => {
    const out = [];
    const roots = [document.getElementById('sh-top'), document.querySelector('.sh-pt')].filter(Boolean);
    const kidsOf = (el) => {
      const r = [];
      for (const c of el.children) {
        if (c.tagName === 'SCRIPT' || c.tagName === 'SOURCE' || c.tagName === 'STYLE' || c.tagName === 'LINK') continue;
        if (c.tagName === 'PICTURE') { r.push(...kidsOf(c)); continue; }
        r.push(c);
      }
      return r;
    };
    const walk = (el, key) => {
      const cs = getComputedStyle(el); const b = el.getBoundingClientRect();
      const st = {};
      for (const k of PROPS) {
        let v = cs.getPropertyValue(k);
        if (k === 'font-family') v = v.replace(/__([A-Za-z_]+?)_[0-9a-f]{6,}/g, (m, n) => n.replace(/_/g, ' ')).replace(/"/g, '').replace(/, [^,]*Fallback[^,]*/g, '');
        if (k === 'background-image') v = v.replace(/url\("?[^)]*\/([^/")]+?)(-\d+)?\.(jpe?g|png|webp)"?\)/g, 'url($1)');
        st[k] = v;
      }
      out.push({ key, tag: el.tagName, cls: el.getAttribute('class') || '', x: Math.round(b.x), y: Math.round(b.y + scrollY), w: Math.round(b.width), h: Math.round(b.height), st, txt: el.children.length ? '' : (el.textContent || '').trim().slice(0, 40) });
      kidsOf(el).forEach((c, i) => walk(c, key + '/' + c.tagName.toLowerCase() + i));
    };
    roots.forEach((r, i) => walk(r, 'R' + i));
    return { H: document.documentElement.scrollHeight, out };
  }, PROPS);
  let shot = null;
  if (shots) { shot = await p.screenshot({ fullPage: true }); }
  await ctx.close();
  return { ...data, errors, shot };
}

(async () => {
  const browser = await chromium.launch();
  const report = [];
  for (const pg of pages) {
    for (const w of widths) {
      const [a, b] = await Promise.all([snapshot(browser, REF + '/' + pg, w), snapshot(browser, LOCAL + '/' + pg, w)]);
      const name = (pg || 'home').replace(/\/$/, '') + '-' + w;
      if (shots) { fs.writeFileSync(path.join(OUT, name + '-ref.png'), a.shot); fs.writeFileSync(path.join(OUT, name + '-new.png'), b.shot); }
      const bm = new Map(b.out.map((e) => [e.key, e]));
      const diffs = [];
      for (const e of a.out) {
        const f = bm.get(e.key);
        if (!f) { diffs.push(`MISSING ${e.key} ${e.tag}.${e.cls}`); continue; }
        if (f.tag !== e.tag) { diffs.push(`TAG ${e.key} ${e.tag} vs ${f.tag}`); continue; }
        const d = [];
        for (const k of ['x', 'y', 'w', 'h']) if (Math.abs(e[k] - f[k]) > 1) d.push(`${k} ${e[k]}→${f[k]}`);
        for (const k of Object.keys(e.st)) if (e.st[k] !== f.st[k]) d.push(`${k}: ${e.st[k].slice(0, 70)} → ${f.st[k].slice(0, 70)}`);
        if (e.txt !== f.txt) d.push(`text "${e.txt}" → "${f.txt}"`);
        if (d.length) diffs.push(`${e.key} <${e.tag.toLowerCase()} class="${e.cls}"> ${d.join(' | ')}`);
      }
      const am = new Set(a.out.map((e) => e.key));
      for (const e of b.out) if (!am.has(e.key)) diffs.push(`EXTRA ${e.key} ${e.tag}.${e.cls}`);
      report.push({ page: '/' + pg, width: w, refH: a.H, newH: b.H, n: diffs.length, diffs, refErrors: a.errors, newErrors: b.errors });
      console.log(`${('/' + pg).padEnd(32)} ${String(w).padStart(4)}  height ${a.H} vs ${b.H}  diffs ${diffs.length}  errors(new) ${b.errors.length}`);
    }
  }
  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 1));
  await browser.close();
})();
