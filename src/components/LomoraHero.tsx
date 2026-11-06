"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpLeftIcon, JasmineDiamondIcon } from "./icons";

interface HeroSlide {
  id: string;
  titleAr: string;
  subtitleEn: string;
  image: string;
  pillTopRight: string;
  pillBottomLeft: string;
  priceLabel: string;
  categoryHref: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "shawarma-arabi",
    titleAr: "شاورما عربي دمشقي عالصاج",
    subtitleEn: "Damascene Arabic Shawarma",
    image: "/images/hero/hero-shawarma-arabi.webp",
    pillTopRight: "تتبيلة دمشقية ٢٤ ساعة",
    pillBottomLeft: "خبز صاج طازج وثومية",
    priceLabel: "145 ج.م",
    categoryHref: "/menu#cat-shawarma",
  },
  {
    id: "mixed-grill",
    titleAr: "مشاوي مشكلة شامي عالفحم",
    subtitleEn: "Charcoal Syrian Mixed Grill",
    image: "/images/hero/hero-mixed-grill.webp",
    pillTopRight: "لحم بلدي مشوي عالفحم",
    pillBottomLeft: "كباب حلبي وشيش طاووق",
    priceLabel: "240 ج.م",
    categoryHref: "/menu#cat-grills",
  },
  {
    id: "fatteh-shawarma",
    titleAr: "فتة شاورما بالسمن البلدي",
    subtitleEn: "Ghee & Almond Shawarma Fatteh",
    image: "/images/hero/hero-fatteh-shawarma.webp",
    pillTopRight: "طشة سمن بلدي ولوز",
    pillBottomLeft: "أرز بسمتي وخبز محمص",
    priceLabel: "135 ج.م",
    categoryHref: "/menu#cat-fatteh",
  },
];

const HERO_PILL_TAGS = [
  { ar: "شاورما عالصاج", en: "Shawarma" },
  { ar: "مشاوي شامية", en: "Charcoal Grill" },
  { ar: "فتات دمشقية", en: "Syrian Fatteh" },
  { ar: "مقبلات أصلية", en: "Levantine Mezze" },
  { ar: "وجبات عائلية", en: "Family Feasts" },
];

export default function LomoraHero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const current = HERO_SLIDES[activeIdx];
  const prevSlide = () => setActiveIdx((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const nextSlide = () => setActiveIdx((i) => (i + 1) % HERO_SLIDES.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 36) return;
    if (dx > 0) prevSlide();
    else nextSlide();
  };

  return (
    <section
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full bg-[#18110C] text-white rounded-b-[32px] sm:rounded-b-[44px] overflow-hidden shadow-[0_24px_60px_-20px_rgba(24,17,12,0.55)]"
    >
      {/* Subtle Brand Shawarma Pattern Watermark in Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: 'url("/images/shawarma-pattern-gold.webp")',
          backgroundSize: "460px 460px",
        }}
      />

      {/* Warm Golden Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/3 w-[480px] h-[480px] rounded-full bg-[#E8A818]/15 blur-[110px]"
      />

      {/* =====================================================================
          MOBILE LOMORA HERO (Matches `media_1793973625835_2c629f08.jpg` & `Mobile` column)
         ===================================================================== */}
      <div className="lg:hidden relative z-10 flex flex-col justify-between min-h-[calc(100svh-56px)] pb-6">
        {/* Top Atmospheric Photo Stage with Stacked Headline & 2 Floating White Callout Pills */}
        <div className="relative w-full min-h-[410px] sm:min-h-[460px] flex flex-col justify-between p-4 sm:p-6 overflow-hidden">
          {/* Dish Photo Background with Warm Vignette */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.image}
            alt={current.titleAr}
            className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-500"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-[#18110C]/85 via-[#18110C]/30 to-[#18110C]"
          />

          {/* Top Stacked Editorial Headline */}
          <div className="relative z-10 pt-1 space-y-1.5">
            <div dir="ltr" className="font-en text-left text-[22px] sm:text-3xl font-extrabold tracking-tight leading-[1.08] text-white drop-shadow-sm">
              <div>AUTHENTIC SYRIAN TASTE.</div>
              <div>DAMASCENE CRAFT.</div>
              <div className="text-[#E8A818]">LASTING FLAVOR.</div>
            </div>
            <h1 className="text-right text-lg sm:text-xl font-black text-white/95 leading-snug">
              أصالة المذاق السوري في كل طبق.
            </h1>
          </div>

          {/* 2 Floating White Callout Pills over the Hero Dish (Exact match to LOMORA Mobile Reference) */}
          <div className="relative z-10 my-auto py-8 flex flex-col gap-10 pointer-events-none">
            {/* Right/Top Callout Pill */}
            <div className="self-start animate-float-pill">
              <div className="relative inline-flex items-center gap-2 rounded-2xl bg-white text-[#18110C] px-3.5 py-2 shadow-[0_12px_28px_rgba(0,0,0,0.35)]">
                <span className="w-2 h-2 rounded-full bg-[#E8A818]" />
                <span className="text-[11px] font-extrabold">{current.pillTopRight}</span>
                <span className="absolute -bottom-1 right-3 w-2.5 h-2.5 rounded-full bg-white shadow" />
              </div>
            </div>

            {/* Left/Bottom Callout Pill */}
            <div className="self-end animate-float-pill" style={{ animationDelay: "1.2s" }}>
              <div className="relative inline-flex items-center gap-2 rounded-2xl bg-white text-[#18110C] px-3.5 py-2 shadow-[0_12px_28px_rgba(0,0,0,0.35)]">
                <span className="w-2 h-2 rounded-full bg-[#18110C]" />
                <span className="text-[11px] font-extrabold">{current.pillBottomLeft}</span>
                <span className="absolute -top-1 left-3 w-2.5 h-2.5 rounded-full bg-white shadow" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Dark Walnut Stage: 3 Square Thumbnails + Oval Arrow Switchers + Description + 5 Outline Pill Tags */}
        <div className="px-4 sm:px-6 space-y-4">
          {/* 3 Square Dish Thumbnails */}
          <div className="grid grid-cols-3 gap-2.5">
            {HERO_SLIDES.map((slide, idx) => {
              const active = idx === activeIdx;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`group relative aspect-square rounded-2xl overflow-hidden transition-all ${
                    active
                      ? "ring-2 ring-[#E8A818] scale-[1.02] shadow-lg"
                      : "opacity-70 hover:opacity-100 border border-white/15"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.image}
                    alt={slide.titleAr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-1.5">
                    <div className="text-[10px] font-extrabold text-white truncate text-right">
                      {slide.titleAr}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Centered Oval Pill Arrow Buttons (`<-` `->` from LOMORA reference) */}
          <div className="flex items-center justify-center gap-2.5" dir="ltr">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="الطبق السابق"
              className="w-12 h-7 rounded-full border border-white/25 hover:border-[#E8A818] hover:text-[#E8A818] text-white/85 grid place-items-center transition active:scale-95"
            >
              <ArrowLeftIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="الطبق التالي"
              className="w-12 h-7 rounded-full border border-white/25 hover:border-[#E8A818] hover:text-[#E8A818] text-white/85 grid place-items-center transition active:scale-95"
            >
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Editorial Description Paragraph */}
          <p className="text-xs sm:text-sm text-white/75 leading-relaxed text-right">
            نحضّر أطباقنا الشامية يومياً من أجود اللحوم الطازجة والتتبيلات الدمشقية العريقة، لنقدم لك مذاق الشام الأصيل ودفء الضيافة السورية في قلب القاهرة.
          </p>

          {/* 5 Subtle Outline Pill Tags (2 rows matching LOMORA reference) */}
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {HERO_PILL_TAGS.map((t) => (
              <span
                key={t.en}
                className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-[11px] font-bold text-white/75"
              >
                {t.ar}
              </span>
            ))}
          </div>

          {/* Paired Action Buttons (`شاهد المنيو` + `اطلب الآن`) */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <Link
              href="/menu"
              className="rounded-full bg-[#E8A818] hover:bg-[#D99B10] text-[#18110C] font-black text-xs py-3 text-center shadow-lg transition active:scale-95"
            >
              شاهد المنيو
            </Link>
            <Link
              href="/delivery"
              className="rounded-full bg-white hover:bg-[#FAF6EC] text-[#18110C] font-black text-xs py-3 flex items-center justify-center gap-1.5 transition active:scale-95"
            >
              <span>اطلب الآن</span>
              <ArrowUpLeftIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* =====================================================================
          DESKTOP LOMORA HERO (`Web` column in `media_1793973652900_eb509023.jpg`)
         ===================================================================== */}
      <div className="hidden lg:grid lg:grid-cols-12 mx-auto max-w-7xl px-8 pt-6 pb-12 gap-8 items-stretch relative z-10">
        {/* Right/Start Editorial Column (6 cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between py-4 z-20">
          {/* Stacked Headline */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E8A818]/35 bg-[#E8A818]/10 px-3.5 py-1 text-xs font-extrabold text-[#E8A818]">
              <JasmineDiamondIcon className="w-3 h-3" />
              <span>مطعم الياسمين للمأكولات السورية • القاهرة</span>
            </div>

            <div
              dir="ltr"
              className="font-en text-left text-4xl xl:text-[44px] font-extrabold tracking-tight leading-[1.08] text-white"
            >
              <div>AUTHENTIC SYRIAN TASTE.</div>
              <div>EFFORTLESS WARMTH.</div>
              <div className="text-[#E8A818]">LASTING QUALITY.</div>
            </div>

            <h1 className="text-2xl xl:text-3xl font-black text-white/95 leading-snug">
              أصالة المذاق السوري في كل طبق — طعم الشام على أصوله.
            </h1>
          </div>

          {/* Overlapping 3 Square Dish Thumbnails + Oval Arrow Switchers */}
          <div className="my-7 space-y-3.5 lg:-ml-16 relative z-30">
            <div className="grid grid-cols-3 gap-3.5 max-w-[490px]">
              {HERO_SLIDES.map((slide, idx) => {
                const active = idx === activeIdx;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    className={`group relative aspect-square rounded-[22px] overflow-hidden text-right transition-all duration-300 ${
                      active
                        ? "ring-2 ring-[#E8A818] shadow-[0_18px_40px_rgba(0,0,0,0.55)] -translate-y-1"
                        : "opacity-75 hover:opacity-100 border border-white/15"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slide.image}
                      alt={slide.titleAr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-2.5">
                      <div className="text-xs font-extrabold text-white truncate">
                        {slide.titleAr}
                      </div>
                      <div className="text-[11px] font-bold text-[#E8A818]">{slide.priceLabel}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Oval Arrow Switchers (`<-` `->`) + Primary CTA Buttons */}
            <div className="flex items-center justify-between max-w-[490px] pt-1">
              <div className="flex items-center gap-2.5">
                <Link
                  href="/menu"
                  className="rounded-full bg-[#E8A818] hover:bg-[#D99B10] text-[#18110C] font-black text-xs px-6 py-2.5 shadow-lg transition active:scale-95"
                >
                  شاهد المنيو
                </Link>
                <Link
                  href="/delivery"
                  className="rounded-full bg-white hover:bg-[#FAF6EC] text-[#18110C] font-black text-xs px-5 py-2.5 flex items-center gap-1.5 transition active:scale-95"
                >
                  <span>اطلب الآن</span>
                  <ArrowUpLeftIcon className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="flex items-center gap-2" dir="ltr">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="الطبق السابق"
                  className="w-12 h-7 rounded-full border border-white/25 hover:border-[#E8A818] hover:text-[#E8A818] text-white/85 grid place-items-center transition"
                >
                  <ArrowLeftIcon className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="الطبق التالي"
                  className="w-12 h-7 rounded-full border border-white/25 hover:border-[#E8A818] hover:text-[#E8A818] text-white/85 grid place-items-center transition"
                >
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Editorial Description */}
          <p className="text-sm text-white/70 max-w-md leading-relaxed">
            نصنع الشاورما والمشاوي والفتات الدمشقية يومياً بمكونات طازجة وتتبيلات شامية أصيلة، لنمنحك طعم الشام الدافئ في كل لقمة.
          </p>
        </div>

        {/* Left/End Atmospheric Dish Photo Stage (6 cols) */}
        <div className="lg:col-span-6 relative min-h-[540px] rounded-[28px] overflow-hidden border border-white/10 shadow-2xl flex flex-col justify-between p-7">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.image}
            alt={current.titleAr}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#18110C]/90 via-transparent to-[#18110C]/25"
          />

          {/* Top Floating White Callout Pill */}
          <div className="relative z-10 self-start mt-16 animate-float-pill">
            <div className="relative inline-flex items-center gap-2.5 rounded-2xl bg-white text-[#18110C] px-4 py-2.5 shadow-[0_16px_36px_rgba(0,0,0,0.4)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8A818]" />
              <span className="text-xs font-extrabold">{current.pillTopRight}</span>
              <span className="absolute -bottom-1.5 right-4 w-3 h-3 rounded-full bg-white shadow" />
            </div>
          </div>

          {/* Lower Floating White Callout Pill */}
          <div className="relative z-10 self-center my-auto mr-24 animate-float-pill" style={{ animationDelay: "1.4s" }}>
            <div className="relative inline-flex items-center gap-2.5 rounded-2xl bg-white text-[#18110C] px-4 py-2.5 shadow-[0_16px_36px_rgba(0,0,0,0.4)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#18110C]" />
              <span className="text-xs font-extrabold">{current.pillBottomLeft}</span>
              <span className="absolute -top-1.5 left-4 w-3 h-3 rounded-full bg-white shadow" />
            </div>
          </div>

          {/* Bottom 2 Rows of Subtle Outline Pill Tags inside Photo Stage (Exact match to LOMORA Desktop Reference) */}
          <div className="relative z-10 flex flex-wrap items-center justify-end gap-2 pt-6">
            {HERO_PILL_TAGS.map((t) => (
              <Link
                key={t.en}
                href="/menu"
                className="rounded-full border border-white/25 bg-black/35 backdrop-blur-md hover:border-[#E8A818] hover:text-[#E8A818] px-3.5 py-1.5 text-xs font-bold text-white/90 transition"
              >
                {t.ar}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
