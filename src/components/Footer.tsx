"use client";

import Link from "next/link";
import { useState } from "react";
import type { Branch, Settings } from "@/lib/types";
import { PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";

export default function Footer({ branches, settings }: { branches: Branch[]; settings: Settings }) {
  const [selectedId, setSelectedId] = useState<string>(branches[0]?.id || "");
  const activeBranch = branches.find((b) => b.id === selectedId) || branches[0];

  return (
    <footer className="relative bg-[#120D09] text-white pt-10 sm:pt-14 pb-8 overflow-hidden">
      {/* Subtle Golden Shawarma Pattern Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'url("/images/shawarma-pattern-gold.webp")',
          backgroundSize: "480px 480px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =================================================================
            1. TOP NAVIGATION ROW (Matches LOMORA Footer Top Links)
           ================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
          <nav className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 text-xs sm:text-sm font-bold text-white/80">
            <Link href="/menu" className="hover:text-[#E8A818] transition flex items-center justify-between sm:justify-start gap-2">
              <span>المنيو الكامل</span>
              <span dir="ltr" className="font-en text-[11px] text-white/45">Collection</span>
            </Link>
            <Link href="/offers" className="hover:text-[#E8A818] transition flex items-center justify-between sm:justify-start gap-2">
              <span>العروض والبوكسات</span>
              <span dir="ltr" className="font-en text-[11px] text-white/45">Offers</span>
            </Link>
            <Link href="/delivery" className="hover:text-[#E8A818] transition flex items-center justify-between sm:justify-start gap-2">
              <span>التوصيل والمناطق</span>
              <span dir="ltr" className="font-en text-[11px] text-white/45">Delivery</span>
            </Link>
            <Link href="/about" className="hover:text-[#E8A818] transition flex items-center justify-between sm:justify-start gap-2">
              <span>حكاية الياسمين</span>
              <span dir="ltr" className="font-en text-[11px] text-white/45">About</span>
            </Link>
            <Link href="/contact" className="hover:text-[#E8A818] transition flex items-center justify-between sm:justify-start gap-2">
              <span>تواصل معنا</span>
              <span dir="ltr" className="font-en text-[11px] text-white/45">Contact</span>
            </Link>
          </nav>

          {/* Arabic Right / English Left Direct Contact Line */}
          <div className="flex items-center justify-between sm:justify-end gap-4 text-xs">
            <a
              href="tel:01010400507"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#E8A818] text-[#18110C] font-black px-4 py-1.5"
            >
              <PhoneIcon className="w-3.5 h-3.5" />
              <span dir="ltr" className="font-en">01010400507</span>
            </a>
            <a
              href={settings.facebook}
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
              className="font-en text-white/70 hover:text-[#E8A818] font-bold transition"
            >
              Facebook • 47K
            </a>
          </div>
        </div>

        {/* =================================================================
            2. DELIVERY ZONE DROPDOWN & BILINGUAL INFO CARD (Arabic Right / English Left)
           ================================================================= */}
        {activeBranch && (
          <div className="my-8 rounded-[24px] bg-white/[0.04] border border-white/10 p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              <div className="lg:col-span-5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-[#E8A818]">اختر منطقة التوصيل في القاهرة</span>
                  <span dir="ltr" className="font-en text-white/50 text-[11px]">DELIVERY ZONES</span>
                </div>
                <select
                  value={activeBranch.id}
                  onChange={(e) => setSelectedId(e.target.value)}
                  aria-label="اختر منطقة التوصيل"
                  className="w-full rounded-xl bg-[#18110C] border border-white/15 px-3.5 py-2.5 text-xs sm:text-sm font-bold text-white focus:border-[#E8A818] outline-none"
                >
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-4 space-y-1.5 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-white/90 font-bold text-right">{activeBranch.address}</span>
                  <span dir="ltr" className="font-en text-white/45 text-[11px] shrink-0">Cairo, EG</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-white/65 text-right">{activeBranch.hours}</span>
                  <span dir="ltr" className="font-en text-[#E8A818] text-[11px] shrink-0">Daily</span>
                </div>
              </div>

              {/* Paired Buttons Side-by-Side */}
              <div className="lg:col-span-3 grid grid-cols-2 gap-2">
                <Link
                  href="/menu"
                  className="rounded-xl bg-[#E8A818] hover:bg-[#D99B10] text-[#18110C] font-black text-xs py-2.5 text-center transition"
                >
                  اطلب أونلاين الآن
                </Link>
                <a
                  href={`https://wa.me/${activeBranch.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs py-2.5 flex items-center justify-center gap-1.5 transition"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>واتساب</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================
            3. MONUMENTAL LOMORA EDGE-TO-EDGE WORDMARK ("ALYASMIN") + OVERLAPPING PLATTERS STAGE
           ================================================================= */}
        <div className="pt-4 sm:pt-6 relative">
          {/* Arabic Brand Lockup Centered Above the Giant Wordmark */}
          <div className="flex items-center justify-center mb-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-horizontal.png"
              alt="الياسمين للمأكولات السورية"
              className="h-12 sm:h-16 w-auto object-contain"
            />
          </div>

          {/* Edge-to-Edge 100% Width Single-Line Wordmark matching `LOMORA` Footer */}
          <div
            dir="ltr"
            className="font-en w-full text-center font-extrabold tracking-[-0.04em] leading-[0.84] text-white select-none whitespace-nowrap"
            style={{ fontSize: "clamp(3.3rem, 16.5vw, 13.5rem)" }}
          >
            ALYASMIN
          </div>

          {/* Overlapping Glowing Syrian Dishes Stage at Bottom of Wordmark */}
          <div className="relative z-10 -mt-3 sm:-mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 max-w-5xl mx-auto px-2">
            {[
              { title: "شاورما عربي دمشقي", image: "/images/products/shawarma-arabi-chicken.webp", href: "/menu#cat-shawarma" },
              { title: "مشاوي مشكلة عالفحم", image: "/images/products/mixed-grill-syrian.webp", href: "/menu#cat-grills" },
              { title: "فتة شاورما بالسمن", image: "/images/products/fatteh-chicken.webp", href: "/menu#cat-fatteh" },
              { title: "كبة ومقبلات شامية", image: "/images/products/kibbeh-shamiya.webp", href: "/menu#cat-appetizers" },
            ].map((item, idx) => (
              <Link
                key={item.title}
                href={item.href}
                className={`group relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E8A818]/35 bg-[#18110C] shadow-[0_18px_40px_rgba(0,0,0,0.75)] ${
                  idx % 2 === 1 ? "sm:translate-y-3" : ""
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute inset-x-2.5 bottom-2 text-[11px] font-extrabold text-[#FAF6EC] truncate text-center">
                  {item.title}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* =================================================================
            4. CENTERED COPYRIGHT & POWERED BY CHAMELEON BAR
           ================================================================= */}
        <div className="mt-10 sm:mt-14 pt-6 border-t border-white/10 flex flex-col items-center justify-center gap-2 text-center text-xs text-white/55">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span>© {new Date().getFullYear()} مطعم الياسمين للمأكولات السورية (Alyasmin). جميع الحقوق محفوظة.</span>
            <span className="opacity-40">•</span>
            <a href="mailto:alyasminaldimashqi24@gmail.com" dir="ltr" className="font-en hover:text-[#E8A818] transition">
              alyasminaldimashqi24@gmail.com
            </a>
          </div>
          <a
            href="https://chameleon.vision"
            target="_blank"
            rel="noopener noreferrer"
            dir="ltr"
            className="font-en inline-flex items-center gap-1.5 text-[11px] font-bold text-white/50 hover:text-[#E8A818] transition"
          >
            <span>Powered by</span>
            <span className="text-[#E8A818] font-extrabold">Chameleon Vision</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
