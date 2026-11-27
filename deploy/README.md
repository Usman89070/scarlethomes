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

The portal uses the **same tables as the old site's database** (`users`, `roles`, `projects`,
`project_user_pivots`, `project_attachments`, `project_logs`, `attendances`, `contacts`), so
the old data carries over and everyone keeps their current password.

**A) Keep the old data (recommended)**

1. phpMyAdmin → old database (`scarleth_database`) → **Export** (keep this backup).
2. Either use that same database, or hPanel → **Databases → MySQL Databases** → create a new
   database + user and **Import** the export into it.
3. phpMyAdmin → that database → **Import** → `db/migrate-from-old-site.sql` → **Go** (run it
   once). It adds a few columns/tables (password-change flag, last login, contractor business
   details, login rate limiting, enquiry fields) and clears the old Laravel sessions. The old
   website/CMS tables are left alone; the commented `DROP TABLE` at the end removes them
   later if you want.
4. Copy the old site's uploaded files (plans, completion files, check-out photos): download
   the **contents** of the old Laravel `storage/app/public/` folder (it contains e.g.
   `project/…` and `attendance/…`) and upload them into the portal's uploads folder (step 2,
   `uploads_dir`), keeping the folder structure. Files that are missing show as
   "file not uploaded to the server yet" in the portal.

**B) Fresh start (no old data)**: create a database + user, then **Import** `db/schema.sql`.

Do **not** import `db/seed.sql` on production (sample data for local testing).

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
   - `uploads_dir` – where portal files are stored. Recommended: a folder **outside**
     `public_html`, e.g. `/home/u123456789/domains/scarlethomes.com.au/storage/uploads`
     (create it in File Manager). If left `null`, `public_html/api/storage/uploads` is used
     (blocked from the web by `.htaccess`). Files are only ever served through
     `api/files.php` after a permission check.
   - `max_upload_mb` – 20 by default (Hostinger's PHP upload limit is higher; change it in
     hPanel → **Advanced → PHP Configuration** if needed).
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

## 5. Create the first admin (only if you started fresh)

With the old data (option A) the existing admins already work – skip this step.

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

Further users are created in the portal (`/portal/` → sign in as admin → **Users → Add
User**; role Contractor, Supervisor or Admin). Each new user gets a one-time temporary
password, shown once, and must choose their own password on first sign-in. **Reset Password**
issues a new temporary one.

### Who can do what

| | Admin | Supervisor | Contractor (`user`) |
|---|---|---|---|
| Projects: create / edit / archive | ✓ | ✓ | – (sees only assigned jobs) |
| Delete a project (no files) | ✓ | – | – |
| Upload / delete plans & files | ✓ | ✓ | completion file only |
| Assign contractors, change job status | ✓ | ✓ | own job: Booked → Working → Completed |
| Check in / check out (note + photo) | – | – | ✓ (assigned, active projects) |
| Attendance records | all | all | own |
| Users (add, edit role/status, reset password) | ✓ | – | – |
| Website enquiries | ✓ | – | – |

## 6. Check

- `https://scarlethomes.com.au/` and every page load over HTTPS; `/about` redirects to `/about/`.
- `https://scarlethomes.com.au/api/config.php` returns **403**.
- Send a test enquiry on `/contact/` → success message, email arrives at info@, and the
  enquiry appears in the portal under **Enquiries**.
- Sign in at `/portal/`.
- Submit `https://scarlethomes.com.au/sitemap.xml` in Google Search Console.

## Notes

- The old site's `/login` now redirects to `/portal/` (footer: **Contractor Login**). With
  option A every existing account, project, assignment, file record, attendance record and
  enquiry is kept, and users sign in with their existing email and password.
- Placeholders that still need client values (kept exactly as on the reference): NSW Builder
  Licence No. `[XXXXXX]`, ABN `[XX XXX XXX XXX]`, some stats, extra Google reviews, director
  photos, and the price-estimator rates (`RATES` at the top of `initMain()` in
  `web/lib/legacy/site.js`).
- Re-deploying after content changes: `npm run build` again and re-upload `web/out/*`.
  `api/config.php` and the database are untouched.
