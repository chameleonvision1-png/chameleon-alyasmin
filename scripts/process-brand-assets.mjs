import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";

const UPLOAD_DIR = "C:/Users/antigravityadmin/.gemini/antigravity/brain/7fc31b93-d1a6-45ca-b5bc-beb664dd5141/.user_uploaded";
const PUBLIC_DIR = "E:/Projects/Chameleon-Alyasmin/public";
const APP_DIR = "E:/Projects/Chameleon-Alyasmin/src/app";

const SRC_SQUARE_GOLD = path.join(UPLOAD_DIR, "media_1793973873506_1978cbf7.jpg");
const SRC_EMBLEM_PNG = path.join(UPLOAD_DIR, "media_1793973875120_3a1ae0ff.png");
const SRC_BANNER_GOLD = path.join(UPLOAD_DIR, "media_1793973877265_04cd4bf8.jpg");
const SRC_VERTICAL_PNG = path.join(UPLOAD_DIR, "media_1793973878980_794f3a68.png");
const SRC_HORIZONTAL_PNG = path.join(UPLOAD_DIR, "media_1793973900478_82d7dc91.png");

async function colorizeTransparentPng(inputPath, outputPath, r, g, b) {
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    out[i] = r;
    out[i + 1] = g;
    out[i + 2] = b;
    out[i + 3] = a;
  }
  await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toFile(outputPath);
}

async function main() {
  fs.mkdirSync(path.join(PUBLIC_DIR, "images"), { recursive: true });

  // 1. Copy & optimize the 3 white transparent PNG logos
  await sharp(SRC_EMBLEM_PNG).png().toFile(path.join(PUBLIC_DIR, "logo-emblem.png"));
  await sharp(SRC_VERTICAL_PNG).png().toFile(path.join(PUBLIC_DIR, "logo-vertical.png"));
  await sharp(SRC_VERTICAL_PNG).png().toFile(path.join(PUBLIC_DIR, "logo.png"));
  await sharp(SRC_HORIZONTAL_PNG).png().toFile(path.join(PUBLIC_DIR, "logo-horizontal.png"));

  // 2. Generate colorized variants for light/cream surfaces
  await colorizeTransparentPng(SRC_EMBLEM_PNG, path.join(PUBLIC_DIR, "logo-emblem-dark.png"), 24, 17, 12);
  await colorizeTransparentPng(SRC_VERTICAL_PNG, path.join(PUBLIC_DIR, "logo-vertical-dark.png"), 24, 17, 12);
  await colorizeTransparentPng(SRC_HORIZONTAL_PNG, path.join(PUBLIC_DIR, "logo-horizontal-dark.png"), 24, 17, 12);
  await colorizeTransparentPng(SRC_EMBLEM_PNG, path.join(PUBLIC_DIR, "logo-emblem-gold.png"), 232, 168, 24);
  await colorizeTransparentPng(SRC_HORIZONTAL_PNG, path.join(PUBLIC_DIR, "logo-horizontal-gold.png"), 201, 138, 10);

  // 3. Copy original brand golden covers
  await sharp(SRC_SQUARE_GOLD).jpeg({ quality: 92 }).toFile(path.join(PUBLIC_DIR, "images", "brand-square-gold.jpg"));
  await sharp(SRC_BANNER_GOLD).jpeg({ quality: 92 }).toFile(path.join(PUBLIC_DIR, "images", "brand-banner-gold.jpg"));

  // 4. Build a 100% clean, seamless Golden Shawarma Pattern Backdrop (1024x1024)
  // Extract the untouched top-right shawarma + leaf region (x: 560..1024, y: 0..220) and top-left (x: 0..280, y: 0..220)
  // Plus in SRC_SQUARE_GOLD, any pixel where (b > 42 || r < 195 || g < 135) is part of the white logo or its black shadow.
  // Even better: let's measure the base golden color (231, 165, 20) and extract ONLY the pure shawarma etching darkness from the untouched top-right & top-left motifs,
  // then stamp those exact hand-drawn shawarma rolls & leaves across a clean 1024x1024 golden canvas with zero seams and zero logo remnants!
  const sqRaw = await sharp(SRC_SQUARE_GOLD).raw().toBuffer({ resolveWithObject: true });
  const W = 1024, H = 1024;
  const BASE_R = 231, BASE_G = 165, BASE_B = 20;

  // Helper to extract a clean etching motif from a bounding box [x0, y0, w, h] where NO logo pixels exist,
  // feathered smoothly to 0 at its 24px border so stamping never creates a rectangular seam!
  function extractMotif(x0, y0, mw, mh) {
    const motif = new Float32Array(mw * mh * 3); // delta (dr, dg, db) from BASE
    const feather = 28;
    for (let y = 0; y < mh; y++) {
      for (let x = 0; x < mw; x++) {
        const sx = x0 + x;
        const sy = y0 + y;
        const idx = (sy * W + sx) * 3;
        let r = sqRaw.data[idx], g = sqRaw.data[idx + 1], b = sqRaw.data[idx + 2];
        // Safety clamp: if any pixel has white/shadow artifact, treat as base gold
        if (b > 42 || r < 190 || g < 130) {
          r = BASE_R;
          g = BASE_G;
          b = BASE_B;
        }
        // Smooth border feathering weight (0 at edge, 1 inside)
        const wx = Math.min(x / feather, (mw - 1 - x) / feather, 1);
        const wy = Math.min(y / feather, (mh - 1 - y) / feather, 1);
        const w = Math.max(0, Math.min(1, wx * wy));
        const mIdx = (y * mw + x) * 3;
        motif[mIdx] = (r - BASE_R) * w;
        motif[mIdx + 1] = (g - BASE_G) * w;
        motif[mIdx + 2] = (b - BASE_B) * w;
      }
    }
    return { mw, mh, motif };
  }

  // Untouched motifs in SRC_SQUARE_GOLD:
  // Motif A: Top-Right shawarma wrap + mint leaf (x: 560..1010, y: 0..215) -> 450x215
  const motifTR = extractMotif(560, 0, 450, 215);
  // Motif B: Top-Left shawarma wrap (x: 0..275, y: 0..220) -> 275x220
  const motifTL = extractMotif(0, 0, 275, 220);
  // Motif C: Bottom-Right shawarma wrap (x: 700..1010, y: 815..1020) -> 310x205
  const motifBR = extractMotif(700, 815, 310, 205);
  // Motif D: Mid-Left shawarma wrap (x: 0..265, y: 380..640) -> 265x260 (completely left of logo!)
  const motifML = extractMotif(0, 380, 265, 260);
  // Motif E: Mid-Right shawarma wrap (x: 735..1010, y: 380..565) -> 275x185 (above the right tip of Alef!)
  const motifMR = extractMotif(735, 380, 275, 185);

  const canvas = new Float32Array(W * H * 3);
  for (let i = 0; i < W * H; i++) {
    canvas[i * 3] = BASE_R;
    canvas[i * 3 + 1] = BASE_G;
    canvas[i * 3 + 2] = BASE_B;
  }

  function stampMotif(m, dstX, dstY, flipX = false) {
    for (let y = 0; y < m.mh; y++) {
      const py = dstY + y;
      if (py < 0 || py >= H) continue;
      for (let x = 0; x < m.mw; x++) {
        const px = dstX + (flipX ? m.mw - 1 - x : x);
        if (px < 0 || px >= W) continue;
        const mIdx = (y * m.mw + x) * 3;
        const cIdx = (py * W + px) * 3;
        canvas[cIdx] += m.motif[mIdx];
        canvas[cIdx + 1] += m.motif[mIdx + 1];
        canvas[cIdx + 2] += m.motif[mIdx + 2];
      }
    }
  }

  // Stamp across the 1024x1024 canvas in a balanced organic layout matching the original poster
  stampMotif(motifTL, 0, 0);
  stampMotif(motifTR, 560, 0);
  stampMotif(motifTR, 200, 40, true);
  stampMotif(motifML, 10, 370);
  stampMotif(motifMR, 735, 380);
  stampMotif(motifML, 370, 340, true);
  stampMotif(motifTR, 320, 620);
  stampMotif(motifBR, 700, 810);
  stampMotif(motifBR, 15, 800, true);

  const seamlessGold = Buffer.alloc(W * H * 3);
  for (let i = 0; i < W * H * 3; i++) {
    seamlessGold[i] = Math.max(0, Math.min(255, Math.round(canvas[i])));
  }

  await sharp(seamlessGold, { raw: { width: W, height: H, channels: 3 } })
    .webp({ quality: 92 })
    .toFile(path.join(PUBLIC_DIR, "images", "shawarma-pattern-gold.webp"));

  // Transparent RGBA overlay of the hand-drawn shawarma etchings
  const overlayRgba = Buffer.alloc(W * H * 4);
  for (let i = 0; i < W * H; i++) {
    const g = seamlessGold[i * 3 + 1];
    const diff = Math.max(0, BASE_G - g);
    const alpha = Math.min(255, Math.round(diff * 6));
    overlayRgba[i * 4] = 90;     // Warm brown #5A3218
    overlayRgba[i * 4 + 1] = 50;
    overlayRgba[i * 4 + 2] = 24;
    overlayRgba[i * 4 + 3] = alpha;
  }
  await sharp(overlayRgba, { raw: { width: W, height: H, channels: 4 } })
    .png()
    .toFile(path.join(PUBLIC_DIR, "images", "shawarma-pattern-overlay.png"));

  // 5. Generate App Icons & Favicons (512x512, 192x192, 180x180)
  const emblem512 = await sharp(SRC_EMBLEM_PNG)
    .resize(370, 370, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const emblemShadow = await sharp(emblem512)
    .modulate({ brightness: 0 })
    .blur(5)
    .toBuffer();

  const circleMaskSvg = Buffer.from(
    `<svg width="512" height="512" viewBox="0 0 512 512">
      <rect x="0" y="0" width="512" height="512" rx="128" ry="128" fill="#fff"/>
    </svg>`
  );

  const icon512Buf = await sharp(seamlessGold, { raw: { width: W, height: H, channels: 3 } })
    .resize(512, 512)
    .composite([
      { input: emblemShadow, top: 75, left: 73 },
      { input: emblem512, top: 71, left: 71 },
      { input: circleMaskSvg, blend: "dest-in" },
    ])
    .png()
    .toBuffer();

  await sharp(icon512Buf).toFile(path.join(PUBLIC_DIR, "icon-512.png"));
  await sharp(icon512Buf).resize(192, 192).png().toFile(path.join(PUBLIC_DIR, "icon-192.png"));
  await sharp(icon512Buf).resize(192, 192).png().toFile(path.join(APP_DIR, "icon.png"));
  await sharp(icon512Buf).resize(180, 180).png().toFile(path.join(APP_DIR, "apple-icon.png"));

  console.log("Clean brand logos, seamless shawarma pattern, and icons generated!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
