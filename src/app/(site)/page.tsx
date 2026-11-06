import Link from "next/link";
import { publicDB } from "@/lib/db";
import LomoraHero from "@/components/LomoraHero";
import TheEditShowcase from "@/components/TheEditShowcase";
import ChessboardBento from "@/components/ChessboardBento";
import MenuClient from "@/components/MenuClient";
import OfferCard from "@/components/OfferCard";
import BranchesShowcase from "@/components/BranchesShowcase";
import { ArrowUpLeftIcon, JasmineDiamondIcon, PhoneIcon, StarIcon, WhatsAppIcon } from "@/components/icons";

export default async function HomePage() {
  const data = await publicDB();
  const available = data.products.filter((p) => p.isAvailable);
  const featuredEdit = available.filter((p) => p.isBestSeller);

  const marqueeItems = [
    "أصالة المذاق السوري في كل طبق",
    "طعم الشام في كل لقمة",
    "CRAFTED FOR WARM GATHERINGS",
    "أحلى أكل سوري على أصوله",
    "لمة العيلة تبدأ من هنا",
    "AUTHENTIC DAMASCENE HOSPITALITY",
  ];

  return (
    <>
      {/* =====================================================================
          1. LOMORA SPLIT-STAGE ATMOSPHERIC HERO (Web & Mobile)
         ===================================================================== */}
      <LomoraHero />

      {/* =====================================================================
          2. "THE EDIT / مختارات الياسمين" — STAGGERED 3-CARD SHOWCASE
         ===================================================================== */}
      <TheEditShowcase products={featuredEdit.length >= 3 ? featuredEdit : available} />

      {/* =====================================================================
          3. DARK WALNUT MARQUEE STRIP (`Designed to Be Lived With ✦` from LOMORA)
         ===================================================================== */}
      <div className="w-full bg-[#18110C] text-white py-3.5 sm:py-4 overflow-hidden border-y border-[#E8A818]/25">
        <div className="lomora-marquee-track flex items-center gap-8 whitespace-nowrap" dir="ltr">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((text, idx) => (
            <span key={idx} className="inline-flex items-center gap-8 text-xs sm:text-sm font-extrabold tracking-wide">
              <span className={/[A-Z]/.test(text) ? "font-en text-[#FAF6EC]/90" : "text-white"}>
                {text}
              </span>
              <JasmineDiamondIcon className="w-3.5 h-3.5 text-[#E8A818] shrink-0" />
            </span>
          ))}
        </div>
      </div>

      {/* =====================================================================
          4. EDITORIAL STORY SECTION ("Objects That Shape Everyday Living" -> "أطباق تصنع دفء اللمة اليومية")
          Matches `media_1793973612494_4b9ff1ed.jpg` & `media_1793973652900_eb509023.jpg` bottom
         ===================================================================== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Editorial Text Column */}
          <div className="lg:col-span-6 space-y-4">
            <div
              dir="ltr"
              className="font-en text-left lg:text-right text-xs font-extrabold tracking-[0.18em] text-[#A87508] uppercase"
            >
              DAMASCENE HERITAGE • SINCE DAY ONE
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-[#18110C] leading-tight">
              أطباق تُشكّل دفء اللمة اليومية — أصالة المطبخ السوري على أصوله.
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-[#292929]/80 leading-relaxed">
              <p>
                في مطعم الياسمين، نؤمن بأن الطعام السوري الأصيل ليس مجرد وجبة، بل هو طقس يومي يجمع العائلة والأصدقاء حول مائدة دافئة مليئة بالكرم والنكهات الغنية.
              </p>
              <p>
                بدلاً من الطرق السريعة، نتمسك بأسرار التتبيلة الدمشقية العريقة: شاورما متبلة لمدة 24 ساعة، مشاوي على الفحم الطبيعي، فتات مطشوشة بالسمن البلدي والمكسرات، وخبز صاج يُخبز طازجاً مع كل طلب.
              </p>
              <p className="font-extrabold text-[#5A3218]">
                لأن المذاق الأصيل لا يحتاج إلى مبالغة — بل يُعرف من أول لقمة.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/menu"
                className="rounded-full bg-[#18110C] hover:bg-[#2B1E15] text-white font-black text-xs px-6 py-3 transition"
              >
                استكشف المنيو الكامل
              </Link>
              <a
                href="tel:01010400507"
                className="rounded-full bg-[#FAF6EC] hover:bg-[#E8A818] border border-[#E8A818]/45 text-[#18110C] font-black text-xs px-5 py-3 inline-flex items-center gap-2 transition"
              >
                <PhoneIcon className="w-3.5 h-3.5 text-[#A87508]" />
                <span dir="ltr" className="font-en">01010400507</span>
              </a>
            </div>
          </div>

          {/* Warm Atmospheric Culinary Photograph (`rounded-[26px]` matching LOMORA lamp lifestyle photo) */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] sm:aspect-[5/4] rounded-[26px] sm:rounded-[32px] overflow-hidden bg-[#18110C] shadow-[0_22px_50px_-20px_rgba(24,17,12,0.28)] border border-[#18110C]/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero/story-syrian-table.webp"
                alt="سفرة مطعم الياسمين للمأكولات السورية"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18110C]/75 via-transparent to-transparent" />

              {/* Subtle Bottom Caption Bar */}
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo-emblem.png" alt="زهرة الياسمين" className="w-7 h-7 object-contain" />
                  <span className="text-xs sm:text-sm font-extrabold">طعم الشام في كل لقمة</span>
                </div>
                <span dir="ltr" className="font-en text-xs font-bold text-[#E8A818]">
                  47K+ Community
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. 8-CELL CHESSBOARD BENTO MOSAIC GRID (Photos + Cream Typography Tiles)
          Matches `media_1793973600701_ff99753a.jpg` & `media_1793973639351_06794481.jpg`
         ===================================================================== */}
      <ChessboardBento />

      {/* =====================================================================
          6. INTERACTIVE MENU PREVIEW (Horizontal Snap Carousel on Mobile / 2-Col on Desktop)
         ===================================================================== */}
      <section className="bg-[#FAF6EC]/70 border-y border-[#18110C]/8 py-12 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div
                dir="ltr"
                className="font-en text-left sm:text-right text-xs font-extrabold tracking-[0.18em] text-[#A87508] uppercase"
              >
                CURATED MENU • SYRIAN SPECIALTIES
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#18110C] mt-1">
                أشهر أطباق المنيو السوري
              </h2>
            </div>

            <Link
              href="/menu"
              className="self-start sm:self-auto inline-flex items-center gap-2.5 rounded-full bg-[#18110C] hover:bg-[#2B1E15] text-white pr-4 pl-1.5 py-1.5 text-xs font-extrabold transition"
            >
              <span>عرض المنيو بالكامل</span>
              <span className="w-7 h-7 rounded-full bg-[#E8A818] text-[#18110C] grid place-items-center">
                <ArrowUpLeftIcon className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>

          <MenuClient categories={data.categories} products={available} compactPreview />
        </div>
      </section>

      {/* =====================================================================
          7. CURRENT OFFERS & FAMILY BUNDLES
         ===================================================================== */}
      {data.offers.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-18 space-y-6">
          <div className="flex items-end justify-between gap-3">
            <div>
              <div
                dir="ltr"
                className="font-en text-left sm:text-right text-xs font-extrabold tracking-[0.18em] text-[#A87508] uppercase"
              >
                SEASONAL BUNDLES • FAMILY OFFERS
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#18110C] mt-1">
                عروض الياسمين وبوكسات اللمة
              </h2>
            </div>

            <Link
              href="/offers"
              className="text-xs sm:text-sm font-black text-[#A87508] hover:underline shrink-0"
            >
              كل العروض ←
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {data.offers.slice(0, 3).map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </section>
      )}

      {/* =====================================================================
          8. FLOATING WHITE CARD ON BRAND GOLDEN SHAWARMA PATTERN BACKDROP
          Matches "A Letter Worth Keeping." in `media_1793973600701_ff99753a.jpg` (Mobile) & `media_1793973639351_06794481.jpg` (Web)
         ===================================================================== */}
      <section className="relative w-full py-12 sm:py-20 px-4 sm:px-6 bg-shawarma-gold overflow-hidden">
        {/* Subtle Warm Vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#18110C]/10 via-transparent to-[#18110C]/20"
        />

        <div className="relative z-10 mx-auto max-w-4xl bg-white rounded-[28px] sm:rounded-[34px] p-4 sm:p-6 lg:p-8 shadow-[0_28px_70px_-20px_rgba(24,17,12,0.4)] border border-[#18110C]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
            {/* Image Column (Top on Mobile, Side on Desktop — Exact match to LOMORA reference) */}
            <div className="lg:col-span-6">
              <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square rounded-[22px] overflow-hidden bg-[#18110C]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero/family-feast-box.webp"
                  alt="وليمة الياسمين العائلية"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 rounded-full bg-white/95 backdrop-blur-md text-[#18110C] px-3 py-1 text-[11px] font-black shadow">
                  توصيل سريع في القاهرة
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-6 space-y-3.5 text-right">
              <div
                dir="ltr"
                className="font-en text-left lg:text-right text-xs font-extrabold tracking-[0.16em] text-[#A87508] uppercase"
              >
                A FEAST WORTH SHARING
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-[#18110C] leading-tight">
                لمة العيلة تبدأ من هنا.
              </h2>

              <p className="text-xs sm:text-sm text-[#292929]/75 leading-relaxed">
                اطلب أكلك السوري المفضل دلوقتي من مطعم الياسمين — شاورما عالصاج، مشاوي مشكلة عالفحم، فتات دمشقية بالسمن البلدي، وصواني العزومات تجهز طازجة وتوصلك سخنة لحد باب البيت.
              </p>

              {/* Rating & Followers Strip */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-extrabold text-[#5A3218]">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#FAF6EC] border border-[#E8A818]/40 px-3 py-1">
                  <StarIcon className="w-3.5 h-3.5 text-[#E8A818]" />
                  <span>47,000+ متابع على فيسبوك</span>
                </span>
                <span dir="ltr" className="font-en rounded-full bg-[#FAF6EC] border border-[#E8A818]/40 px-3 py-1">
                  01010400507
                </span>
              </div>

              {/* Solid Dark Action Button matching `Join the List` in LOMORA reference + WhatsApp */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5">
                <Link
                  href="/menu"
                  className="rounded-xl bg-[#18110C] hover:bg-[#2B1E15] text-white font-black text-xs sm:text-sm px-6 py-3 transition"
                >
                  اطلب الآن من المنيو
                </Link>
                <a
                  href="https://wa.me/201010400507"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-[#E8A818] hover:bg-[#D99B10] text-[#18110C] font-black text-xs sm:text-sm px-5 py-3 inline-flex items-center gap-1.5 transition"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>طلب عبر واتساب</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          9. DELIVERY ZONES & CUSTOMER REVIEWS
         ===================================================================== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-18 space-y-12">
        <div className="space-y-5">
          <div className="flex items-end justify-between gap-3">
            <div>
              <div
                dir="ltr"
                className="font-en text-left sm:text-right text-xs font-extrabold tracking-[0.18em] text-[#A87508] uppercase"
              >
                CAIRO DELIVERY NETWORK
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#18110C] mt-1">
                مناطق التوصيل والطلب المباشر
              </h2>
            </div>
            <Link href="/delivery" className="text-xs sm:text-sm font-black text-[#A87508] hover:underline">
              تفاصيل التوصيل ←
            </Link>
          </div>

          <BranchesShowcase branches={data.branches} />
        </div>

        {/* Customer Reviews Grid */}
        {data.reviews.length > 0 && (
          <div className="space-y-5 pt-4 border-t border-[#18110C]/10">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-xl sm:text-2xl font-black text-[#18110C]">
                آراء عملاء الياسمين
              </h3>
              <a
                href="https://www.facebook.com/profile.php?id=61555928014156&sk=reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-extrabold text-[#A87508] hover:underline"
              >
                تقييمات فيسبوك الرسمية ←
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.reviews.map((r) => (
                <div
                  key={r.id}
                  className="rounded-[24px] bg-[#FAF6EC] border border-[#E8A818]/30 p-5 flex flex-col justify-between gap-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-[#E8A818]">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <StarIcon key={i} className="w-3.5 h-3.5" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-[#18110C]/85 font-semibold leading-relaxed">
                      &ldquo;{r.text}&rdquo;
                    </p>
                  </div>
                  <div className="text-xs font-black text-[#5A3218]">{r.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
