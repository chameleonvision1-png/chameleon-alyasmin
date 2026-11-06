"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useStore } from "./store";
import { formatPrice } from "@/lib/format";
import { openMenuQrModal } from "./MenuQrModal";
import { triggerPwaInstall, useIsStandalonePwa } from "./PwaInstallModal";
import {
  ArrowUpLeftIcon,
  BagIcon,
  ChevronIcon,
  CloseIcon,
  DownloadAppIcon,
  MenuIcon,
  PhoneIcon,
  QrCodeIcon,
  WhatsAppIcon,
} from "./icons";

interface HeroSlide {
  id: string;
  shortTitleAr: string;
  titleAr: string;
  image: string;
  pillTop: string;
  pillBottom: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "shawarma-arabi",
    shortTitleAr: "شاورما عربي",
    titleAr: "بوكس شاورما عربي دمشقي",
    image: "/images/hero/hero-shawarma-arabi.webp",
    pillTop: "تتبيلة دمشقية ٢٤ ساعة",
    pillBottom: "خبز صاج طازج وثومية",
  },
  {
    id: "mixed-grill",
    shortTitleAr: "مشاوي عالفحم",
    titleAr: "مشاوي الياسمين عالفحم",
    image: "/images/hero/hero-mixed-grill.webp",
    pillTop: "لحم بلدي مشوي عالفحم",
    pillBottom: "كباب حلبي وشيش طاووق",
  },
  {
    id: "saj-platter",
    shortTitleAr: "فتة شاورما",
    titleAr: "فتة شاورما بالسمن البلدي",
    image: "/images/hero/hero-fatteh-shawarma.webp",
    pillTop: "طشة سمن بلدي ولوز",
    pillBottom: "أرز بسمتي وعيش محمص",
  },
];

const HERO_PILL_TAGS = [
  { label: "شاورما عالصاج", href: "/menu" },
  { label: "مشاوي شامية", href: "/menu" },
  { label: "فتات دمشقية", href: "/menu" },
  { label: "مقبلات أصلية", href: "/menu" },
  { label: "ولائم العيلة", href: "/occasions" },
];

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
  const isStandalone = useIsStandalonePwa();
  const touchStartX = useRef<number | null>(null);

  const current = HERO_SLIDES[activeIdx];
  const prevSlide = () =>
    setActiveIdx((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const nextSlide = () =>
    setActiveIdx((i) => (i + 1) % HERO_SLIDES.length);

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
          - Top Bar: ONLY Logo on LEFT + Burger Menu Icon on RIGHT
          - Balanced, eye-friendly Arabic headline & subtitle
          - Main Dish Stage with clean pill callouts (no stray dots)
          - 3 Refined Dish Selector Cards with short clear labels
          - Centered editorial copy + high-contrast category pills
         ===================================================================== */}
      <div className="lg:hidden relative z-10 flex flex-col px-4 pt-4 pb-7 space-y-4">
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
            {mobileMenuOpen ? (
              <CloseIcon className="w-5 h-5" />
            ) : (
              <MenuIcon className="w-5 h-5" />
            )}
            {hydrated && count > 0 && !mobileMenuOpen && (
              <span className="absolute -bottom-0.5 -left-0.5 min-w-4.5 h-4.5 px-1 rounded-full bg-[#E8A514] text-[#18110C] text-[10px] font-black grid place-items-center ring-2 ring-[#18110C]">
                {count}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div
            dir="rtl"
            className="rounded-[24px] bg-[#18110C] text-white p-4 space-y-3 shadow-2xl border border-white/10"
          >
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

            {/* Install Web App Button inside Burger Menu Drawer */}
            {!isStandalone && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  triggerPwaInstall();
                }}
                className="w-full rounded-2xl bg-white/10 hover:bg-[#E8A514] text-[#E8A514] hover:text-[#18110C] border border-[#E8A514]/40 px-3.5 py-2.5 text-xs font-black flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <DownloadAppIcon className="w-4 h-4 shrink-0" />
                <span>تثبيت تطبيق الياسمين على موبايلك</span>
              </button>
            )}

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

        {/* Clean 3-Line Centered Headline */}
        <div className="pt-1 text-center">
          <h1 className="text-[clamp(1.35rem,6.1vw,1.85rem)] font-black leading-[1.35] tracking-tight text-[#18110C] text-center">
            <span className="block whitespace-nowrap">أصالة المذاق السوري</span>
            <span className="block whitespace-nowrap text-[#FFFDF7] drop-shadow-[0_2px_8px_rgba(24,17,12,0.22)]">
              شاورما عالصاج ومشاوي شامية
            </span>
            <span className="block whitespace-nowrap">طعم الشام الأصيل في كل لقمة</span>
          </h1>
        </div>

        {/* Center Hero Dish Visual Stage with Clean Floating Callout Pills */}
        <div className="relative w-full aspect-[4/3] rounded-[26px] overflow-hidden shadow-[0_18px_40px_-12px_rgba(24,17,12,0.45)] bg-[#18110C] ring-2 ring-[#18110C]/15">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.image}
            alt={current.titleAr}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />

          {/* Upper-Right Clean Floating Callout Pill */}
          <div className="absolute top-3.5 right-3.5 z-10 animate-float-pill">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-md text-[#18110C] px-3.5 py-1.5 text-[11px] font-black shadow-[0_8px_22px_rgba(0,0,0,0.3)] border border-[#18110C]/10">
              <span className="w-2 h-2 rounded-full bg-[#E8A514] shrink-0" />
              <span>{current.pillTop}</span>
            </div>
          </div>

          {/* Lower-Left Clean Floating Callout Pill */}
          <div
            className="absolute bottom-3.5 left-3.5 z-10 animate-float-pill"
            style={{ animationDelay: "1.2s" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#18110C]/90 backdrop-blur-md text-[#FFFDF7] px-3.5 py-1.5 text-[11px] font-black shadow-[0_8px_22px_rgba(0,0,0,0.35)] border border-[#E8A514]/50">
              <span className="w-2 h-2 rounded-full bg-[#E8A514] shrink-0" />
              <span>{current.pillBottom}</span>
            </div>
          </div>
        </div>

        {/* 3 Refined Dish Selector Cards (Framed, labeled, comfortable to the eye) */}
        <div className="grid grid-cols-3 gap-2.5">
          {HERO_SLIDES.map((slide, idx) => {
            const active = idx === activeIdx;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                aria-label={slide.titleAr}
                className={`group relative rounded-[20px] p-1 transition-all duration-300 cursor-pointer ${
                  active
                    ? "bg-[#18110C] text-[#E8A514] shadow-[0_12px_26px_-6px_rgba(24,17,12,0.5)] -translate-y-0.5"
                    : "bg-[#FFFDF7]/85 hover:bg-[#FFFDF7] text-[#18110C] shadow-xs"
                }`}
              >
                <div className="relative aspect-[4/3] w-full rounded-[15px] overflow-hidden bg-[#18110C]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.image}
                    alt={slide.titleAr}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="py-1.5 px-1 text-center">
                  <span className="block text-[11px] font-black leading-tight whitespace-nowrap">
                    {slide.shortTitleAr}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Editorial Description + Centered Category Pills */}
        <p className="text-xs sm:text-sm leading-[1.8] font-bold text-[#18110C]/90 text-center pt-0.5">
          نحضّر أطباقنا الشامية يومياً من أجود اللحوم الطازجة والتتبيلات الدمشقية العريقة، لنقدم لك مذاق الشام الأصيل ودفء الضيافة السورية في كل لقمة.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {HERO_PILL_TAGS.map((tag) => (
            <Link
              key={tag.label}
              href={tag.href}
              className="rounded-full bg-[#18110C] hover:bg-[#2B1E14] text-[#FFFDF7] px-3.5 py-1.5 text-[11px] font-extrabold transition shadow-2xs"
            >
              {tag.label}
            </Link>
          ))}
        </div>
      </div>

      {/* =====================================================================
          DESKTOP (`Web`) LOMORA HERO
          - Menu Pill on RIGHT, Logo + CTA on LEFT
          - Clean 3-line headline (no extra badge above title)
          - 3 Framed Dish Selector Cards straddling the seam
          - Full-bleed Dish Stage on Left with clean floating pills & category tags
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

          {/* Harmonious 3-Line Stacked Headline */}
          <div className="my-auto py-6">
            <h1 className="text-4xl xl:text-[42px] font-black leading-[1.28] tracking-tight text-[#18110C]">
              <span className="block whitespace-nowrap">أصالة المذاق السوري</span>
              <span className="block whitespace-nowrap text-[#FFFDF7] drop-shadow-[0_3px_14px_rgba(24,17,12,0.28)]">
                شاورما عالصاج ومشاوي شامية
              </span>
              <span className="block whitespace-nowrap">طعم الشام الأصيل في كل لقمة</span>
            </h1>
          </div>

          {/* 3 Framed Dish Selector Cards Straddling the Seam */}
          <div className="relative z-30 lg:-ml-24 xl:-ml-28 my-2">
            <div className="grid grid-cols-3 gap-4 max-w-[470px]">
              {HERO_SLIDES.map((slide, idx) => {
                const active = idx === activeIdx;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    aria-label={slide.titleAr}
                    className={`group relative rounded-[22px] p-1.5 transition-all duration-300 cursor-pointer ${
                      active
                        ? "bg-[#18110C] text-[#E8A514] shadow-[0_20px_45px_rgba(0,0,0,0.45)] -translate-y-1"
                        : "bg-[#FFFDF7]/90 hover:bg-[#FFFDF7] text-[#18110C] shadow-md"
                    }`}
                  >
                    <div className="aspect-[4/3] w-full rounded-[16px] overflow-hidden bg-[#18110C]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={slide.image}
                        alt={slide.titleAr}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="py-2 px-1 text-center">
                      <span className="block text-xs font-black whitespace-nowrap">
                        {slide.shortTitleAr}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Editorial Description Paragraph */}
          <p className="text-sm font-extrabold text-[#18110C]/90 max-w-md leading-[1.8] pt-4">
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
          <div
            dir="ltr"
            className="relative z-20 flex items-center justify-between gap-4"
          >
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

          {/* Center Floating Callout Pills over the Dish */}
          <div className="relative z-20 my-auto flex flex-col gap-20 pr-8 pl-4 pointer-events-none">
            <div className="self-end ml-8 animate-float-pill">
              <div className="inline-flex items-center gap-2.5 rounded-full bg-white/95 backdrop-blur-md text-[#18110C] px-4 py-2.5 text-xs font-black shadow-[0_14px_34px_rgba(0,0,0,0.4)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E8A514]" />
                <span>{current.pillTop}</span>
              </div>
            </div>

            <div
              className="self-end ml-14 animate-float-pill"
              style={{ animationDelay: "1.3s" }}
            >
              <div className="inline-flex items-center gap-2.5 rounded-full bg-[#18110C]/90 backdrop-blur-md text-[#FFFDF7] border border-[#E8A514]/50 px-4 py-2.5 text-xs font-black shadow-[0_14px_34px_rgba(0,0,0,0.45)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E8A514]" />
                <span>{current.pillBottom}</span>
              </div>
            </div>
          </div>

          {/* Bottom-Left Category Pill Tags */}
          <div className="relative z-20 flex flex-wrap items-center justify-end gap-2 pt-4">
            {HERO_PILL_TAGS.map((tag) => (
              <Link
                key={tag.label}
                href={tag.href}
                className="rounded-full border border-white/30 bg-black/50 backdrop-blur-md hover:bg-[#E8A514] hover:border-[#E8A514] hover:text-[#18110C] px-4 py-1.5 text-xs font-bold text-white transition"
              >
                {tag.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
