// Parse each reference widget in Chromium (JavaScript disabled) and dump the
// #sh-top subtree as JSON: exactly the DOM the browser builds from the source.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const W = path.join(ROOT, 'reference', 'widgets');
const OUT = path.join(ROOT, 'reference', 'dom');
fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.route('**/*', (r) => (r.request().url().startsWith('file:') ? r.continue() : r.abort()));
  for (const f of fs.readdirSync(W).filter((x) => x.endsWith('.html'))) {
    const html = fs.readFileSync(path.join(W, f), 'utf8');
    await page.setContent('<!doctype html><html><head><meta charset="utf-8"></head><body>' + html + '</body></html>', { waitUntil: 'domcontentloaded' });
    const tree = await page.evaluate(() => {
      const walk = (n) => {
        if (n.nodeType === 3) return { t: 'x', v: n.nodeValue };
        if (n.nodeType !== 1) return null;
        const el = { t: 'e', tag: n.localName, ns: n.namespaceURI === 'http://www.w3.org/2000/svg' ? 'svg' : 'html', a: [], c: [] };
        for (const at of n.attributes) el.a.push([at.name, at.value]);
        const kids = n.localName === 'template' ? n.content.childNodes : n.childNodes;
        for (const k of kids) { const w = walk(k); if (w) el.c.push(w); }
        return el;
      };
      const top = document.getElementById('sh-top');
      const after = [];
      let s = top.nextElementSibling;
      while (s) { after.push(walk(s)); s = s.nextElementSibling; }
      return { top: walk(top), after };
    });
    fs.writeFileSync(path.join(OUT, f.replace('.html', '.json')), JSON.stringify(tree));
    console.log(f, JSON.stringify(tree).length);
  }
  await browser.close();
})();
