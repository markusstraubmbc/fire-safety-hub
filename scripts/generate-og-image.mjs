/**
 * Generates public/og-image.png (1200x630) for OpenGraph/Twitter sharing.
 * Composites the hero image with a dark gradient, logo and claim text.
 *
 * Run manually after changing hero image, logo or claim:
 *   node scripts/generate-og-image.mjs
 */

import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const W = 1200;
const H = 630;

const HERO = join(ROOT, "src", "assets", "german_firefighters_fixed_bg.png");
const LOGO = join(ROOT, "public", "logo.png");
const OUT = join(ROOT, "public", "og-image.png");

const overlaySvg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0f172a" stop-opacity="0.96" />
      <stop offset="55%" stop-color="#0f172a" stop-opacity="0.82" />
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.45" />
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#shade)" />
  <rect x="0" y="0" width="14" height="${H}" fill="#cc1a1a" />

  <text x="200" y="208" font-family="DejaVu Sans" font-weight="bold" font-size="96" fill="#ffffff">RESQIO</text>

  <text x="72" y="330" font-family="DejaVu Sans" font-weight="bold" font-size="46" fill="#ffffff">Die intelligente Feuerwehr-Software</text>
  <text x="72" y="396" font-family="DejaVu Sans" font-weight="bold" font-size="46" fill="#f59e0b">mit integrierter KI</text>

  <text x="72" y="486" font-family="DejaVu Sans" font-size="30" fill="#e2e8f0">57+ Module · GPS-Lagekarte · Offline-Kiosk · DGUV-Wartung</text>
  <text x="72" y="538" font-family="DejaVu Sans" font-size="30" fill="#e2e8f0">Made in Germany · DSGVO-konform</text>
</svg>`;

const logo = await sharp(LOGO).resize(110, 110, { fit: "contain" }).toBuffer();

await sharp(HERO)
  .resize(W, H, { fit: "cover", position: "centre" })
  .composite([
    { input: Buffer.from(overlaySvg), top: 0, left: 0 },
    { input: logo, top: 122, left: 72 },
  ])
  .png({ compressionLevel: 9, palette: true })
  .toFile(OUT);

const { size } = await sharp(OUT).metadata().then(() => import("fs").then((fs) => fs.statSync(OUT)));
console.log(`generate-og-image: wrote ${OUT} (${Math.round(size / 1024)} KB, ${W}x${H})`);
