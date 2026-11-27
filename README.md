# Scarlet Homes – website + contractor portal

Exact rebuild of the Scarlet Homes WordPress/Elementor site as a static **Next.js** export, plus
a small **PHP + MySQL** API (contact form, contractor portal). Deploys to Hostinger shared
hosting – see [`deploy/README.md`](deploy/README.md).

```
reference/   downloaded reference pages, extracted widgets, DOM trees, seo.json (comparison only)
web/         Next.js app (App Router, TypeScript) -> builds to web/out
api/         PHP endpoints (enquiry, auth, me, admin, setup/create-admin)
db/          schema.sql, seed.sql
deploy/      Hostinger README + .htaccess
tools/       extraction/generation scripts, comparison and test scripts, PHP dev router
```

## How the site is built

- **Source of truth** was https://gleaming-gold-raccoon-58.hostingersite.com (one Elementor HTML
  widget per page). `tools/extract.py` cut the widget out of each page, `tools/dom-export.js`
  parsed it in Chromium, and `tools/generate.py` converted that DOM to JSX, keeping every
  class, text, link and inline SVG. The generated files are normal source files now; edit them
  directly. (Re-running the generator overwrites them.)
- **CSS** – `web/styles/global.css` holds every reference `<style>` block in original cascade
  order (blocks v1…v25p). Blocks that existed on only some pages and would affect other pages
  live in `web/styles/pages/<page>.css`. Only mechanical edits were made: fonts via `next/font`
  (`var(--f-serif)`, `var(--f-sans)`), image URLs → `/images/`. `wp-compat.css` reproduces the
  few WordPress/Elementor wrapper rules that reached the content; `additions.css` holds the
  zero-specificity rules needed for `<picture>`/WebP and image dimensions.
- **Shared layout** – `app/layout.tsx` renders `components/Header.tsx` (top bar, nav with
  dropdowns, mobile menu), `components/Footer.tsx` and `components/FixedUI.tsx` (call button,
  progress bar, back-to-top, cursor, mobile bar, lightbox) once for every page.
- **Behaviour** – the reference scripts are in `web/lib/legacy/site.js` (and `pages.js` for
  page-only scripts), run once after hydration by `components/SiteScripts.tsx`. They move the
  fixed UI into a body-level portal, exactly as on the reference.
- **Images** – originals in `web/public/images/`; `npm run images` (run automatically by
  `dev`/`build`) creates WebP at 480/960/1600 px and `web/data/images.json`; `components/Img.tsx`
  renders `<picture>` with WebP + original fallback, width/height, lazy loading and
  `fetchpriority="high"` for the hero image.
- **SEO** – titles, descriptions and JSON-LD copied from the reference (`web/data/seo.json`),
  canonical URLs on `https://scarlethomes.com.au`, Open Graph/Twitter tags, `sitemap.xml`,
  `robots.txt`, favicons.

## Run locally

Requirements: Node 20+, PHP 8.1+ (pdo_mysql), MySQL 8 or MariaDB 10.4+.

```bash
cd web
npm install
npm run dev
```

http://localhost:3000 – fast refresh for the static pages. (The contact form and portal need
the PHP API; use the full-stack server below, or set `NEXT_PUBLIC_API_BASE=http://127.0.0.1:8080`
and `dev_cors_origin` in `api/config.php` for the portal.)

Full stack (static build + PHP API, same layout as Hostinger):

```bash
mysql -u root -e "CREATE DATABASE scarlet CHARACTER SET utf8mb4"
```

```bash
mysql -u root scarlet < db/schema.sql
```

```bash
mysql -u root scarlet < db/seed.sql
```

```bash
cp api/config.example.php api/config.php
```

Edit `api/config.php`: local DB credentials, `'site_url' => 'http://127.0.0.1:8080'`,
`'insecure_cookies' => true`, `'transport' => 'mail'`. Then:

```bash
php api/setup/create-admin.php admin@example.com "Local Admin"
```

```bash
(cd web && npm run build)
```

```bash
php -S 127.0.0.1:8080 tools/dev-router.php
```

Open http://127.0.0.1:8080 (site) and http://127.0.0.1:8080/portal/ (portal).

## Tests

```bash
node tools/test-api.mjs http://127.0.0.1:8080
```

```bash
node tools/test-ui.js http://127.0.0.1:8080 admin@example.com '<admin password>'
```

```bash
node tools/compare.js http://127.0.0.1:8080 all 360,768,1366 --shots
```

`test-api.mjs` (39 checks) expects a fresh database with `seed.sql` and an admin
`admin@example.com` / `Adm1nPassw0rd!` (create it with `ADMIN_PASSWORD='Adm1nPassw0rd!' php api/setup/create-admin.php admin@example.com Admin`).
`compare.js` loads each page on the reference and on the build at each width, scrolls to
trigger reveals, then compares every element's box and key computed styles; screenshots and
`report.json` go to `screens/` (git-ignored).

## Client placeholders (kept exactly as on the reference)

NSW Builder Licence No. `[XXXXXX]`, ABN `[XX XXX XXX XXX]`, some stats, extra Google reviews,
director photos, and the price-estimator rates (`RATES` in `web/lib/legacy/site.js`).
