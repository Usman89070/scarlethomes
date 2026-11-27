#!/usr/bin/env bash
# Creates deploy/dist/scarlethomes-nodejs.zip for Hostinger -> Node.js app -> "Upload your files".
# The website is built HERE (Next.js, image optimisation, fonts), so the server only installs
# 5 small runtime packages and starts - no heavy build on Hostinger.
# Contents: out/ (ready website), server.js + server/ (static server + Node.js API, Express),
# package.json (start: node server.js; build: just checks out/ exists), .env.example.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/deploy/dist"; STAGE="$DIST/nodejs-app"; ZIP="$DIST/scarlethomes-nodejs.zip"
(cd "$ROOT/web" && npm run build)
rm -rf "$STAGE" "$ZIP"; mkdir -p "$STAGE"
cp -r "$ROOT/web/out" "$STAGE/out"
cp -r "$ROOT/web/server" "$ROOT/web/server.js" "$ROOT/web/.env.example" "$STAGE/"
node -e '
const src = require(process.argv[1] + "/web/package.json");
const pick = ["express", "mysql2", "bcryptjs", "busboy", "nodemailer"];
const pkg = {
  name: "scarlethomes", version: "1.0.0", private: true,
  description: "Scarlet Homes website (prebuilt) + Node.js API",
  main: "server.js",
  scripts: { start: "node server.js", build: "node -e \"require(\x27fs\x27).accessSync(\x27out/index.html\x27); console.log(\x27prebuilt website ok\x27)\"" },
  engines: { node: ">=18" },
  dependencies: Object.fromEntries(pick.map((k) => [k, src.dependencies[k]])),
};
require("fs").writeFileSync(process.argv[2] + "/package.json", JSON.stringify(pkg, null, 2) + "\n");
' "$ROOT" "$STAGE"
(cd "$STAGE" && npm install --package-lock-only --ignore-scripts >/dev/null 2>&1)
(cd "$STAGE" && zip -qr -9 "$ZIP" . -x '*.DS_Store')
unzip -l "$ZIP" | grep -q ' package.json$'
! unzip -l "$ZIP" | grep -qE ' \.env$|node_modules/'
echo "Created $ZIP ($(du -h "$ZIP" | cut -f1))"
