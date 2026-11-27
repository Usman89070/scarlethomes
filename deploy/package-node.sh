#!/usr/bin/env bash
# Creates deploy/dist/scarlethomes-nodejs.zip for Hostinger -> Websites -> Node.js app ->
# "Upload your files". The ZIP holds the web/ app source (package.json at the root);
# Hostinger runs: npm install -> npm run build -> npm start (node server.js).
# Website + built-in Node.js API (contact form, portal) - no PHP needed.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ZIP="$ROOT/deploy/dist/scarlethomes-nodejs.zip"
mkdir -p "$ROOT/deploy/dist"; rm -f "$ZIP"
cd "$ROOT/web"
zip -qr -9 "$ZIP" . \
  -x 'node_modules/*' '.next/*' 'out/*' 'storage/*' '.env' '.env.local' \
     'public/images/*.webp' 'public/js/*' 'AGENTS.md' 'tsconfig.tsbuildinfo' 'next-env.d.ts' '*.DS_Store'
unzip -l "$ZIP" | grep -q ' package.json$'
! unzip -l "$ZIP" | grep -qE ' \.env$|node_modules/'
echo "Created $ZIP ($(du -h "$ZIP" | cut -f1))"
