"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useStore } from "./store";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpLeftIcon, BagIcon, CloseIcon } from "./icons";

interface HeroSlide {
  id: string;
  titleAr: string;
  image: string;
  pillTop: string;
  pillBottom: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "shawarma-arabi",
    titleAr: "شاورما عربي دمشقي",
    image: "/images/hero/hero-shawarma-arabi.webp",
    pillTop: "تتبيلة دمشقية ٢٤ ساعة",
    pillBottom: "خبز صاج طازج وثومية",
  },
  {
    id: "mixed-grill",
    titleAr: "مشاوي شامي عالفحم",
    image: "/images/hero/hero-mixed-grill.webp",
    pillTop: "لحم بلدي مشوي عالفحم",
    pillBottom: "كباب حلبي وشيش طاووق",
  },
  {
    id: "fatteh-shawarma",
    titleAr: "فتة شاورما بالسمن",
    image: "/images/hero/hero-fatteh-shawarma.webp",
    pillTop: "طشة سمن بلدي ولوز",
    pillBottom: "أرز بسمتي وخبز محمص",
  },
];

const HERO_PILL_TAGS_ROW1 = ["شاورما عالصاج", "مشاوي شامية", "فتات دمشقية"];
const HERO_PILL_TAGS_ROW2 = ["مقبلات أصلية", "ولائم العيلة"];

const NAV_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/menu", label: "المنيو" },
  { href: "/offers", label: "العروض" },
  { href: "/about", label: "عن الياسمين" },
  { href: "/contact", label: "تواصل معنا" },
];

export default function LomoraHero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { count } = useStore();
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
      className="relative w-full bg-[#E8A514] text-[#18110C] rounded-b-[32px] lg:rounded-b-[42px] overflow-hidden shadow-[0_24px_60px_-20px_rgba(24,17,12,0.3)]"
      style={{
        backgroundImage: 'url("/images/shawarma-pattern-gold.webp")',
        backgroundSize: "480px 480px",
      }}
    >
      {/* =====================================================================
          MOBILE LOMORA HERO (Exact 1:1 Layout of `media_1793973625835_2c629f08.jpg`
          with Alyasmin's Original Yellow Shawarma Pattern & White Shadowed Logo)
         ===================================================================== */}
      <div className="lg:hidden relative z-10 flex flex-col">
        {/* Top Part: Yellow Shawarma Pattern + Embedded Navbar + 4-Line Headline + Dish Stage with 2 White Callout Pills */}
        <div className="relative px-4 pt-4 pb-5">
          {/* Top Embedded Bar: Flower Emblem + Alyasmin Logo on one side, 2-Line Menu Icon (`=`) on the other */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <Link href="/" className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-horizontal-shadow.png"
                alt="مطعم الياسمين"
                className="h-10 w-auto object-contain"
              />
            </Link>

            <div className="flex items-center gap-2">
              {count > 0 && (
                <Link
                  href="/cart"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#18110C] text-[#E8A514] px-3 py-1.5 text-xs font-black shadow"
                >
                  <BagIcon className="w-3.5 h-3.5" />
                  <span>{count}</span>
                </Link>
              )}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label="القائمة"
                className="w-10 h-10 rounded-full bg-[#18110C]/15 hover:bg-[#18110C]/25 text-[#18110C] grid place-items-center transition"
              >
                {mobileMenuOpen ? (
                  <CloseIcon className="w-5 h-5" />
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <line x1="4" y1="9" x2="20" y2="9" />
                    <line x1="4" y1="15" x2="20" y2="15" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Drawer if Open */}
          {mobileMenuOpen && (
            <div className="mb-4 rounded-2xl bg-[#18110C] text-white p-3.5 space-y-2 shadow-2xl">
              <div className="grid grid-cols-2 gap-2">
                {NAV_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl bg-white/10 hover:bg-[#E8A514] hover:text-[#18110C] px-3 py-2 text-xs font-extrabold transition"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/delivery"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl bg-[#E8A514] text-[#18110C] px-3 py-2 text-xs font-black text-center"
                >
                  اطلب الآن • 01010400507
                </Link>
              </div>
            </div>
          )}

          {/* 4-Line Stacked Headline (Matches `MODERN DESIGNS. / EFFORTLESS / COMFORT. / LASTING QUALITY.`) */}
          <h1 className="text-[26px] sm:text-3xl font-black leading-[1.16] tracking-tight text-[#18110C] space-y-0.5 mb-4">
            <span className="block">أصالة المذاق السوري.</span>
            <span className="block text-white drop-shadow-[0_2px_0_#18110C]">شاورما عالصاج</span>
            <span className="block text-white drop-shadow-[0_2px_0_#18110C]">ومشاوي شامية.</span>
            <span className="block">طعم الشام الأصيل.</span>
          </h1>

          {/* Center Hero Dish Visual Stage with the 2 Floating White Callout Pills */}
          <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden shadow-xl border-2 border-white/50 bg-[#23170E]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.image}
              alt={current.titleAr}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#18110C]/55 via-transparent to-[#18110C]/15" />

            {/* Upper-Right Floating White Callout Pill (Exact LOMORA pill + white dot) */}
            <div className="absolute top-5 right-4 z-10 animate-float-pill">
              <div className="relative rounded-xl bg-white text-[#18110C] px-3.5 py-2 text-[11px] font-extrabold shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
                {current.pillTop}
                <span className="absolute -bottom-1.5 left-2.5 w-2.5 h-2.5 rounded-full bg-white shadow" />
              </div>
            </div>

            {/* Lower-Left Floating White Callout Pill (Exact LOMORA pill + white dot) */}
            <div className="absolute bottom-6 left-4 z-10 animate-float-pill" style={{ animationDelay: "1.2s" }}>
              <div className="relative rounded-xl bg-white text-[#18110C] px-3.5 py-2 text-[11px] font-extrabold shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
                {current.pillBottom}
                <span className="absolute -top-1.5 right-2.5 w-2.5 h-2.5 rounded-full bg-white shadow" />
              </div>
            </div>
          </div>
        </div>

        {/* Lower Part of Mobile Hero: 3 Square Thumbnails + `<-` `->` Oval Arrows + 3-Line Paragraph + 2 Rows of Pill Tags */}
        <div className="px-4 pb-6 pt-1 space-y-4">
          {/* 3 Square Rounded Thumbnails */}
          <div className="grid grid-cols-3 gap-2.5">
            {HERO_SLIDES.map((slide, idx) => {
              const active = idx === activeIdx;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`group relative aspect-square rounded-[18px] overflow-hidden transition-all ${
                    active
                      ? "ring-3 ring-[#18110C] shadow-lg scale-[1.02]"
                      : "opacity-80 hover:opacity-100 ring-1 ring-white/50"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.image}
                    alt={slide.titleAr}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent p-1.5">
                    <div className="text-[10px] font-extrabold text-white truncate text-center">
                      {slide.titleAr}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Centered Oval Pill Arrow Buttons `( <- ) ( -> )` */}
          <div className="flex items-center justify-center gap-2.5" dir="ltr">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="السابق"
              className="w-12 h-7 rounded-full border border-[#18110C]/40 bg-[#18110C]/10 hover:bg-[#18110C] hover:text-[#E8A514] text-[#18110C] grid place-items-center transition active:scale-95"
            >
              <ArrowLeftIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="التالي"
              className="w-12 h-7 rounded-full border border-[#18110C]/40 bg-[#18110C] text-[#E8A514] grid place-items-center transition active:scale-95"
            >
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3-Line Editorial Paragraph */}
          <p className="text-xs leading-relaxed font-bold text-[#18110C]/90">
            نحضّر أطباقنا الشامية يومياً من أجود اللحوم الطازجة والتتبيلات الدمشقية العريقة، لنقدم لك مذاق الشام الأصيل ودفء الضيافة السورية في كل لقمة.
          </p>

          {/* 2 Rows of Outline Pill Tags (3 on Row 1, 2 on Row 2 — Exact match to `media_1793973625835_2c629f08.jpg`) */}
          <div className="space-y-2 pt-0.5">
            <div className="flex flex-wrap items-center gap-2">
              {HERO_PILL_TAGS_ROW1.map((tag) => (
                <Link
                  key={tag}
                  href="/menu"
                  className="rounded-full border border-[#18110C]/30 bg-white/85 px-3.5 py-1 text-[11px] font-extrabold text-[#18110C] shadow-2xs"
                >
                  {tag}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {HERO_PILL_TAGS_ROW2.map((tag) => (
                <Link
                  key={tag}
                  href="/menu"
                  className="rounded-full border border-[#18110C]/30 bg-white/85 px-3.5 py-1 text-[11px] font-extrabold text-[#18110C] shadow-2xs"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          DESKTOP (`Web`) LOMORA HERO (Exact 1:1 Split-Stage Architecture of
          `media_1793973652900_eb509023.jpg` with Alyasmin Yellow & Shawarma Pattern)
         ===================================================================== */}
      <div className="hidden lg:grid lg:grid-cols-12 min-h-[670px] relative z-10">
        {/* Right/Start Solid Brand Stage (6 cols) — Alyasmin Yellow + Shawarma Pattern */}
        <div className="lg:col-span-6 flex flex-col justify-between pr-10 xl:pr-14 pl-6 py-7 relative z-20">
          {/* Top Embedded Pill Navbar (`[ ✿  الرئيسية  المنيو  العروض  عن الياسمين  تواصل معنا ]`) */}
          <div className="flex items-center">
            <nav className="inline-flex items-center gap-5 rounded-full border border-[#18110C]/20 bg-[#18110C] text-white px-5 py-2.5 shadow-lg">
              <Link href="/" className="shrink-0 flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-emblem.png"
                  alt="زهرة الياسمين"
                  className="w-6 h-6 object-contain"
                />
              </Link>
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs font-extrabold text-white/90 hover:text-[#E8A514] transition"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Official Alyasmin Shadowed Logo + 4-Line Stacked Headline */}
          <div className="my-auto pt-6 pb-4 space-y-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-horizontal-shadow.png"
              alt="الياسمين للمأكولات السورية"
              className="h-16 xl:h-20 w-auto object-contain"
            />
            <h1 className="text-4xl xl:text-[44px] font-black leading-[1.14] tracking-tight text-[#18110C]">
              <span className="block">أصالة المذاق السوري.</span>
              <span className="block text-white drop-shadow-[0_3px_0_#18110C]">
                شاورما عالصاج ومشاوي.
              </span>
              <span className="block">طعم الشام في كل لقمة.</span>
            </h1>
          </div>

          {/* 3 Square Dish Thumbnails Straddling the Seam + Centered Oval Arrow Switchers `( <- ) ( -> )` */}
          <div className="relative z-30 lg:-ml-24 xl:-ml-28 my-2">
            <div className="grid grid-cols-3 gap-4 max-w-[490px]">
              {HERO_SLIDES.map((slide, idx) => {
                const active = idx === activeIdx;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    className={`group relative aspect-square rounded-[22px] overflow-hidden transition-all duration-300 ${
                      active
                        ? "ring-3 ring-[#18110C] shadow-[0_20px_45px_rgba(0,0,0,0.45)] -translate-y-1"
                        : "opacity-85 hover:opacity-100 ring-2 ring-white/60 shadow-md"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slide.image}
                      alt={slide.titleAr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-2.5">
                      <div className="text-xs font-extrabold text-white truncate text-right">
                        {slide.titleAr}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Centered Oval Pill Arrow Switchers `( <- ) ( -> )` directly below the 3 thumbnails */}
            <div className="flex items-center justify-center gap-3 max-w-[490px] mt-3.5" dir="ltr">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="السابق"
                className="w-12 h-7 rounded-full border border-[#18110C]/45 bg-white/80 hover:bg-[#18110C] hover:text-[#E8A514] text-[#18110C] grid place-items-center transition shadow-xs"
              >
                <ArrowLeftIcon className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="التالي"
                className="w-12 h-7 rounded-full border border-[#18110C] bg-[#18110C] text-[#E8A514] grid place-items-center transition shadow-xs"
              >
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bottom 3-Line Editorial Description Paragraph */}
          <p className="text-sm font-bold text-[#18110C]/90 max-w-md leading-relaxed pt-2">
            نحضّر أطباقنا الشامية يومياً من أجود اللحوم الطازجة والتتبيلات الدمشقية العريقة، لنقدم لك مذاق الشام الأصيل ودفء الضيافة السورية في قلب القاهرة.
          </p>
        </div>

        {/* Left/End Full-Bleed Atmospheric Dish Stage (6 cols) */}
        <div className="lg:col-span-6 relative min-h-[670px] flex flex-col justify-between p-8 xl:p-10 overflow-hidden bg-[#23170E]">
          {/* Full-Bleed Dish Photo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.image}
            alt={current.titleAr}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
          />
          {/* Subtle Warm Blend Gradient on the Right Seam + Bottom Vignette */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-l from-[#E8A514]/25 via-transparent to-black/35"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#18110C]/80 via-transparent to-[#18110C]/20"
          />

          {/* Top-Left Corner: White Pill CTA Button (`Contact us ↗` -> `اطلب الآن ↗`) + Cart Badge */}
          <div className="relative z-20 flex items-center justify-end gap-3">
            {count > 0 && (
              <Link
                href="/cart"
                className="inline-flex items-center gap-2 rounded-full bg-[#E8A514] text-[#18110C] px-4 py-2 text-xs font-black shadow-lg"
              >
                <BagIcon className="w-4 h-4" />
                <span>السلة ({count})</span>
              </Link>
            )}
            <Link
              href="/menu"
              className="inline-flex items-center gap-3 rounded-full bg-white hover:bg-[#FFF9EA] text-[#18110C] pr-5 pl-1.5 py-1.5 text-xs font-black shadow-xl transition group"
            >
              <span>اطلب الآن</span>
              <span className="w-8 h-8 rounded-full bg-[#18110C] group-hover:bg-[#E8A514] text-white group-hover:text-[#18110C] grid place-items-center transition">
                <ArrowUpLeftIcon className="w-4 h-4" />
              </span>
            </Link>
          </div>

          {/* Center Floating White Callout Pills over the Dish (Exact match to LOMORA Web Reference) */}
          <div className="relative z-20 my-auto flex flex-col gap-20 pr-8 pl-4 pointer-events-none">
            {/* Upper Floating White Callout Pill */}
            <div className="self-end ml-8 animate-float-pill">
              <div className="relative rounded-xl bg-white text-[#18110C] px-4 py-2.5 text-xs font-extrabold shadow-[0_14px_34px_rgba(0,0,0,0.4)]">
                {current.pillTop}
                <span className="absolute -bottom-1.5 right-3 w-3 h-3 rounded-full bg-white shadow" />
              </div>
            </div>

            {/* Lower Floating White Callout Pill */}
            <div className="self-end ml-14 animate-float-pill" style={{ animationDelay: "1.3s" }}>
              <div className="relative rounded-xl bg-white text-[#18110C] px-4 py-2.5 text-xs font-extrabold shadow-[0_14px_34px_rgba(0,0,0,0.4)]">
                {current.pillBottom}
                <span className="absolute -top-1.5 right-3 w-3 h-3 rounded-full bg-white shadow" />
              </div>
            </div>
          </div>

          {/* Bottom-Left 2 Rows of 5 Outline Pill Tags (3 on top row, 2 on bottom row — Exact match to LOMORA Web Reference) */}
          <div className="relative z-20 flex flex-col items-end gap-2 pt-4">
            <div className="flex flex-wrap items-center justify-end gap-2">
              {HERO_PILL_TAGS_ROW1.map((tag) => (
                <Link
                  key={tag}
                  href="/menu"
                  className="rounded-full border border-white/30 bg-black/40 backdrop-blur-md hover:bg-[#E8A514] hover:border-[#E8A514] hover:text-[#18110C] px-4 py-1.5 text-xs font-bold text-white transition"
                >
                  {tag}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-end gap-2">
              {HERO_PILL_TAGS_ROW2.map((tag) => (
                <Link
                  key={tag}
                  href="/menu"
                  className="rounded-full border border-white/30 bg-black/40 backdrop-blur-md hover:bg-[#E8A514] hover:border-[#E8A514] hover:text-[#18110C] px-4 py-1.5 text-xs font-bold text-white transition"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
