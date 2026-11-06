"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "./store";
import { ArrowUpLeftIcon, CartIcon, CloseIcon, MenuIcon, PhoneIcon, PinIcon, QrCodeIcon } from "./icons";
import MenuQrModal from "./MenuQrModal";

const NAV = [
  { href: "/", label: "الرئيسية", labelEn: "Home" },
  { href: "/menu", label: "المنيو", labelEn: "Menu" },
  { href: "/offers", label: "العروض", labelEn: "Offers" },
  { href: "/delivery", label: "التوصيل", labelEn: "Delivery" },
  { href: "/occasions", label: "العزومات", labelEn: "Feasts" },
  { href: "/about", label: "قصتنا", labelEn: "About" },
  { href: "/contact", label: "تواصل", labelEn: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { branch, openPicker, count, bump } = useStore();
  const [drawer, setDrawer] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(true);
  const [catsOpen, setCatsOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawer(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (drawer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  return (
    <>
      {/* =====================================================================
          LOMORA-STYLE TOP BAR (Dark Walnut #18110C with Pill Nav on Desktop & Minimal Trigger on Mobile)
         ===================================================================== */}
      <header className="sticky top-0 z-40 bg-[#18110C]/95 backdrop-blur-xl text-white border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 lg:h-16 flex items-center justify-between gap-3">
          {/* Desktop Left / RTL Start: Translucent Pill Container with Jasmine Emblem + Nav Links (Matches LOMORA Web Top Pill) */}
          <div className="hidden lg:flex items-center gap-5 rounded-full border border-white/15 bg-white/[0.05] px-4 py-1.5">
            <Link href="/" className="flex items-center gap-2.5 pl-2 border-l border-white/10 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-emblem.png"
                alt="زهرة الياسمين"
                className="w-7 h-7 object-contain transition-transform duration-300 group-hover:rotate-45"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-horizontal.png"
                alt="الياسمين"
                className="h-6 w-auto object-contain"
              />
            </Link>

            <nav className="flex items-center gap-1">
              {NAV.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                      active
                        ? "bg-[#E8A818] text-[#18110C]"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Mobile Brand Lockup (Jasmine Flower Emblem + الياسمين Calligraphy) */}
          <Link href="/" className="flex lg:hidden items-center gap-2 min-w-0 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-horizontal.png"
              alt="مطعم الياسمين للمأكولات السورية"
              className="h-8 w-auto object-contain"
            />
          </Link>

          {/* Actions Side: Delivery Zone Pill, QR Button, Cart Pill, and LOMORA White Contact/Order Pill */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={openPicker}
              className="hidden md:flex items-center gap-1.5 text-xs bg-white/[0.06] hover:bg-white/10 border border-white/15 rounded-full px-3.5 py-1.5 transition"
              title="اختر منطقة التوصيل"
            >
              <PinIcon className="w-3.5 h-3.5 text-[#E8A818] shrink-0" />
              <span className="font-bold text-white/90 truncate max-w-[140px]">
                {branch ? branch.city : "القاهرة"}
              </span>
            </button>

            <button
              onClick={() => setQrOpen(true)}
              aria-label="باركود المنيو"
              title="باركود المنيو"
              className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/15 border border-white/15 text-[#E8A818] grid place-items-center transition active:scale-95"
            >
              <QrCodeIcon className="w-4 h-4" />
            </button>

            {/* Cart Button */}
            <Link
              href="/cart"
              aria-label="سلة الطلبات"
              key={bump}
              className={`relative flex items-center gap-1.5 rounded-full bg-[#E8A818] hover:bg-[#D99B10] text-[#18110C] px-3.5 py-1.5 font-extrabold text-xs transition ${
                bump ? "animate-pop" : ""
              }`}
            >
              <CartIcon className="w-4 h-4" />
              <span className="hidden sm:inline">السلة</span>
              <span className="min-w-5 h-5 px-1 rounded-full bg-[#18110C] text-[#E8A818] text-[11px] font-black grid place-items-center">
                {count}
              </span>
            </Link>

            {/* Desktop LOMORA White Pill CTA with Dark Circular Arrow ("Contact us" / "اطلب الآن") */}
            <a
              href="tel:01010400507"
              dir="ltr"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white hover:bg-[#FAF6EC] text-[#18110C] pl-4 pr-1.5 py-1 text-xs font-extrabold transition shadow-sm"
            >
              <span className="font-en tracking-tight">01010400507</span>
              <span className="w-6 h-6 rounded-full bg-[#18110C] text-[#E8A818] grid place-items-center">
                <ArrowUpLeftIcon className="w-3.5 h-3.5" />
              </span>
            </a>

            {/* Mobile Minimal 2-Line Menu Trigger (Matches LOMORA Mobile Top-Right) */}
            <button
              onClick={() => setDrawer(true)}
              aria-label="فتح القائمة"
              className="lg:hidden w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/15 border border-white/15 grid place-items-center text-white transition"
            >
              <MenuIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <MenuQrModal open={qrOpen} onClose={() => setQrOpen(false)} />

      {/* =====================================================================
          MOBILE DRAWER (Zero Horizontal Scroll + Clean Accordions)
         ===================================================================== */}
      {drawer && (
        <div
          className="fixed inset-0 z-50 lg:hidden bg-black/75 backdrop-blur-sm flex justify-end overflow-hidden"
          onClick={() => setDrawer(false)}
        >
          <div
            className="w-[86%] max-w-[340px] bg-[#18110C] text-white h-dvh p-4 flex flex-col justify-between overflow-y-auto overflow-x-hidden shadow-2xl border-r border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-3 min-w-0">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-horizontal.png"
                  alt="مطعم الياسمين"
                  className="h-9 w-auto object-contain"
                />
                <button
                  onClick={() => setDrawer(false)}
                  aria-label="إغلاق القائمة"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center shrink-0"
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Delivery Zone Selector */}
              <button
                onClick={() => {
                  setDrawer(false);
                  openPicker();
                }}
                className="w-full flex items-center justify-between gap-2 bg-white/[0.05] border border-white/15 rounded-2xl p-3 text-right min-w-0"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-[#E8A818] text-[#18110C] grid place-items-center shrink-0">
                    <PinIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] text-white/60 font-bold">نطاق التوصيل الحالي</div>
                    <div className="font-extrabold text-xs text-white truncate">
                      {branch ? `${branch.city}` : "اختر منطقتك في القاهرة"}
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-black text-[#E8A818] bg-[#E8A818]/15 px-2.5 py-1 rounded-lg shrink-0">
                  تغيير
                </span>
              </button>

              {/* Accordion 1: Pages */}
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setNavOpen((v) => !v)}
                  className="w-full flex items-center justify-between px-3.5 py-3 text-xs font-extrabold text-white hover:bg-white/5 transition"
                >
                  <span>صفحات الموقع</span>
                  <span className="text-[#E8A818] text-sm font-black leading-none">
                    {navOpen ? "−" : "+"}
                  </span>
                </button>
                {navOpen && (
                  <nav className="px-2 pb-2 grid grid-cols-2 gap-1.5 border-t border-white/10 pt-2">
                    {NAV.map((item) => {
                      const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setDrawer(false)}
                          className={`flex items-center justify-between px-3 py-2 rounded-xl font-bold text-xs transition ${
                            active
                              ? "bg-[#E8A818] text-[#18110C]"
                              : "bg-white/[0.04] text-white/85 hover:bg-white/10"
                          }`}
                        >
                          <span className="truncate">{item.label}</span>
                          <span dir="ltr" className="font-en text-[10px] opacity-60">
                            {item.labelEn}
                          </span>
                        </Link>
                      );
                    })}
                  </nav>
                )}
              </div>

              {/* Accordion 2: Quick Syrian Menu Categories */}
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setCatsOpen((v) => !v)}
                  className="w-full flex items-center justify-between px-3.5 py-3 text-xs font-extrabold text-white hover:bg-white/5 transition"
                >
                  <span>أقسام المنيو السوري</span>
                  <span className="text-[#E8A818] text-sm font-black leading-none">
                    {catsOpen ? "−" : "+"}
                  </span>
                </button>
                {catsOpen && (
                  <div className="px-2 pb-2 grid grid-cols-2 gap-1.5 border-t border-white/10 pt-2">
                    {[
                      { name: "الشاورما السورية", href: "/menu#cat-shawarma" },
                      { name: "المشاوي الشامية", href: "/menu#cat-grills" },
                      { name: "الفتات الدمشقية", href: "/menu#cat-fatteh" },
                      { name: "المقبلات السورية", href: "/menu#cat-appetizers" },
                      { name: "الساندوتشات", href: "/menu#cat-sandwiches" },
                      { name: "الوجبات العائلية", href: "/menu#cat-family" },
                    ].map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setDrawer(false)}
                        className="px-2.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/10 text-xs font-bold text-white/85 truncate"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Direct Actions */}
            <div className="pt-3 border-t border-white/10 space-y-2 shrink-0">
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/menu"
                  onClick={() => setDrawer(false)}
                  className="rounded-xl bg-[#E8A818] text-[#18110C] font-black text-xs py-2.5 text-center"
                >
                  شاهد المنيو
                </Link>
                <a
                  href="tel:01010400507"
                  className="rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs py-2.5 flex items-center justify-center gap-1.5 border border-white/15"
                >
                  <PhoneIcon className="w-3.5 h-3.5 text-[#E8A818]" />
                  <span dir="ltr" className="font-en">01010400507</span>
                </a>
              </div>
              <p className="text-[11px] text-center text-white/45">
                مطعم الياسمين للمأكولات السورية — القاهرة، مصر
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
