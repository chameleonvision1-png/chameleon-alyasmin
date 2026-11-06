import sharp from "sharp";
import path from "node:path";

const PUBLIC_DIR = "E:/Projects/Chameleon-Alyasmin/public";

const PAGES = [
  {
    out: "og-image.jpg",
    titleAr: "أصالة المذاق السوري في كل طبق",
    subtitleAr: "شاورما عالصاج • مشاوي شامية ع الفحم • فتات دمشقية • مقبلات أصلية",
    tagEn: "ALYASMIN SYRIAN CUISINE • CAIRO",
    foodImg: "images/hero/hero-shawarma-arabi.webp",
  },
  {
    out: "og-menu.jpg",
    titleAr: "المنيو السوري الكامل — طعم الشام على أصوله",
    subtitleAr: "تصفح الشاورما، المشاوي، البروستد، الفتات، وصواني اللمة",
    tagEn: "FULL MENU • SHAWARMA & GRILLS",
    foodImg: "images/hero/hero-mixed-grill.webp",
  },
  {
    out: "og-offers.jpg",
    titleAr: "عروض الياسمين وبوكسات اللمة العائلية",
    subtitleAr: "أقوى عروض التوفير للعيلة والصحاب مع توصيل سريع في القاهرة",
    tagEn: "SPECIAL OFFERS & FAMILY BOXES",
    foodImg: "images/hero/family-feast-box.webp",
  },
  {
    out: "og-delivery.jpg",
    titleAr: "توصيل سريع لكل مناطق القاهرة الكبرى",
    subtitleAr: "اطلب أكلك السوري المفضل دلوقتي: 01010400507",
    tagEn: "FAST DELIVERY • 01010400507",
    foodImg: "images/products/shawarma-arabi-mix.webp",
  },
  {
    out: "og-occasions.jpg",
    titleAr: "صواني اللمة والعزومات السورية الفاخرة",
    subtitleAr: "تجهيز كامل للعزومات والمناسبات بأشهى المشاوي والشاورما",
    tagEn: "CATERING & FAMILY FEASTS",
    foodImg: "images/products/walima-syrian-tray.webp",
  },
  {
    out: "og-about.jpg",
    titleAr: "حكاية الياسمين — أصالة المطبخ الدمشقي",
    subtitleAr: "نفس سوري أصيل وخامات طازجة يومياً لعشاق الأكل الشامي",
    tagEn: "OUR STORY • DAMASCENE HERITAGE",
    foodImg: "images/hero/story-syrian-table.webp",
  },
  {
    out: "og-contact.jpg",
    titleAr: "تواصل مع مطعم الياسمين للمأكولات السورية",
    subtitleAr: "الهاتف والواتساب: 01010400507 • القاهرة، مصر",
    tagEn: "CONTACT US • CAIRO, EGYPT",
    foodImg: "images/hero/hero-fatteh-shawarma.webp",
  },
];

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function generateOg(page) {
  const width = 1200;
  const height = 630;

  // 1. Base Golden-Yellow Shawarma Pattern background (`shawarma-pattern-gold.webp`)
  const patternBg = await sharp(path.join(PUBLIC_DIR, "images/shawarma-pattern-gold.webp"))
    .resize(width, height, { fit: "cover" })
    .toBuffer();

  // 2. Left-side Food Stage Card (490x530 rounded card)
  const foodCard = await sharp(path.join(PUBLIC_DIR, page.foodImg))
    .resize(490, 530, { fit: "cover" })
    .composite([
      {
        input: Buffer.from(
          `<svg width="490" height="530" xmlns="http://www.w3.org/2000/svg">
            <rect width="490" height="530" rx="34" fill="#000"/>
          </svg>`
        ),
        blend: "dest-in",
      },
      {
        input: Buffer.from(
          `<svg width="490" height="530" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="486" height="526" rx="32" fill="none" stroke="#FFFFFF" stroke-width="5"/>
          </svg>`
        ),
      },
    ])
    .png()
    .toBuffer();

  // 3. Official White + Shadowed Horizontal Logo (`logo-horizontal-shadow.png`)
  const logoH = await sharp(path.join(PUBLIC_DIR, "logo-horizontal-shadow.png"))
    .resize(390, 145, { fit: "inside" })
    .png()
    .toBuffer();

  // 4. Typography SVG overlay
  const textSvg = Buffer.from(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- Outer Frame -->
      <rect x="22" y="22" width="${width - 44}" height="${height - 44}" rx="32" fill="none" stroke="#18110C" stroke-opacity="0.2" stroke-width="2"/>

      <!-- Dark Pill Tag -->
      <rect x="850" y="230" width="290" height="38" rx="19" fill="#18110C"/>
      <text x="995" y="254" text-anchor="middle" fill="#E8A514" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="800" letter-spacing="1.5">${escapeXml(page.tagEn)}</text>

      <!-- Main Arabic Title with crisp shadow -->
      <text x="1142" y="344" text-anchor="start" direction="rtl" fill="#18110C" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="40" font-weight="900">${escapeXml(page.titleAr)}</text>
      <text x="1140" y="341" text-anchor="start" direction="rtl" fill="#FFFFFF" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="40" font-weight="900">${escapeXml(page.titleAr)}</text>

      <!-- Arabic Subtitle -->
      <text x="1140" y="402" text-anchor="start" direction="rtl" fill="#18110C" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="22" font-weight="800">${escapeXml(page.subtitleAr)}</text>

      <!-- Bottom Contact Pill -->
      <rect x="820" y="485" width="320" height="58" rx="29" fill="#18110C"/>
      <text x="980" y="522" text-anchor="middle" fill="#E8A514" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="23" font-weight="900">اطلب الآن: 01010400507</text>

      <!-- Domain -->
      <text x="690" y="520" text-anchor="middle" fill="#18110C" font-family="Segoe UI, Arial, sans-serif" font-size="19" font-weight="800">alyasmin.chameleon.vision</text>
    </svg>`
  );

  const outPath = path.join(PUBLIC_DIR, page.out);
  await sharp(patternBg)
    .composite([
      { input: foodCard, left: 48, top: 50 },
      { input: logoH, left: 750, top: 58 },
      { input: textSvg, left: 0, top: 0 },
    ])
    .jpeg({ quality: 92 })
    .toFile(outPath);

  console.log(`Generated ${page.out}`);
}

async function main() {
  for (const p of PAGES) {
    await generateOg(p);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
