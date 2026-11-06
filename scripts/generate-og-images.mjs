import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import sharp from "sharp";

const ROOT = process.cwd();
const PUB = path.join(ROOT, "public");
const APP_DIR = path.join(ROOT, "src", "app");

function toDataUri(relPath) {
  const full = path.join(PUB, relPath);
  const buf = fs.readFileSync(full);
  const ext = path.extname(relPath).toLowerCase();
  const mime =
    ext === ".png"
      ? "image/png"
      : ext === ".webp"
        ? "image/webp"
        : "image/jpeg";
  return `data:${mime};base64,${buf.toString("base64")}`;
}

function findBrowserPath() {
  const candidates = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error("Neither Chrome nor Edge found for headless OG rendering");
}

async function generateFavicons() {
  console.log("Generating high-contrast circular medallion favicons...");
  const emblemPath = path.join(PUB, "logo-emblem.png");

  const makeMedallion = async (size, isApple = false) => {
    const emblemSize = Math.round(size * 0.68);
    const resizedEmblem = await sharp(emblemPath)
      .resize(emblemSize, emblemSize, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();

    const rOuter = size / 2;
    const rGold = size * 0.485;
    const rDark = size * 0.43;
    const rInnerRing = size * 0.395;

    const bgSvg = isApple
      ? `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="core" cx="50%" cy="45%" r="60%">
              <stop offset="0%" stop-color="#2B1E14"/>
              <stop offset="100%" stop-color="#140E09"/>
            </radialGradient>
          </defs>
          <rect width="${size}" height="${size}" rx="${Math.round(size * 0.22)}" fill="#18110C"/>
          <circle cx="${rOuter}" cy="${rOuter}" r="${rGold}" fill="#E8A514"/>
          <circle cx="${rOuter}" cy="${rOuter}" r="${rDark}" fill="url(#core)"/>
          <circle cx="${rOuter}" cy="${rOuter}" r="${rInnerRing}" fill="none" stroke="#E8A514" stroke-opacity="0.45" stroke-width="${Math.max(2, Math.round(size * 0.012))}"/>
        </svg>`
      : `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="core" cx="50%" cy="45%" r="60%">
              <stop offset="0%" stop-color="#2B1E14"/>
              <stop offset="100%" stop-color="#120C08"/>
            </radialGradient>
          </defs>
          <circle cx="${rOuter}" cy="${rOuter}" r="${rOuter}" fill="#18110C"/>
          <circle cx="${rOuter}" cy="${rOuter}" r="${rGold}" fill="#E8A514"/>
          <circle cx="${rOuter}" cy="${rOuter}" r="${rDark}" fill="url(#core)"/>
          <circle cx="${rOuter}" cy="${rOuter}" r="${rInnerRing}" fill="none" stroke="#E8A514" stroke-opacity="0.5" stroke-width="${Math.max(2, Math.round(size * 0.014))}"/>
        </svg>`;

    const offset = Math.round((size - emblemSize) / 2);
    return sharp(Buffer.from(bgSvg))
      .composite([{ input: resizedEmblem, top: offset, left: offset }])
      .png({ quality: 100 })
      .toBuffer();
  };

  fs.writeFileSync(path.join(PUB, "icon-512.png"), await makeMedallion(512, false));
  fs.writeFileSync(path.join(PUB, "icon-192.png"), await makeMedallion(192, false));
  fs.writeFileSync(path.join(APP_DIR, "icon.png"), await makeMedallion(256, false));
  fs.writeFileSync(path.join(APP_DIR, "apple-icon.png"), await makeMedallion(180, true));
  console.log("✔ Favicons updated (icon-512.png, icon-192.png, src/app/icon.png, src/app/apple-icon.png)");
}

function buildOgHtml({
  mode,
  badgeEn,
  titleLine1,
  titleLine2,
  subtitleAr,
  pills,
  urlLabel,
  mainPhotoUri,
  subPhoto1Uri,
  subPhoto2Uri,
  logoHorizUri,
  emblemUri,
  patternUri,
}) {
  const leftShowcaseHtml =
    mode === "menu"
      ? `
      <div class="menu-stage">
        <div class="menu-card card-1">
          <img src="${mainPhotoUri}" class="menu-thumb" />
          <div class="menu-meta" dir="rtl">
            <span class="menu-tag">الأكثر طلباً</span>
            <div class="menu-name">بوكس شاورما عربي دمشقي</div>
            <div class="menu-desc">خبز صاج محمص • ثومية سورية • بطاطس</div>
          </div>
          <div class="menu-price" dir="rtl">145 ج.م</div>
        </div>

        <div class="menu-card card-2">
          <img src="${subPhoto1Uri}" class="menu-thumb" />
          <div class="menu-meta" dir="rtl">
            <span class="menu-tag gold">مشاوي عالفحم</span>
            <div class="menu-name">مشكل مشاوي الياسمين</div>
            <div class="menu-desc">كباب حلبي • شيش طاووق • كفتة شامية</div>
          </div>
          <div class="menu-price" dir="rtl">360 ج.م</div>
        </div>

        <div class="menu-card card-3">
          <img src="${subPhoto2Uri}" class="menu-thumb" />
          <div class="menu-meta" dir="rtl">
            <span class="menu-tag">بالسمن البلدي</span>
            <div class="menu-name">فتة شاورما سوري بالمكسرات</div>
            <div class="menu-desc">أرز بسمتي • عيش محمص • طشة سمن ولوز</div>
          </div>
          <div class="menu-price" dir="rtl">150 ج.م</div>
        </div>

        <div class="qr-floating-badge" dir="rtl">
          <div class="qr-mini-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="#18110C" stroke-width="2.2">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <path d="M14 14h3v3h-3zM18 18h3v3h-3zM14 19h2M19 14v2"/>
            </svg>
          </div>
          <div>
            <div class="qr-mini-title">منيو إلكتروني تفاعلي + QR</div>
            <div class="qr-mini-sub">24 صنف شامي أصيل • اطلب أونلاين فوراً</div>
          </div>
        </div>
      </div>
    `
      : `
      <div class="photo-stage">
        <div class="main-photo-frame">
          <img src="${mainPhotoUri}" class="main-photo" />
          <div class="photo-gradient"></div>
          <div class="floating-top-pill" dir="rtl">
            <span class="dot"></span>
            <span>تتبيلة دمشقية أصلية • طازج يومياً</span>
          </div>
        </div>

        <div class="sub-thumbs-row">
          <div class="sub-thumb-card">
            <img src="${subPhoto1Uri}" />
            <span dir="rtl">مشاوي شامية عالفحم</span>
          </div>
          <div class="sub-thumb-card">
            <img src="${subPhoto2Uri}" />
            <span dir="rtl">فتات بالسمن البلدي</span>
          </div>
        </div>
      </div>
    `;

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@700;800;900&family=Plus+Jakarta+Sans:wght@700;800;900&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 1200px;
      height: 630px;
      overflow: hidden;
      font-family: 'Cairo', sans-serif;
      background: #140E09;
      color: #FFFFFF;
    }
    .canvas {
      position: relative;
      width: 1200px;
      height: 630px;
      display: flex;
      flex-direction: row;
      align-items: stretch;
      justify-content: space-between;
      background: radial-gradient(circle at 78% 22%, rgba(232, 165, 20, 0.24), transparent 55%),
                  linear-gradient(135deg, #18110C 0%, #22170F 55%, #120C08 100%);
    }
    .pattern-overlay {
      position: absolute;
      inset: 0;
      background-image: url('${patternUri}');
      background-size: 420px 420px;
      opacity: 0.08;
      pointer-events: none;
    }
    .gold-diagonal-accent {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: 685px;
      background: linear-gradient(135deg, rgba(232, 165, 20, 0.14) 0%, rgba(232, 165, 20, 0.03) 100%);
      clip-path: polygon(12% 0, 100% 0, 100% 100%, 0% 100%);
      border-left: 3px solid rgba(232, 165, 20, 0.35);
      pointer-events: none;
    }
    .top-gold-bar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 10px;
      background: linear-gradient(90deg, #B87B06 0%, #E8A514 50%, #F7C948 100%);
      z-index: 20;
    }

    /* RIGHT COLUMN: BRAND & ARABIC TYPOGRAPHY (630px wide) */
    .right-col {
      position: relative;
      z-index: 10;
      width: 635px;
      padding: 42px 48px 38px 28px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: right;
    }
    .brand-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .logo-img {
      height: 66px;
      width: auto;
      object-fit: contain;
      filter: drop-shadow(0 6px 16px rgba(0,0,0,0.45));
    }
    .en-badge {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 13px;
      font-weight: 900;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      background: #E8A514;
      color: #18110C;
      padding: 9px 18px;
      border-radius: 999px;
      box-shadow: 0 8px 20px rgba(232, 165, 20, 0.3);
    }

    .headline-block {
      margin-top: 8px;
      margin-bottom: auto;
      padding-top: 14px;
    }
    .title-line-1 {
      font-size: 46px;
      font-weight: 900;
      line-height: 1.18;
      color: #FFFFFF;
      letter-spacing: -0.01em;
    }
    .title-line-2 {
      font-size: 46px;
      font-weight: 900;
      line-height: 1.18;
      color: #E8A514;
      letter-spacing: -0.01em;
      margin-top: 2px;
    }
    .subtitle {
      margin-top: 14px;
      font-size: 20px;
      font-weight: 700;
      line-height: 1.5;
      color: #EDE0CC;
      max-width: 555px;
    }

    .pills-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 22px;
    }
    .pill {
      background: rgba(232, 165, 20, 0.14);
      border: 1.5px solid rgba(232, 165, 20, 0.5);
      color: #FCE694;
      padding: 7px 16px;
      border-radius: 999px;
      font-size: 15px;
      font-weight: 800;
    }

    .footer-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding-top: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.14);
    }
    .hotline-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #E8A514;
      color: #18110C;
      padding: 8px 18px;
      border-radius: 999px;
      font-size: 16px;
      font-weight: 900;
      white-space: nowrap;
      flex-shrink: 0;
      box-shadow: 0 8px 24px rgba(232, 165, 20, 0.3);
    }
    .hotline-num {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 900;
      letter-spacing: 0.03em;
    }
    .domain-pill {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 14px;
      font-weight: 800;
      color: #E8A514;
      background: rgba(255, 255, 255, 0.07);
      border: 1px solid rgba(232, 165, 20, 0.35);
      padding: 8px 16px;
      border-radius: 999px;
      white-space: nowrap;
    }

    /* LEFT COLUMN: VISUAL STAGE (565px wide) */
    .left-col {
      position: relative;
      z-index: 10;
      width: 565px;
      padding: 42px 24px 38px 44px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    /* Standard Photo Stage */
    .photo-stage {
      display: flex;
      flex-direction: column;
      gap: 14px;
      height: 100%;
    }
    .main-photo-frame {
      position: relative;
      flex: 1;
      border-radius: 28px;
      overflow: hidden;
      border: 3px solid #E8A514;
      box-shadow: 0 24px 50px rgba(0, 0, 0, 0.65);
      background: #18110C;
    }
    .main-photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .photo-gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(24,17,12,0.75) 0%, transparent 50%);
    }
    .floating-top-pill {
      position: absolute;
      top: 16px;
      right: 16px;
      background: rgba(24, 17, 12, 0.9);
      border: 1.5px solid #E8A514;
      color: #FFFFFF;
      padding: 7px 14px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 10px 24px rgba(0,0,0,0.45);
    }
    .floating-top-pill .dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #E8A514;
    }
    .sub-thumbs-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      height: 132px;
    }
    .sub-thumb-card {
      position: relative;
      border-radius: 20px;
      overflow: hidden;
      border: 2px solid rgba(232, 165, 20, 0.55);
      background: #18110C;
      box-shadow: 0 14px 30px rgba(0,0,0,0.45);
    }
    .sub-thumb-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .sub-thumb-card span {
      position: absolute;
      inset-inline: 0;
      bottom: 0;
      background: linear-gradient(to top, rgba(24,17,12,0.92), transparent);
      color: #FCE694;
      font-size: 13px;
      font-weight: 800;
      padding: 18px 12px 7px;
      text-align: center;
    }

    /* Menu Interactive Cards Stage */
    .menu-stage {
      display: flex;
      flex-direction: column;
      gap: 12px;
      justify-content: center;
      height: 100%;
    }
    .menu-card {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      gap: 14px;
      background: #FAF6EC;
      color: #18110C;
      padding: 11px 14px;
      border-radius: 22px;
      border: 2px solid #E8A514;
      box-shadow: 0 16px 32px rgba(0, 0, 0, 0.45);
    }
    .menu-thumb {
      width: 82px;
      height: 82px;
      border-radius: 16px;
      object-fit: cover;
      border: 2px solid #18110C;
      flex-shrink: 0;
    }
    .menu-meta {
      flex: 1;
      text-align: right;
    }
    .menu-tag {
      display: inline-block;
      background: #FDF2CE;
      color: #8C5A08;
      font-size: 11px;
      font-weight: 900;
      padding: 2px 9px;
      border-radius: 999px;
      margin-bottom: 3px;
    }
    .menu-tag.gold {
      background: #18110C;
      color: #E8A514;
    }
    .menu-name {
      font-size: 18px;
      font-weight: 900;
      color: #18110C;
      line-height: 1.2;
    }
    .menu-desc {
      font-size: 12px;
      font-weight: 700;
      color: #5C4938;
      margin-top: 3px;
    }
    .menu-price {
      background: #18110C;
      color: #E8A514;
      font-size: 15px;
      font-weight: 900;
      padding: 8px 13px;
      border-radius: 14px;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .qr-floating-badge {
      display: flex;
      align-items: center;
      gap: 14px;
      background: rgba(232, 165, 20, 0.16);
      border: 2px solid #E8A514;
      border-radius: 20px;
      padding: 11px 16px;
      margin-top: 2px;
    }
    .qr-mini-box {
      width: 46px;
      height: 46px;
      border-radius: 13px;
      background: #E8A514;
      display: grid;
      place-items: center;
      flex-shrink: 0;
    }
    .qr-mini-box svg {
      width: 28px;
      height: 28px;
    }
    .qr-mini-title {
      font-size: 16px;
      font-weight: 900;
      color: #FFFFFF;
    }
    .qr-mini-sub {
      font-size: 12px;
      font-weight: 700;
      color: #FCE694;
    }
  </style>
</head>
<body>
  <div class="canvas">
    <div class="top-gold-bar"></div>
    <div class="pattern-overlay"></div>
    <div class="gold-diagonal-accent"></div>

    <!-- RIGHT SIDE: BRAND & ARABIC HEADLINE -->
    <div class="right-col" dir="rtl">
      <div class="brand-header">
        <img src="${logoHorizUri}" class="logo-img" alt="الياسمين" />
        <span class="en-badge" dir="ltr">${badgeEn}</span>
      </div>

      <div class="headline-block">
        <div class="title-line-1">${titleLine1}</div>
        <div class="title-line-2">${titleLine2}</div>
        <p class="subtitle">${subtitleAr}</p>
      </div>

      <div class="pills-row">
        ${pills.map((p) => `<span class="pill">${p}</span>`).join("")}
      </div>

      <div class="footer-bar">
        <div class="hotline-pill">
          <span>اطلب الآن:</span>
          <span class="hotline-num" dir="ltr">01010400507</span>
        </div>
        <div class="domain-pill" dir="ltr">${urlLabel}</div>
      </div>
    </div>

    <!-- LEFT SIDE: VISUAL SHOWCASE -->
    <div class="left-col">
      ${leftShowcaseHtml}
    </div>
  </div>
</body>
</html>`;
}

const OG_CONFIGS = [
  {
    file: "og-image.jpg",
    mode: "standard",
    badgeEn: "SYRIAN CUISINE • CAIRO",
    titleLine1: "مطعم الياسمين السوري",
    titleLine2: "أصالة المذاق الدمشقي",
    subtitleAr:
      "شاورما عالصاج بالتتبيلة الأصلية، مشاوي شامية عالفحم، فتات بالسمن البلدي، وبروستد سوري مقرمش.",
    pills: ["شاورما عالصاج", "مشاوي عالفحم", "فتات بالسمن البلدي", "توصيل سريع"],
    urlLabel: "alyasmin.chameleon.vision",
    mainPhoto: "images/hero/hero-shawarma-arabi.webp",
    subPhoto1: "images/hero/hero-mixed-grill.webp",
    subPhoto2: "images/hero/hero-fatteh-shawarma.webp",
  },
  {
    file: "og-menu.jpg",
    mode: "menu",
    badgeEn: "DIGITAL MENU & QR",
    titleLine1: "منيو الياسمين الكامل",
    titleLine2: "تصفح الأصناف والأسعار",
    subtitleAr:
      "اختر وجبتك المفضلة من الشاورما والمشاوي والفتات والمقبلات الشامية واطلب أونلاين أو عبر واتساب مباشرة.",
    pills: ["شاورما صاج وعربي", "مشاوي وفروج", "فتات دمشقية", "مقبلات شامية"],
    urlLabel: "alyasmin.chameleon.vision/menu",
    mainPhoto: "images/products/shawarma-arabi-chicken.webp",
    subPhoto1: "images/products/mixed-grill-syrian.webp",
    subPhoto2: "images/products/fatteh-shawarma-mix.webp",
  },
  {
    file: "og-offers.jpg",
    mode: "standard",
    badgeEn: "FAMILY BOXES & OFFERS",
    titleLine1: "عروض وبوكسات الياسمين",
    titleLine2: "ولائم توفير للعيلة والصحاب",
    subtitleAr:
      "بوكسات الشاورما العربي، صواني المشاوي المشكلة، ووجبات البروستد العائلية مع التوميه والمخلل والبطاطس.",
    pills: ["بوكس التوفير", "وجبات عائلية", "صواني اللمة", "خصومات يومية"],
    urlLabel: "alyasmin.chameleon.vision/offers",
    mainPhoto: "images/products/family-shawarma-box.webp",
    subPhoto1: "images/products/broast-family-meal.webp",
    subPhoto2: "images/products/shawarma-arabi-mix.webp",
  },
  {
    file: "og-delivery.jpg",
    mode: "standard",
    badgeEn: "FAST CAIRO DELIVERY",
    titleLine1: "مناطق التوصيل والطلب",
    titleLine2: "سخن وطازج لحد باب بيتك",
    subtitleAr:
      "تغطية سريعة لجميع مناطق القاهرة عبر أسطول توصيل الياسمين المباشر مع تغليف حراري يحفظ القرمشة.",
    pills: ["توصيل سريع", "تغليف حراري", "طلب أونلاين", "واتساب مباشر"],
    urlLabel: "alyasmin.chameleon.vision/delivery",
    mainPhoto: "images/products/shawarma-chicken-saj.webp",
    subPhoto1: "images/products/shawarma-beef-saj.webp",
    subPhoto2: "images/products/maria-shawarma.webp",
  },
  {
    file: "og-occasions.jpg",
    mode: "standard",
    badgeEn: "SYRIAN BANQUETS & CATERING",
    titleLine1: "ولائم العزومات والمناسبات",
    titleLine2: "سفرة شامية تشرّفك قدام ضيوفك",
    subtitleAr:
      "صواني ولائم الياسمين للمناسبات والتجمعات العائلية والشركات — مشاوي عالفحم وشاورما وفتات ومقبلات.",
    pills: ["صواني العزومات", "حفلات وشركات", "تجهيز خاص", "حجز مسبق"],
    urlLabel: "alyasmin.chameleon.vision/occasions",
    mainPhoto: "images/products/walima-syrian-tray.webp",
    subPhoto1: "images/products/kabab-halabi.webp",
    subPhoto2: "images/products/kibbeh-shamiya.webp",
  },
  {
    file: "og-about.jpg",
    mode: "standard",
    badgeEn: "OUR DAMASCENE STORY",
    titleLine1: "حكاية مطعم الياسمين",
    titleLine2: "سر التتبيلة الشامية الأصيلة",
    subtitleAr:
      "من شوارع دمشق العتيقة إلى قلب القاهرة — نقدم المطبخ السوري الأصيل بأجود اللحوم الطازجة يومياً.",
    pills: ["تتبيلة 24 ساعة", "خبز صاج طازج", "ثومية أصلية", "47K+ متابع"],
    urlLabel: "alyasmin.chameleon.vision/about",
    mainPhoto: "images/hero/hero-mixed-grill.webp",
    subPhoto1: "images/products/hummus-beiruti.webp",
    subPhoto2: "images/products/vine-leaves-syrian.webp",
  },
  {
    file: "og-contact.jpg",
    mode: "standard",
    badgeEn: "ORDER & CONTACT US",
    titleLine1: "تواصل مع مطعم الياسمين",
    titleLine2: "خدمة العملاء والطلب المباشر",
    subtitleAr:
      "اطلب مباشرة عبر الهاتف أو واتساب 01010400507 — فريقنا جاهز لخدمتك وتجهيز طلبك يومياً.",
    pills: ["01010400507", "طلب واتساب", "فيسبوك الرسمي", "خدمة يومية"],
    urlLabel: "alyasmin.chameleon.vision/contact",
    mainPhoto: "images/hero/hero-fatteh-shawarma.webp",
    subPhoto1: "images/products/shish-tawook-grill.webp",
    subPhoto2: "images/products/sambousek-mix.webp",
  },
];

async function generateOgImages() {
  const browserPath = findBrowserPath();
  console.log("Using headless browser:", browserPath);

  const logoHorizUri = toDataUri("logo-horizontal-shadow.png");
  const emblemUri = toDataUri("logo-emblem.png");
  const patternUri = toDataUri("images/shawarma-pattern-gold.webp");

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "alyasmin-og-"));

  for (const cfg of OG_CONFIGS) {
    const html = buildOgHtml({
      ...cfg,
      mainPhotoUri: toDataUri(cfg.mainPhoto),
      subPhoto1Uri: toDataUri(cfg.subPhoto1),
      subPhoto2Uri: toDataUri(cfg.subPhoto2),
      logoHorizUri,
      emblemUri,
      patternUri,
    });

    const htmlPath = path.join(tmpDir, `${cfg.file}.html`);
    const pngPath = path.join(tmpDir, `${cfg.file}.png`);
    const outJpgPath = path.join(PUB, cfg.file);

    fs.writeFileSync(htmlPath, html, "utf8");

    execFileSync(
      browserPath,
      [
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--force-device-scale-factor=1",
        "--window-size=1200,630",
        `--screenshot=${pngPath}`,
        `file:///${htmlPath.replace(/\\/g, "/")}`,
      ],
      { stdio: "ignore" }
    );

    await sharp(pngPath)
      .resize(1200, 630, { fit: "cover" })
      .jpeg({ quality: 92, mozjpeg: true })
      .toFile(outJpgPath);

    console.log(`✔ Rendered ${cfg.file} (1200x630)`);
  }

  // Also copy og-image.jpg to src/app/opengraph-image.jpg and twitter-image.jpg if needed
  fs.copyFileSync(path.join(PUB, "og-image.jpg"), path.join(PUB, "opengraph-image.jpg"));
}

await generateFavicons();
await generateOgImages();
console.log("All Alyasmin favicons & OG preview images generated!");
