import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";

const UPLOAD_DIR =
  "C:/Users/antigravityadmin/.gemini/antigravity/brain/7fc31b93-d1a6-45ca-b5bc-beb664dd5141/.user_uploaded";
const PUBLIC_DIR = "E:/Projects/Chameleon-Alyasmin/public";
const APP_DIR = "E:/Projects/Chameleon-Alyasmin/src/app";

const FILES = {
  coverSquare: path.join(UPLOAD_DIR, "media_1793973873506_1978cbf7.jpg"),
  emblemBlackOrAlpha: path.join(UPLOAD_DIR, "media_1793973875120_3a1ae0ff.png"),
  coverWide: path.join(UPLOAD_DIR, "media_1793973877265_04cd4bf8.jpg"),
  verticalWhite: path.join(UPLOAD_DIR, "media_1793973878980_794f3a68.png"),
  horizontalWhite: path.join(UPLOAD_DIR, "media_1793973900478_82d7dc91.png"),
};

/**
 * Ensures any dark/black background in an emblem or logo PNG becomes transparent,
 * while preserving pure white foreground and smooth anti-aliased edges.
 */
async function ensureTransparentWhiteLogo(inputPath, outputPath, trim = true) {
  const img = sharp(inputPath).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(data.length);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    if (a < 10) {
      out[i] = 255;
      out[i + 1] = 255;
      out[i + 2] = 255;
      out[i + 3] = 0;
    } else {
      const lum = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
      const finalAlpha = Math.round((a / 255) * lum);
      out[i] = 255;
      out[i + 1] = 255;
      out[i + 2] = 255;
      out[i + 3] = finalAlpha > 18 ? finalAlpha : 0;
    }
  }

  let pipeline = sharp(out, {
    raw: { width: info.width, height: info.height, channels: 4 },
  });

  if (trim) {
    pipeline = pipeline.trim({ threshold: 10 });
  }

  await pipeline.png({ compressionLevel: 9 }).toFile(outputPath);
  const meta = await sharp(outputPath).metadata();
  console.log(`Saved ${path.basename(outputPath)} (${meta.width}x${meta.height})`);
}

/**
 * Creates a colorized version of a transparent white PNG (e.g. Dark Walnut #18110C or Brand Gold #EEAB14).
 */
async function recolorTransparentLogo(whiteLogoPath, outputPath, rgb) {
  const { data, info } = await sharp(whiteLogoPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 4) {
    out[i] = rgb[0];
    out[i + 1] = rgb[1];
    out[i + 2] = rgb[2];
    out[i + 3] = data[i + 3];
  }

  await sharp(out, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);
  console.log(`Saved recolored ${path.basename(outputPath)}`);
}

/**
 * Creates a transparent logo with the authentic Alyasmin crisp black offset drop-shadow
 * (matching `1978cbf7.jpg` and `04cd4bf8.jpg`).
 */
async function createShadowedBrandLogo(whiteLogoPath, outputPath, offsetX = 5, offsetY = 6) {
  const { data, info } = await sharp(whiteLogoPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pad = Math.max(offsetX, offsetY) + 8;
  const w = info.width + pad * 2;
  const h = info.height + pad * 2;
  const out = Buffer.alloc(w * h * 4, 0);

  // 1. Draw crisp dark shadow (#140E08) shifted by (offsetX, offsetY)
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const srcIdx = (y * info.width + x) * 4;
      const a = data[srcIdx + 3];
      if (a > 25) {
        const dstX = x + pad + offsetX;
        const dstY = y + pad + offsetY;
        const dstIdx = (dstY * w + dstX) * 4;
        out[dstIdx] = 20;
        out[dstIdx + 1] = 14;
        out[dstIdx + 2] = 8;
        out[dstIdx + 3] = Math.min(255, Math.round(a * 0.92));
      }
    }
  }

  // 2. Draw crisp pure white foreground on top
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const srcIdx = (y * info.width + x) * 4;
      const a = data[srcIdx + 3];
      if (a > 10) {
        const dstX = x + pad;
        const dstY = y + pad;
        const dstIdx = (dstY * w + dstX) * 4;
        const invA = 1 - a / 255;
        out[dstIdx] = Math.round(255 * (a / 255) + out[dstIdx] * invA);
        out[dstIdx + 1] = Math.round(255 * (a / 255) + out[dstIdx + 1] * invA);
        out[dstIdx + 2] = Math.round(255 * (a / 255) + out[dstIdx + 2] * invA);
        out[dstIdx + 3] = Math.min(255, a + Math.round(out[dstIdx + 3] * invA));
      }
    }
  }

  await sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);
  console.log(`Saved shadowed brand logo ${path.basename(outputPath)} (${w}x${h})`);
}

/**
 * Extracts clean, logo-free shawarma roll & mint leaf pattern regions from the
 * official yellow cover (`1978cbf7.jpg`) and enhances the hand-drawn line contrast
 * so the yellow background + shawarma drawings look 100% like the original Alyasmin poster.
 */
async function buildShawarmaPattern() {
  const { data: srcData, info: srcInfo } = await sharp(FILES.coverSquare)
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Exact Alyasmin Yellow from `1978cbf7.jpg`: R=232, G=165, B=20 (#E8A514)
  const baseR = 232;
  const baseG = 165;
  const baseB = 20;

  // Stroke color for the hand-drawn shawarma wraps (#BA7B06)
  const strokeR = 186;
  const strokeG = 123;
  const strokeB = 6;

  function extractMotif(left, top, w, h) {
    const buf = Buffer.alloc(w * h * 4, 0);
    const feather = 28;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const sx = Math.min(srcInfo.width - 1, Math.max(0, left + x));
        const sy = Math.min(srcInfo.height - 1, Math.max(0, top + y));
        const si = (sy * srcInfo.width + sx) * 3;

        const r = srcData[si];
        const g = srcData[si + 1];
        const b = srcData[si + 2];

        // Ignore any white/black pixels if any
        if (b > 38 || r < 185 || g < 125) continue;

        // Calculate how much darker this pixel is compared to the local yellow background (r~231, g~165)
        const darkness = Math.max(0, 229 - r) * 0.6 + Math.max(0, 163 - g) * 0.4;
        if (darkness <= 3.2) continue;

        // Distance from border for smooth feathering
        const dx = Math.min(x, w - 1 - x);
        const dy = Math.min(y, h - 1 - y);
        const d = Math.min(dx, dy);
        const edgeFactor = d >= feather ? 1 : 0.5 - 0.5 * Math.cos((Math.PI * d) / feather);

        const alpha = Math.min(245, Math.round((darkness - 2.5) * 9.0 * edgeFactor));
        const di = (y * w + x) * 4;
        buf[di] = strokeR;
        buf[di + 1] = strokeG;
        buf[di + 2] = strokeB;
        buf[di + 3] = alpha;
      }
    }
    return { input: buf, raw: { width: w, height: h, channels: 4 } };
  }

  // Verified 100% logo-free shawarma roll & mint leaf regions in 1024x1024 `1978cbf7.jpg`:
  const motifTL = extractMotif(0, 0, 385, 220);
  const motifTR = extractMotif(700, 0, 324, 220);
  const motifML = extractMotif(0, 250, 275, 420);
  const motifMR = extractMotif(730, 385, 294, 265);
  const motifBR = extractMotif(715, 820, 309, 204);

  const canvasSize = 900;
  const patternPath = path.join(PUBLIC_DIR, "images", "shawarma-pattern-gold.webp");

  await sharp({
    create: {
      width: canvasSize,
      height: canvasSize,
      channels: 4,
      background: { r: baseR, g: baseG, b: baseB, alpha: 1 },
    },
  })
    .composite([
      { ...motifTL, left: 15, top: 10 },
      { ...motifTR, left: 545, top: 15 },
      { ...motifML, left: 15, top: 265 },
      { ...motifMR, left: 575, top: 285 },
      { ...motifTL, left: 265, top: 465 },
      { ...motifBR, left: 570, top: 665 },
      { ...motifTR, left: 20, top: 660 },
    ])
    .webp({ quality: 95 })
    .toFile(patternPath);

  console.log("Saved seamless shawarma-pattern-gold.webp (900x900)");

  // Also save the transparent dark-gold line art overlay (`shawarma-pattern-overlay.png`)
  const overlayPath = path.join(PUBLIC_DIR, "images", "shawarma-pattern-overlay.png");
  await sharp({
    create: {
      width: canvasSize,
      height: canvasSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { ...motifTL, left: 15, top: 10 },
      { ...motifTR, left: 545, top: 15 },
      { ...motifML, left: 15, top: 265 },
      { ...motifMR, left: 575, top: 285 },
      { ...motifTL, left: 265, top: 465 },
      { ...motifBR, left: 570, top: 665 },
      { ...motifTR, left: 20, top: 660 },
    ])
    .png({ compressionLevel: 9 })
    .toFile(overlayPath);

  console.log("Saved shawarma-pattern-overlay.png");
}

/**
 * Generates favicons & app icons in Alyasmin's signature Golden-Yellow (#EBA714) with
 * the White Jasmine Flower emblem + crisp dark drop-shadow (matching `1978cbf7.jpg`).
 */
async function buildFavicons(emblemShadowPath) {
  const sizes = [
    { size: 512, out: path.join(PUBLIC_DIR, "icon-512.png") },
    { size: 192, out: path.join(PUBLIC_DIR, "icon-192.png") },
    { size: 64, out: path.join(APP_DIR, "icon.png") },
    { size: 180, out: path.join(APP_DIR, "apple-icon.png") },
  ];

  for (const { size, out } of sizes) {
    const inner = Math.round(size * 0.78);
    const emblemBuf = await sharp(emblemShadowPath)
      .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();

    const radius = Math.round(size * 0.22);
    const bgSvg = Buffer.from(
      `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size}" height="${size}" rx="${radius}" fill="#EBA714"/>
        <rect x="3" y="3" width="${size - 6}" height="${size - 6}" rx="${Math.max(4, radius - 2)}" fill="none" stroke="#FFFFFF" stroke-opacity="0.45" stroke-width="2"/>
      </svg>`
    );

    const offset = Math.round((size - inner) / 2);
    await sharp(bgSvg)
      .composite([{ input: emblemBuf, left: offset, top: offset }])
      .png()
      .toFile(out);

    console.log(`Generated icon ${path.basename(out)} (${size}x${size})`);
  }
}

async function main() {
  await fs.mkdir(path.join(PUBLIC_DIR, "images", "products"), { recursive: true });
  await fs.mkdir(path.join(PUBLIC_DIR, "images", "hero"), { recursive: true });
  await fs.mkdir(APP_DIR, { recursive: true });

  const emblemWhite = path.join(PUBLIC_DIR, "logo-emblem.png");
  const verticalWhite = path.join(PUBLIC_DIR, "logo-vertical.png");
  const horizontalWhite = path.join(PUBLIC_DIR, "logo-horizontal.png");
  const mainLogo = path.join(PUBLIC_DIR, "logo.png");

  // 1. Clean transparent white logos
  await ensureTransparentWhiteLogo(FILES.emblemBlackOrAlpha, emblemWhite, true);
  await ensureTransparentWhiteLogo(FILES.verticalWhite, verticalWhite, true);
  await ensureTransparentWhiteLogo(FILES.verticalWhite, mainLogo, true);
  await ensureTransparentWhiteLogo(FILES.horizontalWhite, horizontalWhite, true);

  // 2. Shadowed brand logos (White foreground + crisp black offset shadow, exact match to `1978cbf7.jpg` & `04cd4bf8.jpg`)
  const emblemShadow = path.join(PUBLIC_DIR, "logo-emblem-shadow.png");
  const verticalShadow = path.join(PUBLIC_DIR, "logo-vertical-shadow.png");
  const horizontalShadow = path.join(PUBLIC_DIR, "logo-horizontal-shadow.png");
  await createShadowedBrandLogo(emblemWhite, emblemShadow, 5, 6);
  await createShadowedBrandLogo(verticalWhite, verticalShadow, 5, 6);
  await createShadowedBrandLogo(horizontalWhite, horizontalShadow, 5, 6);

  // 3. Dark Walnut (#18110C) & Brand Gold (#EBA714) variants
  await recolorTransparentLogo(
    emblemWhite,
    path.join(PUBLIC_DIR, "logo-emblem-dark.png"),
    [24, 17, 12]
  );
  await recolorTransparentLogo(
    horizontalWhite,
    path.join(PUBLIC_DIR, "logo-horizontal-dark.png"),
    [24, 17, 12]
  );
  await recolorTransparentLogo(
    verticalWhite,
    path.join(PUBLIC_DIR, "logo-vertical-dark.png"),
    [24, 17, 12]
  );
  await recolorTransparentLogo(
    emblemWhite,
    path.join(PUBLIC_DIR, "logo-emblem-gold.png"),
    [235, 167, 20]
  );
  await recolorTransparentLogo(
    horizontalWhite,
    path.join(PUBLIC_DIR, "logo-horizontal-gold.png"),
    [235, 167, 20]
  );

  // 4. Build golden shawarma pattern from cover
  await buildShawarmaPattern();

  // 5. Build favicons in Alyasmin Golden-Yellow
  await buildFavicons(emblemShadow);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
