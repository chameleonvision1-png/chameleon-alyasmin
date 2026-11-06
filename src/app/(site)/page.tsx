import Link from "next/link";
import { publicDB } from "@/lib/db";
import LomoraHero from "@/components/LomoraHero";
import TheEditShowcase from "@/components/TheEditShowcase";
import ChessboardBento from "@/components/ChessboardBento";
import StoryGallery from "@/components/StoryGallery";

export default async function HomePage() {
  const data = await publicDB();
  const available = data.products.filter((p) => p.isAvailable);
  const featuredEdit = available.filter((p) => p.isBestSeller);

  const marqueeItems = [
    "شاورما عالصاج بالتتبيلة الدمشقية",
    "مشاوي شامية على الفحم",
    "فتات بالسمن البلدي والمكسرات",
    "ثومية سورية وعيش صاج طازج",
    "ولائم العيلة واللمة الحلوة",
    "طعم الشام الأصيل في كل لقمة",
  ];

  return (
    <div className="bg-white w-full max-w-full overflow-x-hidden">
      {/* =====================================================================
          1. LOMORA SPLIT-STAGE ATMOSPHERIC HERO (Web & Mobile)
             Alyasmin Original Golden-Yellow (#E8A514) + Shawarma Pattern
         ===================================================================== */}
      <LomoraHero />

      {/* =====================================================================
          2. "THE EDIT / مختارات الياسمين" — STAGGERED 3-CARD STAIRCASE SHOWCASE
             Matches `media_1793973652900_eb509023.jpg` & `media_1793973612494_4b9ff1ed.jpg`
         ===================================================================== */}
      <TheEditShowcase products={featuredEdit.length >= 3 ? featuredEdit : available} />

      {/* =====================================================================
          3A. MARQUEE STRIP (`Designed to Be Lived With ✦` from LOMORA)
         ===================================================================== */}
      <div className="w-full max-w-full bg-[#18110C] text-white py-3.5 border-y border-[#E8A514]/25 overflow-hidden">
        <div className="lomora-marquee-track flex items-center gap-7 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((text, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-7 text-xs sm:text-sm font-extrabold tracking-wide text-[#FFFDF7]"
            >
              <span>{text}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-emblem.png"
                alt=""
                aria-hidden="true"
                className="w-4 h-4 object-contain opacity-90 shrink-0"
              />
            </span>
          ))}
        </div>
      </div>

      {/* =====================================================================
          3B. 2-COLUMN EDITORIAL STORY SECTION ("Objects That Shape Everyday Living")
              Matches `media_1793973652900_eb509023.jpg` (Web) & `media_1793973612494_4b9ff1ed.jpg` (Mobile)
         ===================================================================== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Editorial Text Column (Heading + 3 clean paragraphs — exact LOMORA structure) */}
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black text-[#18110C] leading-tight">
              أطباق تُشكّل
              <br />
              دفء اللمة اليومية
            </h2>

            <div className="space-y-3.5 text-xs sm:text-sm text-[#292929]/75 leading-relaxed max-w-lg">
              <p>
                نصنع أكلاتنا السورية يومياً لتكون جزءاً دافئاً من لمة العيلة والأصحاب. بفضل البساطة، الإتقان، والجودة الثابتة، صممنا كل صنف في منيو الياسمين ليكمّل إيقاع يومك بأشهى مذاق شامي.
              </p>
              <p>
                بدلاً من الطرق السريعة، نركز على الوصفات الدمشقية الأصيلة والمكونات المختارة بعناية: شاورما عالصاج متبلة ٢٤ ساعة، مشاوي شامية على الفحم، وفتات بالسمن البلدي تمنح سفرتك الدفء والتوازن.
              </p>
              <p>
                لأن الأكل السوري الأصيل لا يحتاج إلى مبالغة — بل يُعرف من أول لقمة.
              </p>
            </div>
          </div>

          {/* Interactive Swipeable & Auto-Sliding Culinary Carousel */}
          <div className="lg:col-span-6">
            <StoryGallery />
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. 8-CELL CHESSBOARD BENTO MOSAIC GRID (6 Photos + 2 Yellow-Cream Quote Tiles)
             Matches `media_1793973639351_06794481.jpg` (Web) & `media_1793973600701_ff99753a.jpg` (Mobile)
         ===================================================================== */}
      <ChessboardBento />

      {/* =====================================================================
          5. FLOATING WHITE CARD ON ALYASMIN GOLDEN SHAWARMA PATTERN BACKDROP
             Matches "A Letter Worth Keeping." in `media_1793973639351_06794481.jpg` (Web)
             & `media_1793973600701_ff99753a.jpg` (Mobile)
         ===================================================================== */}
      <section
        className="relative w-full py-12 sm:py-20 px-4 sm:px-8 my-6 bg-[#E8A514] overflow-hidden"
        style={{
          backgroundImage: 'url("/images/shawarma-pattern-gold.webp")',
          backgroundSize: "460px 460px",
        }}
      >
        <div className="relative z-10 mx-auto max-w-4xl bg-white rounded-[24px] sm:rounded-[30px] p-4 sm:p-6 lg:p-7 shadow-[0_24px_60px_-15px_rgba(24,17,12,0.3)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
            {/* Square Dish Image Column (Top on Mobile, Side on Desktop — Exact match to LOMORA reference) */}
            <div className="lg:col-span-6">
              <div className="relative aspect-square rounded-[18px] sm:rounded-[20px] overflow-hidden bg-[#23170E]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero/family-feast-box.webp"
                  alt="وليمة الياسمين العائلية"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content Column (2-Line Title + 3-Line Paragraph + 1 Solid Rectangular Button) */}
            <div className="lg:col-span-6 flex flex-col justify-between py-2 space-y-5 text-right">
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-black text-[#18110C] leading-tight">
                  لمة العيلة
                  <br />
                  تبدأ من هنا.
                </h2>

                <p className="text-xs sm:text-sm text-[#292929]/75 leading-relaxed max-w-sm">
                  استمتع بأقوى عروض وبوكسات مطعم الياسمين — شاورما عالصاج، مشاوي عالفحم، وفتات دمشقية بالسمن البلدي تجهز طازجة وتوصلك سخنة في كل أنحاء القاهرة.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/menu"
                  className="inline-block rounded-lg bg-[#18110C] hover:bg-[#E8A514] text-white hover:text-[#18110C] font-black text-xs sm:text-sm px-8 py-3.5 transition shadow-sm"
                >
                  اطلب الآن من المنيو
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
