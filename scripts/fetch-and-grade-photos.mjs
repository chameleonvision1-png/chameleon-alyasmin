import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const PUBLIC_DIR = "E:/Projects/Chameleon-Alyasmin/public/images";
fs.mkdirSync(path.join(PUBLIC_DIR, "products"), { recursive: true });
fs.mkdirSync(path.join(PUBLIC_DIR, "hero"), { recursive: true });

// Verified high-resolution culinary photography URLs (Shawarma, Levantine Grills, Mezze, Rice/Fatteh, Wraps, Platters)
const PHOTO_JOBS = [
  // Hero & Showcase images
  {
    out: "hero/hero-shawarma-arabi.webp",
    w: 1000,
    h: 1200,
    urls: [
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    out: "hero/hero-mixed-grill.webp",
    w: 1000,
    h: 1200,
    urls: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    out: "hero/hero-fatteh-shawarma.webp",
    w: 1000,
    h: 1200,
    urls: [
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    out: "hero/story-syrian-table.webp",
    w: 1000,
    h: 900,
    urls: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    out: "hero/family-feast-box.webp",
    w: 900,
    h: 900,
    urls: [
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=85",
    ],
  },
  {
    out: "hero/warm-drape-backdrop.webp",
    w: 1400,
    h: 900,
    urls: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1400&q=85",
    ],
  },
  // Products
  {
    out: "products/shawarma-chicken-saj.webp",
    w: 800,
    h: 800,
    urls: [
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    out: "products/shawarma-beef-saj.webp",
    w: 800,
    h: 800,
    urls: [
      "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    out: "products/shawarma-arabi-chicken.webp",
    w: 800,
    h: 800,
    urls: [
      "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    out: "products/shawarma-arabi-mix.webp",
    w: 800,
    h: 800,
    urls: [
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    out: "products/maria-shawarma.webp",
    w: 800,
    h: 800,
    urls: [
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    out: "products/mixed-grill-syrian.webp",
    w: 800,
    h: 800,
    urls: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    out: "products/shish-tawook-grill.webp",
    w: 800,
    h: 800,
    urls: [
      "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    out: "products/kabab-halabi.webp",
    w: 800,
    h: 800,
    urls: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    out: "products/charcoal-chicken.webp",
    w: 800,
    h: 800,
    urls: [
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    out: "products/fatteh-chicken.webp",
    w: 800,
    h: 800,
    urls: [
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    out: "products/fatteh-beef.webp",
    w: 800,
    h: 800,
    urls: [
      "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    out: "products/fatteh-crispy.webp",
    w: 800,
    h: 800,
    urls: [
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    out: "products/fatteh-hummus.webp",
    w: 800,
    h: 800,
    urls: [
      "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    out: "products/hummus-beiruti.webp",
    w: 800,
    h: 800,
    urls: [
      "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    out: "products/mutabbal-baba.webp",
    w: 800,
    h: 800,
    urls: [
      "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    out: "products/kibbeh-shamiya.webp",
    w: 800,
    h: 800,
    urls: [
      "https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    out: "products/vine-leaves-syrian.webp",
    w: 800,
    h: 800,
    urls: [
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    out: "products/sambousek-mix.webp",
    w: 800,
    h: 800,
    urls: [
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    out: "products/zinger-supreme-syrian.webp",
    w: 800,
    h: 800,
    urls: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    out: "products/crispy-strips-wrap.webp",
    w: 800,
    h: 800,
    urls: [
      "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    out: "products/fajita-syrian-sub.webp",
    w: 800,
    h: 800,
    urls: [
      "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    out: "products/family-shawarma-box.webp",
    w: 800,
    h: 800,
    urls: [
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    out: "products/walima-syrian-tray.webp",
    w: 800,
    h: 800,
    urls: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    out: "products/broast-family-meal.webp",
    w: 800,
    h: 800,
    urls: [
      "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=900&q=85",
    ],
  },
];

async function fetchBuffer(urls) {
  for (const u of urls) {
    try {
      const res = await fetch(u, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (res.ok) {
        return Buffer.from(await res.arrayBuffer());
      }
    } catch {
      // try next
    }
  }
  return null;
}

async function main() {
  for (const job of PHOTO_JOBS) {
    const dest = path.join(PUBLIC_DIR, job.out);
    const buf = await fetchBuffer(job.urls);
    if (buf) {
      await sharp(buf)
        .resize(job.w, job.h, { fit: "cover", position: "attention" })
        .modulate({ brightness: 1.02, saturation: 1.08 })
        .webp({ quality: 86 })
        .toFile(dest);
      console.log("Saved", job.out);
    } else {
      console.warn("Fallback generated for", job.out);
      await sharp({
        create: { width: job.w, height: job.h, channels: 3, background: { r: 231, g: 165, b: 20 } },
      })
        .webp({ quality: 86 })
        .toFile(dest);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
