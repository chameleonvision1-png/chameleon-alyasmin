"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useStore } from "./store";
import { formatPrice } from "@/lib/format";
import { openMenuQrModal } from "./MenuQrModal";
import { triggerPwaInstall, useIsStandalonePwa } from "./PwaInstallModal";
import {
  BagIcon,
  ChevronIcon,
  CloseIcon,
  DownloadAppIcon,
  MenuIcon,
  PhoneIcon,
  QrCodeIcon,
  WhatsAppIcon,
} from "./icons";

const nav = [
  { href: "/", label: "الرئيسية" },
  { href: "/menu", label: "المنيو الكامل" },
  { href: "/offers", label: "العروض والبوكسات" },
  { href: "/delivery", label: "مناطق التوصيل" },
  { href: "/occasions", label: "ولائم العزومات" },
  { href: "/about", label: "حكاية الياسمين" },
  { href: "/contact", label: "تواصل معنا" },
];

export default function Header() {
  const pathname = usePathname();
  const { count, subtotal, hydrated } = useStore();
  const [open, setOpen] = useState(false);
  const isStandalone = useIsStandalonePwa();

  // On the Homepage (`/`), LOMORA embeds the navbar directly inside the Hero stage
  if (pathname === "/") {
    return null;
  }

  return (
    <>
      <header
        className="sticky top-0 z-40 h-16 lg:h-[72px] bg-[#E8A514] border-b border-[#18110C]/15 shadow-sm"
        style={{
          backgroundImage: 'url("/images/shawarma-pattern-gold.webp")',
          backgroundSize: "420px 420px",
        }}
      >
        {/* dir="ltr" guarantees Logo is always on the LEFT and Burger Menu is at FAR RIGHT */}
        <div
          dir="ltr"
          className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3"
        >
          {/* LEFT: Official Alyasmin Shadowed Logo */}
          <Link href="/" className="flex items-center shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-horizontal-shadow.png"
              alt="مطعم الياسمين للمأكولات السورية"
              className="h-10 sm:h-11 w-auto object-contain"
            />
          </Link>

          {/* RIGHT: Desktop Pill Nav + QR + Cart + Burger Menu at FAR RIGHT */}
          <div className="flex items-center gap-2">
            <nav dir="rtl" className="hidden lg:flex items-center gap-1 rounded-full bg-[#18110C] text-white px-3 py-1.5 shadow-md">
              {nav.map((n) => {
                const active = pathname === n.href;
                if (n.href === "/menu") {
                  return (
                    <div
                      key={n.href}
                      className={`inline-flex items-center rounded-full transition ${
                        active
                          ? "bg-[#E8A514] text-[#18110C]"
                          : "bg-white/10 text-white hover:bg-white/15"
                      }`}
                    >
                      <Link
                        href={n.href}
                        className="pr-3.5 pl-2 py-1.5 text-xs font-extrabold"
                      >
                        {n.label}
                      </Link>
                      <button
                        type="button"
                        onClick={openMenuQrModal}
                        title="باركود ومشاركة المنيو (QR)"
                        aria-label="باركود ومشاركة المنيو"
                        className={`pl-2.5 pr-2 py-1.5 border-r text-[11px] font-black inline-flex items-center gap-1 transition cursor-pointer rounded-l-full ${
                          active
                            ? "border-[#18110C]/20 text-[#18110C] hover:bg-black/10"
                            : "border-white/15 text-[#E8A514] hover:bg-white/10"
                        }`}
                      >
                        <QrCodeIcon className="w-3.5 h-3.5" />
                        <span className="font-en">QR</span>
                      </button>
                    </div>
                  );
                }
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition ${
                      active
                        ? "bg-[#E8A514] text-[#18110C]"
                        : "text-white/90 hover:text-[#E8A514]"
                    }`}
                  >
                    {n.label}
                  </Link>
                );
              })}
            </nav>

            <a
              href="tel:01010400507"
              className="hidden lg:inline-flex items-center gap-2 h-10 rounded-full bg-white hover:bg-[#FFFDF7] text-[#18110C] px-4 text-xs font-black transition shadow-sm"
            >
              <PhoneIcon className="w-3.5 h-3.5 text-[#B87B06]" />
              <span dir="ltr" className="font-en">01010400507</span>
            </a>

            <Link
              href="/cart"
              dir="rtl"
              aria-label="سلة الطلبات"
              className="hidden lg:inline-flex relative items-center gap-1.5 h-10 rounded-full bg-[#18110C] text-white px-4 text-xs font-extrabold shadow-md hover:bg-[#2A1E15] transition"
            >
              <BagIcon className="w-4 h-4 text-[#E8A514]" />
              <span>السلة</span>
              {count > 0 && (
                <span className="min-w-5 h-5 px-1.5 rounded-full bg-[#E8A514] text-[#18110C] text-[11px] font-black grid place-items-center">
                  {count}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="القائمة"
              className="lg:hidden relative w-10 h-10 rounded-full bg-[#18110C] text-[#E8A514] grid place-items-center shadow-md shrink-0 active:scale-95 transition cursor-pointer"
            >
              {open ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              {hydrated && count > 0 && !open && (
                <span className="absolute -bottom-0.5 -left-0.5 min-w-4.5 h-4.5 px-1 rounded-full bg-[#E8A514] text-[#18110C] text-[10px] font-black grid place-items-center ring-2 ring-[#18110C]">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          className="lg:hidden fixed inset-0 top-16 z-40 bg-black/55 backdrop-blur-xs"
          onClick={() => setOpen(false)}
        >
          <div
            dir="rtl"
            className="bg-[#18110C] text-white rounded-b-[28px] border-t border-white/10 p-4 space-y-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Highlighted Menu + QR Action Row at Top of Burger Menu */}
            <div className="flex items-center gap-2 pb-2 border-b border-white/10">
              <Link
                href="/menu"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-2xl bg-[#E8A514] text-[#18110C] py-2.5 px-3.5 text-xs font-black flex items-center justify-center gap-2 shadow-md"
              >
                <span>تصفح المنيو الكامل</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openMenuQrModal();
                }}
                className="rounded-2xl bg-white/10 hover:bg-[#E8A514] text-[#E8A514] hover:text-[#18110C] border border-[#E8A514]/40 py-2.5 px-3.5 text-xs font-black inline-flex items-center gap-1.5 transition cursor-pointer shrink-0"
              >
                <QrCodeIcon className="w-4 h-4" />
                <span>باركود المنيو QR</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {nav.map((n) => {
                const active = pathname === n.href;
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className={`px-3.5 py-2.5 rounded-2xl text-xs font-black flex items-center justify-between transition ${
                      active
                        ? "bg-[#E8A514] text-[#18110C] shadow-md"
                        : "bg-white/10 text-white hover:bg-white/15"
                    }`}
                  >
                    <span>{n.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Cart Link inside Burger Menu Drawer */}
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
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
                  setOpen(false);
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
        </div>
      )}
    </>
  );
}
