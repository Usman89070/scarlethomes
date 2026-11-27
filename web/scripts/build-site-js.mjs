// Bundles the reference scripts (lib/legacy/site.js + pages.js) into public/js/site.js:
// a plain deferred script for the static pages, which ship without the React runtime
// (see scripts/postbuild.mjs). Same functions, same order as components/SiteScripts.tsx.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const strip = (f) => fs.readFileSync(path.join(ROOT, 'lib/legacy', f), 'utf8')
  .replace(/^\/\/ @ts-nocheck\n/m, '').replace(/^\/\* eslint-disable \*\/\n/m, '').replace(/^export (function|const) /gm, '$1 ');
const out = `/* Scarlet Homes site scripts - generated from web/lib/legacy/*.js by scripts/build-site-js.mjs */
(function () {
${strip('site.js')}
${strip('pages.js')}
  if (window.__shInit) return;
  window.__shInit = true;
  var slug = location.pathname.replace(/^\\/+|\\/+$/g, '') || 'index';
  if (pageScripts[slug]) pageScripts[slug]();
  initMain();
  initRevealSafetyNet();
  initScrollArrows();
})();
`;
fs.mkdirSync(path.join(ROOT, 'public/js'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'public/js/site.js'), out);
console.log('public/js/site.js', out.length, 'bytes');
