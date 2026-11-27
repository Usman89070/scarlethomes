// 1. Static pages ship without the Next.js/React client runtime: nothing on them is React-
//    driven (all behaviour is the reference's vanilla JS), so the framework chunks, RSC payload
//    and preloads are removed and the reference scripts load as one deferred, content-hashed
//    /js/site.<hash>.js - the same timing as the reference's inline scripts. /portal/ keeps React.
// 2. Sanity checks on out/: no WordPress/reference URLs left, one <h1> per page, every <img>
//    has alt, every local asset referenced exists.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const KEEP_RUNTIME = ['portal'];
const HERO_KICK = "(function(){var h=document.querySelector('.sh-hero,.sh-ph');if(!h)return;requestAnimationFrame(function(){requestAnimationFrame(function(){var v=innerHeight;h.querySelectorAll('.rv,.rvs,.rvl,.rvr').forEach(function(e){var r=e.getBoundingClientRect();if(r.top<v&&r.bottom>0)e.classList.add('in')})})})})();";

const OUT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', 'out');
const pages = [];
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
  const p = path.join(d, e.name);
  if (e.isDirectory()) walk(p); else if (e.name === 'index.html') pages.push(p);
});
walk(OUT);

const jsSrc = path.join(OUT, 'js', 'site.js');
const js = fs.readFileSync(jsSrc);
const jsName = `site.${crypto.createHash('sha256').update(js).digest('hex').slice(0, 10)}.js`;
for (const f of fs.readdirSync(path.join(OUT, 'js'))) if (/^site\.[0-9a-f]{10}\.js$/.test(f)) fs.unlinkSync(path.join(OUT, 'js', f));
fs.renameSync(jsSrc, path.join(OUT, 'js', jsName));
let stripped = 0;
for (const p of pages) {
  const rel = path.relative(OUT, path.dirname(p)).replace(/\\/g, '/');
  if (KEEP_RUNTIME.includes(rel)) continue;
  let html = fs.readFileSync(p, 'utf8');
  const before = html.length;
  html = html
    .replace(/<script src="\/_next\/static\/chunks\/[^"]+"[^>]*><\/script>/g, '')
    .replace(/<link rel="preload" as="script"[^>]*\/?>/g, '')
    .replace(/<script(?: id="_R_")?>(?:\(globalThis\["TURBOPACK"\]|\(?self\.__next_f)[\s\S]*?<\/script>/g, '');
  if (/_next\/static\/chunks\/[^"]+\.js|__next_f|TURBOPACK/.test(html)) throw new Error('runtime left in ' + rel);
  // in <head> so it is fetched early (high priority); defer = runs after parsing, like the reference's end-of-body scripts
  // start the hero's reveal-on-load as soon as the hero is parsed (same fade, same end state;
  // initMain's IntersectionObserver would add the same class a moment later)
  html = html.replace('</body>', `<script>${HERO_KICK}</script></body>`);
  html = html.replace('</head>', `<script src="/js/${jsName}" defer="" fetchpriority="high"></script></head>`);
  fs.writeFileSync(p, html);
  stripped++;
  if (process.env.VERBOSE) console.log(`  ${rel || '/'}: ${Math.round(before / 1024)} -> ${Math.round(html.length / 1024)} KB`);
}
console.log(`postbuild: ${stripped} static pages use /js/${jsName} (no client runtime)`);

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
