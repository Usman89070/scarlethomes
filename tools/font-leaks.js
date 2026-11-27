const { chromium } = require('playwright');
const pages = ['', 'duplex-builders-sydney/', 'knockdown-rebuild-sydney/', 'new-home-builders-sydney/', 'granny-flat-builders-sydney/', 'projects/', 'about/', 'contact/', 'service-areas/', 'home-builders-hornsby/'];
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1366, height: 900 } });
  for (const u of pages) {
    await p.goto('https://gleaming-gold-raccoon-58.hostingersite.com/' + u, { waitUntil: 'networkidle' });
    const r = await p.evaluate(() => {
      const out = {};
      document.querySelectorAll('.sh *').forEach((e) => {
        const cs = getComputedStyle(e);
        const f = cs.fontFamily;
        if (/Prompt|Lato|DMSans|Roboto/.test(f) && (e.textContent || '').trim() && e.getClientRects().length) {
          const k = e.tagName + '.' + [...e.classList].join('.') + ' :: ' + f;
          out[k] = (out[k] || 0) + 1;
        }
      });
      const figs = [...document.querySelectorAll('.sh figure')].filter((f) => getComputedStyle(f).marginBottom === '16px').length;
      return { out, figs };
    });
    console.log(u || '/', JSON.stringify(r));
  }
  await b.close();
})();
