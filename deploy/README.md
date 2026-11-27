# Deploying to Hostinger shared hosting

The site is a static Next.js export (`web/out`) plus a small PHP API (`api/`) and a MySQL
database. Everything runs on a standard Hostinger shared plan (Premium / Business / Cloud).

Final layout on the server:

```
public_html/
  .htaccess            <- deploy/.htaccess
  index.html, 404.html, sitemap.xml, robots.txt, favicon.ico, ...
  _next/  images/  about/  contact/  portal/  ...   <- contents of web/out
  api/
    config.php         <- you create this (never commit it)
    enquiry.php auth.php me.php admin.php
    lib/  setup/  .htaccess
```

## 1. Database

1. hPanel → **Databases → MySQL Databases** → create a database and a user (note the
   prefixed names, e.g. `u123456789_scarlet`) and a strong password. Host is `localhost`.
2. hPanel → **Databases → phpMyAdmin** → open the new database → **Import** →
   choose `db/schema.sql` → **Go**.
3. Do **not** import `db/seed.sql` on production (it is sample data for local testing).

## 2. API configuration

1. Copy `api/config.example.php` to `api/config.php`.
2. Fill in:
   - `db` – the database name, user and password from step 1 (`host` = `localhost`).
   - `site_url` – `https://scarlethomes.com.au`.
   - `app_secret` – a long random string (`php -r "echo bin2hex(random_bytes(32));"`).
   - `mail` – create a mailbox such as `website@scarlethomes.com.au` in hPanel
     (**Emails**), then use it as `from` and as the SMTP `user`/`pass`
     (`smtp.hostinger.com`, port `465`, `ssl`). Enquiries go to `to`
     (`info@scarlethomes.com.au`). `transport => 'mail'` (PHP `mail()`) also works on Hostinger.
   - Leave `insecure_cookies` = `false` and `dev_cors_origin` = `''` on production.

## 3. Build and upload

On your computer (Node 20+):

```bash
cd web
npm ci
npm run build
```

`npm run build` optimises the images (WebP + mobile sizes), builds the static site into
`web/out`, and checks it (no WordPress URLs left, one H1 per page, all assets present).

Upload with hPanel → **Files → File Manager** (or FTP/SFTP):

1. Upload **the contents of** `web/out/` into `public_html/` (not the `out` folder itself).
   Remove the old WordPress files first, or upload into a fresh `public_html`.
2. Upload the `api/` folder to `public_html/api/` (including `api/config.php` from step 2,
   `lib/`, `setup/` and the `.htaccess` files).
3. Upload `deploy/.htaccess` to `public_html/.htaccess`.

## 4. .htaccess (what it does)

`deploy/.htaccess`:

- forces HTTPS and the non-www host `https://scarlethomes.com.au` (swap the host in the
  first rule if you prefer www, and update `SITE_URL` in `web/lib/site.ts`);
- adds trailing slashes (`/about` → `/about/`), serves `/404.html` for missing pages,
  redirects the old `/login` to `/portal/`;
- blocks `api/config.php`, `api/lib/`, `api/setup/`, dotfiles and `*.sql`, `*.md`, `*.log`;
- sends security headers (HSTS, CSP, X-Frame-Options, nosniff, Referrer-Policy,
  Permissions-Policy) and long cache headers for `/_next/static/` (hashed) and `/images/`.

Make sure **SSL** is active for the domain (hPanel → **Security → SSL**) before enabling HSTS.

## 5. Create the first admin (once)

**With SSH** (hPanel → **Advanced → SSH Access**):

```bash
cd ~/domains/scarlethomes.com.au/public_html
php api/setup/create-admin.php info@scarlethomes.com.au "Bharat"
```

It asks for a password (min. 10 characters, letters + numbers) or generates one. Then:

```bash
rm -rf api/setup
```

**Without SSH**: set `'setup_token' => '<long random string>'` in `api/config.php`, comment
out the `RewriteRule ^api/setup` line in `public_html/.htaccess`, then send one POST request:

```bash
curl -X POST https://scarlethomes.com.au/api/setup/create-admin.php -d token=<token> -d email=info@scarlethomes.com.au -d name=Bharat -d password='<password>'
```

It only works while no admin exists. Afterwards delete `public_html/api/setup/`, restore the
`.htaccess` line and set `setup_token` back to `''`.

Further admins and all contractors are created in the portal (`/portal/` → sign in as admin →
**Add Contractor**). Each new contractor gets a one-time temporary password, shown once, and
must choose their own password on first sign-in. **Reset Password** issues a new temporary one.

## 6. Check

- `https://scarlethomes.com.au/` and every page load over HTTPS; `/about` redirects to `/about/`.
- `https://scarlethomes.com.au/api/config.php` returns **403**.
- Send a test enquiry on `/contact/` → success message, email arrives at info@, and the
  enquiry appears in the portal under **Enquiries**.
- Sign in at `/portal/`.
- Submit `https://scarlethomes.com.au/sitemap.xml` in Google Search Console.

## Notes

- The old WordPress site's `/login` contractor system stops working when the domain moves to
  this build. The footer's **Contractor Login** now points to `/portal/`, and `/login`
  redirects there. Existing contractor accounts are **not** migrated – add them in the portal.
- Placeholders that still need client values (kept exactly as on the reference): NSW Builder
  Licence No. `[XXXXXX]`, ABN `[XX XXX XXX XXX]`, some stats, extra Google reviews, director
  photos, and the price-estimator rates (`RATES` at the top of `initMain()` in
  `web/lib/legacy/site.js`).
- Re-deploying after content changes: `npm run build` again and re-upload `web/out/*`.
  `api/config.php` and the database are untouched.
