// Converts every image in public/images to WebP at up to three widths (mobile 480, 960,
// full <=1600) and writes data/images.json (natural size + available widths) for <Img>.
// Also builds favicon.ico / icon-192.png / apple-touch-icon.png from the logo.
// Incremental: existing up-to-date variants are skipped.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DIR = path.join(ROOT, 'public', 'images');
const TARGETS = [480, 960, 1600];
const manifest = {};
const files = fs.readdirSync(DIR).filter((f) => /\.(jpe?g|png)$/i.test(f) && !/-\d+\.webp$/.test(f)).sort();
for (const f of files) {
  const src = path.join(DIR, f);
  const meta = await sharp(src).metadata();
  const base = f.replace(/\.(jpe?g|png)$/i, '');
  const widths = [...new Set(TARGETS.map((t) => Math.min(t, meta.width)))].sort((a, b) => a - b);
  for (const w of widths) {
    const out = path.join(DIR, `${base}-${w}.webp`);
    if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs) continue;
    await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: 76, effort: 5 }).toFile(out);
  }
  manifest[f] = { w: meta.width, h: meta.height, widths };
}
fs.mkdirSync(path.join(ROOT, 'data'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'data', 'images.json'), JSON.stringify(manifest, null, 1) + '\n');

// icons from the logo (centred on a white square)
const logo = path.join(DIR, 'scarlet-homes-logo.png');
const square = async (size, pad) => {
  const inner = Math.round(size * (1 - pad * 2));
  const img = await sharp(logo).resize({ width: inner, height: inner, fit: 'inside' }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: '#ffffff' } })
    .composite([{ input: img, gravity: 'center' }]).png().toBuffer();
};
const pub = path.join(ROOT, 'public');
fs.writeFileSync(path.join(pub, 'apple-touch-icon.png'), await square(180, 0.08));
fs.writeFileSync(path.join(pub, 'icon-192.png'), await square(192, 0.08));
fs.writeFileSync(path.join(pub, 'icon-512.png'), await square(512, 0.08));
// favicon.ico with PNG payloads (16, 32, 48)
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => square(s, 0.04)));
const header = Buffer.alloc(6); header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const dir = Buffer.concat(sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0); e.writeUInt8(s, 1); e.writeUInt8(0, 2); e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(pngs[i].length, 8); e.writeUInt32LE(offset, 12);
  offset += pngs[i].length; return e;
}));
fs.writeFileSync(path.join(pub, 'favicon.ico'), Buffer.concat([header, dir, ...pngs]));
console.log(`images: ${files.length} originals, manifest + icons written`);
