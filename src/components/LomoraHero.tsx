"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useStore } from "./store";
import { formatPrice } from "@/lib/format";
import { openMenuQrModal } from "./MenuQrModal";
import { ArrowUpLeftIcon, BagIcon, ChevronIcon, CloseIcon, MenuIcon, PhoneIcon, QrCodeIcon, WhatsAppIcon } from "./icons";

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
    titleAr: "بوكس شاورما عربي دمشقي",
    image: "/images/hero/hero-shawarma-arabi.webp",
    pillTop: "تتبيلة دمشقية ٢٤ ساعة",
    pillBottom: "خبز صاج طازج وثومية",
  },
  {
    id: "mixed-grill",
    titleAr: "مشاوي الياسمين عالفحم",
    image: "/images/hero/hero-mixed-grill.webp",
    pillTop: "لحم بلدي مشوي عالفحم",
    pillBottom: "كباب حلبي وشيش طاووق",
  },
  {
    id: "saj-platter",
    titleAr: "شاورما صاج محمص بالتتبيلة",
    image: "/images/hero/hero-fatteh-shawarma.webp",
    pillTop: "عيش صاج محمص ع الجريل",
    pillBottom: "ثومية سورية ومخلل شامي",
  },
];

const HERO_PILL_TAGS_ROW1 = ["شاورما عالصاج", "مشاوي شامية", "فتات دمشقية"];
const HERO_PILL_TAGS_ROW2 = ["مقبلات أصلية", "ولائم العيلة"];

const NAV_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/menu", label: "المنيو الكامل" },
  { href: "/offers", label: "العروض والبوكسات" },
  { href: "/delivery", label: "مناطق التوصيل" },
  { href: "/occasions", label: "ولائم العزومات" },
  { href: "/about", label: "حكاية الياسمين" },
  { href: "/contact", label: "تواصل معنا" },
];

export default function LomoraHero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { count, subtotal, hydrated } = useStore();
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
      className="relative w-full bg-[#E8A514] text-[#18110C] rounded-b-[32px] lg:rounded-b-[42px] overflow-hidden shadow-[0_20px_50px_-20px_rgba(24,17,12,0.28)]"
      style={{
        backgroundImage: 'url("/images/shawarma-pattern-gold.webp")',
        backgroundSize: "460px 460px",
      }}
    >
      {/* =====================================================================
          MOBILE LOMORA HERO
          - Burger Menu on RIGHT, Logo on LEFT (`dir="ltr"` top bar)
          - Clean uniform 4-line headline
          - Dish Stage with 2 floating white callout pills
          - 3 Clean Square Thumbnails (No truncated text clutter, NO middle arrow buttons)
          - Editorial paragraph + 2 rows of pill tags
         ===================================================================== */}
      <div className="lg:hidden relative z-10 flex flex-col px-4 pt-4 pb-7 space-y-5">
        {/* Top Navbar: ONLY Logo on LEFT and Burger Menu Icon on RIGHT (`dir="ltr"`) */}
        <div dir="ltr" className="flex items-center justify-between gap-3">
          {/* LEFT: Official Alyasmin Shadowed Logo */}
          <Link href="/" className="flex items-center shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-horizontal-shadow.png"
              alt="مطعم الياسمين"
              className="h-11 w-auto object-contain"
            />
          </Link>

          {/* RIGHT: ONLY Burger Menu Button at FAR RIGHT */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="القائمة"
            className="relative w-10 h-10 rounded-full bg-[#18110C] text-[#E8A514] grid place-items-center shadow-md active:scale-95 transition shrink-0 cursor-pointer"
          >
            {mobileMenuOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            {hydrated && count > 0 && !mobileMenuOpen && (
              <span className="absolute -bottom-0.5 -left-0.5 min-w-4.5 h-4.5 px-1 rounded-full bg-[#E8A514] text-[#18110C] text-[10px] font-black grid place-items-center ring-2 ring-[#18110C]">
                {count}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div dir="rtl" className="rounded-[24px] bg-[#18110C] text-white p-4 space-y-3 shadow-2xl border border-white/10">
            {/* Highlighted Menu + QR Action Row at Top of Burger Menu */}
            <div className="flex items-center gap-2 pb-2 border-b border-white/10">
              <Link
                href="/menu"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 rounded-2xl bg-[#E8A514] text-[#18110C] py-2.5 px-3.5 text-xs font-black flex items-center justify-center gap-2 shadow-md"
              >
                <span>تصفح المنيو الكامل</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openMenuQrModal();
                }}
                className="rounded-2xl bg-white/10 hover:bg-[#E8A514] text-[#E8A514] hover:text-[#18110C] border border-[#E8A514]/40 py-2.5 px-3.5 text-xs font-black inline-flex items-center gap-1.5 transition cursor-pointer shrink-0"
              >
                <QrCodeIcon className="w-4 h-4" />
                <span>باركود المنيو QR</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-2xl px-3.5 py-2.5 text-xs font-black transition ${
                    item.href === "/"
                      ? "bg-[#E8A514] text-[#18110C]"
                      : "bg-white/10 hover:bg-white/15 text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Cart Link inside Burger Menu Drawer */}
            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full rounded-2xl bg-white/10 hover:bg-white/15 border border-[#E8A514]/35 px-3.5 py-2.5 text-xs font-black flex items-center justify-between transition"
            >
              <span className="flex items-center gap-2 text-white">
                <BagIcon className="w-4 h-4 text-[#E8A514]" />
                <span>سلة الطلبات (واتساب)</span>
              </span>
              <span className="flex items-center gap-1.5">
                {hydrated && count > 0 && (
                  <span className="rounded-full bg-[#E8A514] text-[#18110C] px-2.5 py-0.5 text-[11px] font-black">
                    {count} • {formatPrice(subtotal)}
                  </span>
                )}
                <ChevronIcon className="w-4 h-4 text-[#E8A514]" />
              </span>
            </Link>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
              <a
                href="tel:01010400507"
                dir="ltr"
                className="font-en rounded-2xl bg-[#E8A514] text-[#18110C] py-2.5 px-3 text-xs font-black flex items-center justify-center gap-1.5"
              >
                <PhoneIcon className="w-3.5 h-3.5" />
                <span>01010400507</span>
              </a>
              <a
                href="https://wa.me/201010400507"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-[#25D366] text-white py-2.5 px-3 text-xs font-black flex items-center justify-center gap-1.5"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>طلب واتساب</span>
              </a>
            </div>
          </div>
        )}

        {/* Clean Uniform 4-Line Stacked Headline */}
        <div className="space-y-1 pt-0.5 text-right">
          <h1 className="text-[28px] sm:text-3xl font-black leading-[1.2] tracking-tight text-[#18110C]">
            <span className="block">أصالة المذاق السوري.</span>
            <span className="block">شاورما عالصاج</span>
            <span className="block">ومشاوي شامية.</span>
            <span className="block">طعم الشام الأصيل.</span>
          </h1>
        </div>

        {/* Center Hero Dish Visual Stage with 2 Floating White Callout Pills */}
        <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden shadow-[0_18px_40px_-12px_rgba(24,17,12,0.45)] bg-[#18110C]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.image}
            alt={current.titleAr}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />

          {/* Upper-Right Floating White Callout Pill */}
          <div className="absolute top-4 right-3.5 z-10 animate-float-pill">
            <div className="relative rounded-xl bg-white text-[#18110C] px-3.5 py-2 text-[11px] font-extrabold shadow-[0_10px_24px_rgba(0,0,0,0.3)]">
              {current.pillTop}
              <span className="absolute -bottom-1.5 left-3 w-2.5 h-2.5 rounded-full bg-white shadow" />
            </div>
          </div>

          {/* Lower-Left Floating White Callout Pill */}
          <div className="absolute bottom-4 left-3.5 z-10 animate-float-pill" style={{ animationDelay: "1.2s" }}>
            <div className="relative rounded-xl bg-white text-[#18110C] px-3.5 py-2 text-[11px] font-extrabold shadow-[0_10px_24px_rgba(0,0,0,0.3)]">
              {current.pillBottom}
              <span className="absolute -top-1.5 right-3 w-2.5 h-2.5 rounded-full bg-white shadow" />
            </div>
          </div>
        </div>

        {/* 3 Clean Square Rounded Thumbnails (Exact match to LOMORA Mobile Reference — no truncated text inside, no middle arrow buttons) */}
        <div className="grid grid-cols-3 gap-3">
          {HERO_SLIDES.map((slide, idx) => {
            const active = idx === activeIdx;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                aria-label={slide.titleAr}
                className={`group relative aspect-square rounded-[20px] overflow-hidden transition-all duration-300 bg-[#18110C] ${
                  active
                    ? "ring-3 ring-[#18110C] shadow-lg scale-[1.02]"
                    : "opacity-80 hover:opacity-100 ring-1 ring-[#18110C]/20"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.image}
                  alt={slide.titleAr}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>

        {/* 3-Line Editorial Description Paragraph */}
        <p className="text-xs sm:text-sm leading-relaxed font-bold text-[#18110C]/90 text-right">
          نحضّر أطباقنا الشامية يومياً من أجود اللحوم الطازجة والتتبيلات الدمشقية العريقة، لنقدم لك مذاق الشام الأصيل ودفء الضيافة السورية في كل لقمة.
        </p>

        {/* 2 Rows of Outline Pill Tags (3 on Row 1, 2 on Row 2) */}
        <div className="space-y-2 pt-0.5">
          <div className="flex flex-wrap items-center gap-2">
            {HERO_PILL_TAGS_ROW1.map((tag) => (
              <Link
                key={tag}
                href="/menu"
                className="rounded-full border border-[#18110C]/35 bg-[#18110C]/10 hover:bg-[#18110C] hover:text-[#E8A514] px-3.5 py-1.5 text-[11px] font-extrabold text-[#18110C] transition"
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
                className="rounded-full border border-[#18110C]/35 bg-[#18110C]/10 hover:bg-[#18110C] hover:text-[#E8A514] px-3.5 py-1.5 text-[11px] font-extrabold text-[#18110C] transition"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================================
          DESKTOP (`Web`) LOMORA HERO
          - Menu Pill on RIGHT, Logo + CTA on LEFT
          - Clean uniform 4-line headline
          - 3 Clean Square Thumbnails straddling the seam (NO middle arrow buttons)
          - Full-bleed Dish Stage on Left with 2 Floating White Callout Pills & 5 Pill Tags
         ===================================================================== */}
      <div className="hidden lg:grid lg:grid-cols-12 min-h-[650px] relative z-10">
        {/* Right/Start Solid Brand Stage (6 cols) — Alyasmin Yellow + Shawarma Pattern */}
        <div className="lg:col-span-6 flex flex-col justify-between pr-10 xl:pr-14 pl-6 py-8 relative z-20">
          {/* Top Right: Embedded Pill Navbar */}
          <div className="flex items-center">
            <nav className="inline-flex items-center gap-5 rounded-full bg-[#18110C] text-white px-5 py-2.5 shadow-lg">
              <Link href="/" className="shrink-0 flex items-center">
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

          {/* Clean Uniform 4-Line Stacked Headline */}
          <div className="my-auto py-6">
            <h1 className="text-4xl xl:text-[46px] font-black leading-[1.18] tracking-tight text-[#18110C]">
              <span className="block">أصالة المذاق السوري.</span>
              <span className="block">شاورما عالصاج</span>
              <span className="block">ومشاوي شامية.</span>
              <span className="block">طعم الشام الأصيل.</span>
            </h1>
          </div>

          {/* 3 Clean Square Dish Thumbnails Straddling the Seam (No arrow buttons below) */}
          <div className="relative z-30 lg:-ml-24 xl:-ml-28 my-2">
            <div className="grid grid-cols-3 gap-4 max-w-[460px]">
              {HERO_SLIDES.map((slide, idx) => {
                const active = idx === activeIdx;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    aria-label={slide.titleAr}
                    className={`group relative aspect-square rounded-[22px] overflow-hidden transition-all duration-300 bg-[#18110C] ${
                      active
                        ? "ring-3 ring-[#18110C] shadow-[0_20px_45px_rgba(0,0,0,0.45)] -translate-y-1"
                        : "opacity-85 hover:opacity-100 ring-2 ring-white/70 shadow-md"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slide.image}
                      alt={slide.titleAr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom 3-Line Editorial Description Paragraph */}
          <p className="text-sm font-bold text-[#18110C]/90 max-w-md leading-relaxed pt-4">
            نحضّر أطباقنا الشامية يومياً من أجود اللحوم الطازجة والتتبيلات الدمشقية العريقة، لنقدم لك مذاق الشام الأصيل ودفء الضيافة السورية في قلب القاهرة.
          </p>
        </div>

        {/* Left/End Full-Bleed Atmospheric Dish Stage (6 cols) */}
        <div className="lg:col-span-6 relative min-h-[650px] flex flex-col justify-between p-8 xl:p-10 overflow-hidden bg-[#23170E]">
          {/* Full-Bleed Dish Photo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.image}
            alt={current.titleAr}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#18110C]/80 via-transparent to-[#18110C]/30"
          />

          {/* Top-Left Corner: Official Alyasmin Shadowed Logo on Left + White Pill CTA Button */}
          <div dir="ltr" className="relative z-20 flex items-center justify-between gap-4">
            {/* LEFT: Official Alyasmin Shadowed Logo */}
            <Link href="/" className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-horizontal-shadow.png"
                alt="مطعم الياسمين"
                className="h-12 xl:h-14 w-auto object-contain"
              />
            </Link>

            {/* White Pill CTA Button + QR + Cart */}
            <div className="flex items-center gap-2.5" dir="rtl">
              <button
                type="button"
                onClick={openMenuQrModal}
                title="باركود ومشاركة المنيو (QR)"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#18110C] hover:bg-[#E8A514] text-[#E8A514] hover:text-[#18110C] border border-[#E8A514]/45 px-4 py-2 text-xs font-black shadow-lg transition cursor-pointer"
              >
                <QrCodeIcon className="w-4 h-4" />
                <span>باركود المنيو QR</span>
              </button>
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
          </div>

          {/* Center Floating White Callout Pills over the Dish */}
          <div className="relative z-20 my-auto flex flex-col gap-20 pr-8 pl-4 pointer-events-none">
            <div className="self-end ml-8 animate-float-pill">
              <div className="relative rounded-xl bg-white text-[#18110C] px-4 py-2.5 text-xs font-extrabold shadow-[0_14px_34px_rgba(0,0,0,0.4)]">
                {current.pillTop}
                <span className="absolute -bottom-1.5 right-3 w-3 h-3 rounded-full bg-white shadow" />
              </div>
            </div>

            <div className="self-end ml-14 animate-float-pill" style={{ animationDelay: "1.3s" }}>
              <div className="relative rounded-xl bg-white text-[#18110C] px-4 py-2.5 text-xs font-extrabold shadow-[0_14px_34px_rgba(0,0,0,0.4)]">
                {current.pillBottom}
                <span className="absolute -top-1.5 right-3 w-3 h-3 rounded-full bg-white shadow" />
              </div>
            </div>
          </div>

          {/* Bottom-Left 2 Rows of 5 Outline Pill Tags (3 on top row, 2 on bottom row) */}
          <div className="relative z-20 flex flex-col items-end gap-2 pt-4">
            <div className="flex flex-wrap items-center justify-end gap-2">
              {HERO_PILL_TAGS_ROW1.map((tag) => (
                <Link
                  key={tag}
                  href="/menu"
                  className="rounded-full border border-white/30 bg-black/45 backdrop-blur-md hover:bg-[#E8A514] hover:border-[#E8A514] hover:text-[#18110C] px-4 py-1.5 text-xs font-bold text-white transition"
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
                  className="rounded-full border border-white/30 bg-black/45 backdrop-blur-md hover:bg-[#E8A514] hover:border-[#E8A514] hover:text-[#18110C] px-4 py-1.5 text-xs font-bold text-white transition"
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
