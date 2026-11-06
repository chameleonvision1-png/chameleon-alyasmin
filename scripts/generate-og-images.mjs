import sharp from "sharp";
import path from "node:path";

const PUBLIC_DIR = "E:/Projects/Chameleon-Alyasmin/public";

const OG_PAGES = [
  {
    file: "og-image.jpg",
    tagEn: "ALYASMIN SYRIAN CUISINE • CAIRO",
    titleAr: "مطعم الياسمين الدمشقي",
    subAr: "أصالة المذاق السوري في كل طبق • شاورما • مشاوي • فتات • مقبلات",
    photo: path.join(PUBLIC_DIR, "images/hero/hero-shawarma-arabi.webp"),
  },
  {
    file: "og-menu.jpg",
    tagEn: "FULL DAMASCENE MENU • ALYASMIN",
    titleAr: "منيو الياسمين الكامل",
    subAr: "شاورما عالصاج • مشاوي شامي عالفحم • فتات بالسمن البلدي • مقبلات سورية",
    photo: path.join(PUBLIC_DIR, "images/products/shawarma-arabi-mix.webp"),
  },
  {
    file: "og-offers.jpg",
    tagEn: "EXCLUSIVE OFFERS &amp; BUNDLES",
    titleAr: "عروض وبوكسات الياسمين",
    subAr: "أقوى عروض التوفير وبوكسات الشاورما والمشاوي لجمعة العيلة والصحاب",
    photo: path.join(PUBLIC_DIR, "images/products/family-shawarma-box.webp"),
  },
  {
    file: "og-delivery.jpg",
    tagEn: "FAST DELIVERY IN CAIRO • 01010400507",
    titleAr: "التوصيل والطلب السريع",
    subAr: "اطلب الآن أونلاين أو عبر واتساب وتليفون: 01010400507 — يوصلك سخن وطازج",
    photo: path.join(PUBLIC_DIR, "images/hero/hero-mixed-grill.webp"),
  },
  {
    file: "og-occasions.jpg",
    tagEn: "FAMILY FEASTS &amp; GATHERINGS",
    titleAr: "صواني اللّمة والعزومات",
    subAr: "صواني شاورما ومشاوي وفتات دمشقية مجهزة للعزومات والمناسبات العائلية",
    photo: path.join(PUBLIC_DIR, "images/products/walima-syrian-tray.webp"),
  },
  {
    file: "og-about.jpg",
    tagEn: "OUR DAMASCENE HERITAGE",
    titleAr: "حكاية الياسمين الدمشقي",
    subAr: "طعم الشام في كل لقمة — تتبيلات سورية عريقة وكرم ضيافة أصيل في القاهرة",
    photo: path.join(PUBLIC_DIR, "images/hero/story-syrian-table.webp"),
  },
  {
    file: "og-contact.jpg",
    tagEn: "GET IN TOUCH • ALYASMIN CAIRO",
    titleAr: "تواصل مع مطعم الياسمين",
    subAr: "الهاتف والطلبات: 01010400507 • القاهرة، مصر",
    photo: path.join(PUBLIC_DIR, "images/hero/hero-fatteh-shawarma.webp"),
  },
];

async function main() {
  const goldPatternPath = path.join(PUBLIC_DIR, "images/shawarma-pattern-gold.webp");
  const logoHorizWhite = await sharp(path.join(PUBLIC_DIR, "logo-horizontal.png"))
    .resize(340, 113, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  for (const page of OG_PAGES) {
    // Prepare background (1200x630) from gold shawarma pattern
    const bgBuf = await sharp(goldPatternPath).resize(1200, 630, { fit: "cover" }).toBuffer();

    // Prepare dish image (420x510 rounded rectangle)
    const dishMask = Buffer.from(
      `<svg width="420" height="510"><rect x="0" y="0" width="420" height="510" rx="28" ry="28" fill="#fff"/></svg>`
    );
    const dishBuf = await sharp(page.photo)
      .resize(420, 510, { fit: "cover" })
      .composite([{ input: dishMask, blend: "dest-in" }])
      .png()
      .toBuffer();

    // Dark LOMORA editorial card overlay SVG (1120x550 centered at 40,40)
    const cardSvg = Buffer.from(
      `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="darkCard" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#18110C"/>
            <stop offset="100%" stop-color="#241911"/>
          </linearGradient>
        </defs>
        <!-- Outer dark editorial card -->
        <rect x="36" y="36" width="1128" height="558" rx="36" ry="36" fill="url(#darkCard)" stroke="#E8A818" stroke-width="2" stroke-opacity="0.45"/>
        <!-- Tag pill -->
        <rect x="520" y="235" width="585" height="38" rx="19" ry="19" fill="#E8A818" fill-opacity="0.16" stroke="#E8A818" stroke-opacity="0.45"/>
        <text x="812" y="260" text-anchor="middle" fill="#E8A818" font-family="Arial, sans-serif" font-size="15" font-weight="bold" letter-spacing="2">${page.tagEn}</text>
        <!-- Main Arabic Title -->
        <text x="1105" y="345" text-anchor="start" direction="rtl" fill="#FFFFFF" font-family="Tahoma, Arial, sans-serif" font-size="48" font-weight="bold">${page.titleAr}</text>
        <!-- Subtitle -->
        <text x="1105" y="405" text-anchor="start" direction="rtl" fill="#FAF6EC" fill-opacity="0.85" font-family="Tahoma, Arial, sans-serif" font-size="21">${page.subAr}</text>
        <!-- Bottom Gold Pill CTA -->
        <rect x="785" y="455" width="320" height="58" rx="29" ry="29" fill="#E8A818"/>
        <text x="945" y="492" text-anchor="middle" direction="rtl" fill="#18110C" font-family="Tahoma, Arial, sans-serif" font-size="22" font-weight="bold">اطلب الآن • 01010400507</text>
        <!-- Domain label -->
        <text x="520" y="492" text-anchor="start" fill="#E8A818" font-family="Arial, sans-serif" font-size="18" font-weight="bold" letter-spacing="1">alyasmin.chameleon.vision</text>
      </svg>`
    );

    await sharp(bgBuf)
      .composite([
        { input: cardSvg, top: 0, left: 0 },
        { input: dishBuf, top: 60, left: 60 },
        { input: logoHorizWhite, top: 82, left: 765 },
      ])
      .jpeg({ quality: 90 })
      .toFile(path.join(PUBLIC_DIR, page.file));

    console.log("Generated OG image:", page.file);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
