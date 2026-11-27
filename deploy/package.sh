#!/usr/bin/env bash
# Builds the site and creates deploy/dist/scarlethomes-public_html.zip:
# the exact contents of public_html (static site + api + .htaccess), ready for
# hPanel -> File Manager -> public_html -> Upload -> Extract.
# api/config.php is NOT included (create it on the server from config.example.php).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
STAGE="$ROOT/deploy/dist/public_html"
ZIP="$ROOT/deploy/dist/scarlethomes-public_html.zip"
(cd "$ROOT/web" && npm run build)
rm -rf "$STAGE" "$ZIP"; mkdir -p "$STAGE"
cp -r "$ROOT/web/out/." "$STAGE/"
rsync -a --exclude config.php --exclude 'storage/uploads/' "$ROOT/api/" "$STAGE/api/"
cp "$ROOT/deploy/.htaccess" "$STAGE/.htaccess"
find "$STAGE" -name '*.txt' -path '*__next*' -delete 2>/dev/null || true
(cd "$STAGE" && zip -qr -9 "$ZIP" . -x '*.DS_Store')
test ! -e "$STAGE/api/config.php"
echo "Created $ZIP ($(du -h "$ZIP" | cut -f1))"
