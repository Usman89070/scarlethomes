// Sanity checks on the static export in out/: no WordPress/reference URLs left, one <h1>
// per page, every <img> has alt, every local asset referenced exists.
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', 'out');
const pages = [];
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
  const p = path.join(d, e.name);
  if (e.isDirectory()) walk(p); else if (e.name === 'index.html') pages.push(p);
});
walk(OUT);
let bad = 0;
const fail = (m) => { console.error('postbuild:', m); bad++; };
for (const p of pages) {
  const rel = '/' + path.relative(OUT, path.dirname(p)).replace(/\\/g, '/');
  const html = fs.readFileSync(p, 'utf8');
  if (/hostingersite|wp-content|wp-json/.test(html)) fail(`${rel}: reference/WordPress URL left`);
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) fail(`${rel}: ${h1} <h1> elements`);
  for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\salt=/.test(m[0])) fail(`${rel}: <img> without alt: ${m[0].slice(0, 120)}`);
  for (const m of html.matchAll(/(?:src|href|srcSet|srcset)="(\/[^"]+)"/g)) {
    for (const part of m[1].split(',')) {
      const u = part.trim().split(' ')[0].split('#')[0].split('?')[0];
      if (!u || u.startsWith('//') || u.startsWith('/api/')) continue;
      const f = path.join(OUT, decodeURIComponent(u));
      if (!fs.existsSync(f) && !fs.existsSync(path.join(f, 'index.html'))) fail(`${rel}: missing ${u}`);
    }
  }
}
for (const f of ['sitemap.xml', 'robots.txt', 'favicon.ico', '404.html']) if (!fs.existsSync(path.join(OUT, f))) fail('missing ' + f);
console.log(`postbuild: checked ${pages.length} pages, ${bad} problem(s)`);
if (bad) process.exit(1);
