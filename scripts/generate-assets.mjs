/**
 * Generates raster brand assets from source art:
 *   - public/icon-192.png, icon-512.png   (PWA manifest icons, from logo.svg)
 *   - public/apple-icon.png               (180x180 opaque, from logo.svg)
 *   - public/logo.png                     (512x512 PNG org logo for JSON-LD; was a misnamed JPEG)
 *   - public/og-image.png                 (1200x630 static Open Graph fallback image)
 *
 * Run: node scripts/generate-assets.mjs
 */
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");
const appDir = join(root, "src", "app");

const NAVY = "#0d1b3e";
const GOLD = "#c9a46e";

async function fromLogoSvg() {
  const svg = await readFile(join(pub, "logo.svg"));

  await sharp(svg, { density: 384 })
    .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(join(pub, "icon-512.png"));

  await sharp(svg, { density: 384 })
    .resize(192, 192, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(join(pub, "icon-192.png"));

  // Apple touch icon: opaque square, brand blue behind the round mark.
  await sharp(svg, { density: 384 })
    .resize(180, 180, { fit: "contain", background: "#1980e6" })
    .flatten({ background: "#1980e6" })
    .png()
    .toFile(join(pub, "apple-icon.png"));

  // Organization logo for structured data — real PNG, replaces the JPEG-named-.png.
  await sharp(svg, { density: 512 })
    .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(join(pub, "logo.png"));
}

function ogSvg() {
  const esc = (s) => s.replace(/&/g, "&amp;");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${NAVY}"/>
  <rect x="0" y="0" width="1200" height="6" fill="${GOLD}"/>
  <rect x="0" y="624" width="1200" height="6" fill="${GOLD}"/>
  <text x="600" y="215" text-anchor="middle" fill="${GOLD}"
        font-family="Georgia, 'Times New Roman', serif" font-size="26"
        letter-spacing="9" style="text-transform:uppercase">${esc("Your Cosmetic Surgery & SPA")}</text>
  <text x="600" y="320" text-anchor="middle" fill="#ffffff"
        font-family="Georgia, 'Times New Roman', serif" font-size="66" font-weight="300">Trusted Plastic Surgeons</text>
  <text x="600" y="398" text-anchor="middle" fill="#ffffff"
        font-family="Georgia, 'Times New Roman', serif" font-size="66" font-weight="300">in Miami</text>
  <text x="600" y="470" text-anchor="middle" fill="rgba(255,255,255,0.45)"
        font-family="Arial, Helvetica, sans-serif" font-size="22" letter-spacing="6">HIALEAH · MIAMI · SOUTH FLORIDA</text>
  <text x="1140" y="600" text-anchor="end" fill="rgba(255,255,255,0.28)"
        font-family="Arial, Helvetica, sans-serif" font-size="18">ycosmeticsurgery.com</text>
</svg>`;
}

async function fromOgSvg() {
  await sharp(Buffer.from(ogSvg())).png().toFile(join(pub, "og-image.png"));
}

/** Build a PNG-embedded .ico (Vista+ format) with 16/32/48px frames. */
async function faviconIco() {
  const svg = await readFile(join(pub, "logo.svg"));
  const sizes = [16, 32, 48];
  const pngs = await Promise.all(
    sizes.map((s) =>
      sharp(svg, { density: 384 })
        .resize(s, s, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer(),
    ),
  );

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(sizes.length, 4);

  const dir = Buffer.alloc(16 * sizes.length);
  let offset = 6 + dir.length;
  sizes.forEach((s, i) => {
    const b = i * 16;
    dir.writeUInt8(s === 256 ? 0 : s, b + 0);
    dir.writeUInt8(s === 256 ? 0 : s, b + 1);
    dir.writeUInt8(0, b + 2); // palette
    dir.writeUInt8(0, b + 3); // reserved
    dir.writeUInt16LE(1, b + 4); // planes
    dir.writeUInt16LE(32, b + 6); // bpp
    dir.writeUInt32LE(pngs[i].length, b + 8);
    dir.writeUInt32LE(offset, b + 12);
    offset += pngs[i].length;
  });

  await writeFile(join(appDir, "favicon.ico"), Buffer.concat([header, dir, ...pngs]));
}

await fromLogoSvg();
await fromOgSvg();
await faviconIco();
console.log(
  "Generated: icon-192.png, icon-512.png, apple-icon.png, logo.png, og-image.png, src/app/favicon.ico",
);
