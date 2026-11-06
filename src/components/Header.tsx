"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useStore } from "./store";
import { BagIcon, CloseIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from "./icons";

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
  const { count } = useStore();
  const [open, setOpen] = useState(false);

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

          {/* RIGHT: Desktop Pill Nav + Cart + Burger Menu at FAR RIGHT */}
          <div className="flex items-center gap-2">
            <nav dir="rtl" className="hidden lg:flex items-center gap-1 rounded-full bg-[#18110C] text-white px-3 py-1.5 shadow-md">
              {nav.map((n) => {
                const active = pathname === n.href;
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
              className="hidden sm:inline-flex items-center gap-2 h-10 rounded-full bg-white hover:bg-[#FFFDF7] text-[#18110C] px-4 text-xs font-black transition shadow-sm"
            >
              <PhoneIcon className="w-3.5 h-3.5 text-[#B87B06]" />
              <span dir="ltr" className="font-en">01010400507</span>
            </a>

            <Link
              href="/cart"
              dir="rtl"
              aria-label="سلة الطلبات"
              className="relative inline-flex items-center gap-1.5 h-10 rounded-full bg-[#18110C] text-white px-4 text-xs font-extrabold shadow-md hover:bg-[#2A1E15] transition"
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
              className="lg:hidden w-10 h-10 rounded-full bg-[#18110C] text-[#E8A514] grid place-items-center shadow-md shrink-0 active:scale-95 transition cursor-pointer"
            >
              {open ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
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
