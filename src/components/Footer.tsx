"use client";

import Link from "next/link";
import { useState } from "react";
import type { Branch } from "@/lib/types";
import { openMenuQrModal } from "./MenuQrModal";
import { FacebookIcon, MailIcon, PhoneIcon, PinIcon, QrCodeIcon, WhatsAppIcon } from "./icons";

export default function Footer({
  branches = [],
}: {
  branches?: Branch[];
  settings?: unknown;
}) {
  const [selectedBranchId, setSelectedBranchId] = useState<string>(
    branches[0]?.id ?? ""
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedBranch =
    branches.find((b) => b.id === selectedBranchId) ?? branches[0];

  return (
    <footer className="relative bg-[#140E09] text-white overflow-hidden rounded-t-[32px] mt-10">
      {/* Subtle Golden Shawarma Pattern Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'url("/images/shawarma-pattern-gold.webp")',
          backgroundSize: "480px 480px",
        }}
      />

      {/* Warm Golden Spotlight behind the Wordmark & Dishes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-0 h-[360px] bg-gradient-to-t from-[#E8A514]/20 via-[#E8A514]/5 to-transparent"
      />

      {/* =====================================================================
          1. TOP NAVIGATION + LOCATION & DELIVERY ZONES + CONTACT BAR
         ===================================================================== */}
      <div className="relative z-20 mx-auto max-w-7xl px-5 sm:px-8 pt-10 pb-6 space-y-8">
        {/* Top Row: Official Logo on Left + 4 Minimal Links on Right */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-5 sm:gap-8 text-xs sm:text-sm font-extrabold text-white/85">
            <Link href="/menu" className="hover:text-[#E8A514] transition">
              المنيو الكامل
            </Link>
            <Link href="/offers" className="hover:text-[#E8A514] transition">
              العروض والبوكسات
            </Link>
            <Link href="/delivery" className="hover:text-[#E8A514] transition">
              مناطق التوصيل
            </Link>
            <Link href="/occasions" className="hover:text-[#E8A514] transition">
              ولائم العزومات
            </Link>
            <Link href="/about" className="hover:text-[#E8A514] transition">
              عن الياسمين
            </Link>
            <Link href="/contact" className="hover:text-[#E8A514] transition">
              تواصل معنا
            </Link>
            <button
              type="button"
              onClick={openMenuQrModal}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#E8A514]/15 hover:bg-[#E8A514] text-[#E8A514] hover:text-[#18110C] border border-[#E8A514]/35 px-3.5 py-1.5 text-xs font-black transition cursor-pointer"
            >
              <QrCodeIcon className="w-3.5 h-3.5" />
              <span>باركود المنيو QR</span>
            </button>
          </div>

          <Link href="/" className="self-end sm:self-auto shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-horizontal-shadow.png"
              alt="مطعم الياسمين للمأكولات السورية"
              className="h-11 sm:h-12 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Location, Delivery Zone Selector & Direct Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Location & Delivery Zone Dropdown Card (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-white/[0.05] border border-white/12 p-4 sm:p-5 space-y-3.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-[#E8A514] font-black text-xs sm:text-sm">
                <PinIcon className="w-4 h-4 shrink-0" />
                <span>الموقع ومناطق التوصيل — القاهرة، مصر</span>
              </div>
              <span
                dir="ltr"
                className="font-en text-[11px] font-bold text-white/50 uppercase tracking-wider"
              >
                LOCATION &amp; DELIVERY
              </span>
            </div>

            {selectedBranch ? (
              <div className="space-y-2.5">
                {/* Interactive Delivery Zone Dropdown Button */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((v) => !v)}
                    className="w-full rounded-xl bg-[#1E150E] hover:bg-[#271C13] border border-[#E8A514]/35 px-4 py-3 flex items-center justify-between gap-2 transition cursor-pointer"
                  >
                    <span className="flex items-center gap-2 min-w-0">
                      <PinIcon className="w-4 h-4 text-[#E8A514] shrink-0" />
                      <span className="font-black text-xs sm:text-sm text-white truncate">
                        {selectedBranch.name}
                      </span>
                    </span>
                    <span className="rounded-full bg-[#E8A514] text-[#18110C] text-[11px] font-black px-2.5 py-0.5 shrink-0">
                      اختر منطقتك ▾
                    </span>
                  </button>

                  {dropdownOpen && (
                    <div className="mt-1.5 rounded-xl bg-[#1E150E] border border-[#E8A514]/40 p-1.5 shadow-2xl grid gap-1 relative z-30">
                      {branches.map((b) => {
                        const active = b.id === selectedBranch.id;
                        return (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => {
                              setSelectedBranchId(b.id);
                              setDropdownOpen(false);
                            }}
                            className={`w-full px-3.5 py-2.5 rounded-lg flex items-center justify-between gap-2 text-xs font-extrabold transition cursor-pointer ${
                              active
                                ? "bg-[#E8A514] text-[#18110C]"
                                : "text-white/85 hover:bg-white/10"
                            }`}
                          >
                            <span className="text-right">{b.name}</span>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full ${
                                active
                                  ? "bg-[#18110C] text-[#E8A514]"
                                  : "bg-white/10 text-white/70"
                              }`}
                            >
                              {b.city}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Selected Zone Address, Map Link & Hours */}
                <div className="rounded-xl bg-black/35 border border-white/10 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1 text-right">
                    <div className="text-xs font-bold text-white/90 leading-relaxed">
                      {selectedBranch.address}
                    </div>
                    <div className="text-[11px] text-[#E8A514] font-semibold">
                      مواعيد العمل: {selectedBranch.hours}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto" dir="ltr">
                    <a
                      href={selectedBranch.mapUrl || "https://maps.google.com/?q=Cairo,Egypt"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-white/10 hover:bg-[#E8A514] hover:text-[#18110C] border border-white/20 px-3.5 py-1.5 text-xs font-black text-white transition"
                    >
                      Google Maps ↗
                    </a>
                    <a
                      href={`tel:${selectedBranch.phone}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#E8A514] text-[#18110C] px-3.5 py-1.5 text-xs font-black hover:bg-[#F3B72B] transition"
                    >
                      <PhoneIcon className="w-3.5 h-3.5" />
                      <span>{selectedBranch.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-xs text-white/75">
                القاهرة، مصر — التوصيل متاح لجميع المناطق عبر الرقم 01010400507
              </div>
            )}
          </div>

          {/* Direct Contact & Social Channels Card (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-white/[0.05] border border-white/12 p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[#E8A514] font-black text-xs sm:text-sm">
                الطلب المباشر والتواصل الرسمي
              </span>
              <span
                dir="ltr"
                className="font-en text-[11px] font-bold text-white/50 uppercase tracking-wider"
              >
                CONTACT US
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href="tel:01010400507"
                className="rounded-xl bg-[#E8A514] hover:bg-[#F3B72B] text-[#18110C] p-3 flex items-center justify-center gap-2 font-black text-xs transition shadow"
              >
                <PhoneIcon className="w-4 h-4 shrink-0" />
                <span dir="ltr" className="font-en">01010400507</span>
              </a>

              <a
                href="https://wa.me/201010400507"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-[#1E150E] hover:bg-white/15 border border-[#E8A514]/40 text-white p-3 flex items-center justify-center gap-2 font-black text-xs transition"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#E8A514] shrink-0" />
                <span>طلب واتساب</span>
              </a>
            </div>

            <div className="pt-1 space-y-2 text-xs">
              <a
                href="mailto:alyasminaldimashqi24@gmail.com"
                className="flex items-center justify-between gap-2 rounded-xl bg-black/30 px-3.5 py-2.5 text-white/80 hover:text-[#E8A514] transition"
              >
                <span className="inline-flex items-center gap-2 font-bold">
                  <MailIcon className="w-3.5 h-3.5 text-[#E8A514]" />
                  <span>البريد الإلكتروني</span>
                </span>
                <span dir="ltr" className="font-en text-[11px] font-semibold truncate">
                  alyasminaldimashqi24@gmail.com
                </span>
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61555928014156"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 rounded-xl bg-black/30 px-3.5 py-2.5 text-white/80 hover:text-[#E8A514] transition"
              >
                <span className="inline-flex items-center gap-2 font-bold">
                  <FacebookIcon className="w-3.5 h-3.5 text-[#E8A514]" />
                  <span>فيسبوك الرسمي (47K+ متابع)</span>
                </span>
                <span dir="ltr" className="font-en text-[11px] font-bold text-[#E8A514]">
                  Facebook ↗
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. MONUMENTAL EDGE-TO-EDGE "ALYASMIN" WORDMARK + OVERLAPPING DISHES STAGE
         ===================================================================== */}
      <div className="relative z-10 pt-2 pb-6 sm:pb-8 select-none overflow-hidden">
        <div
          dir="ltr"
          className="font-en text-center font-black tracking-[-0.04em] leading-[0.82] text-[#E8A514] whitespace-nowrap px-1"
          style={{ fontSize: "clamp(3.3rem, 16.6vw, 13.8rem)" }}
        >
          ALYASMIN
        </div>

        {/* Overlapping Warm-Lit Platters Stage directly in front of the Giant Wordmark */}
        <div className="mx-auto max-w-6xl px-4 sm:px-8 -mt-4 sm:-mt-10 lg:-mt-14 relative z-20">
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 sm:gap-4 items-end">
            {[
              {
                src: "/images/products/shawarma-arabi-chicken.webp",
                label: "شاورما عربي",
                h: "h-24 sm:h-36",
                hideMobile: false,
              },
              {
                src: "/images/products/shawarma-beef-saj.webp",
                label: "شاورما صاج",
                h: "h-28 sm:h-44",
                hideMobile: true,
              },
              {
                src: "/images/products/mixed-grill-syrian.webp",
                label: "مشاوي الياسمين",
                h: "h-32 sm:h-48",
                hideMobile: false,
              },
              {
                src: "/images/products/kibbeh-shamiya.webp",
                label: "كبة شامية",
                h: "h-28 sm:h-42",
                hideMobile: true,
              },
              {
                src: "/images/products/broast-family-meal.webp",
                label: "بروستد سوري",
                h: "h-24 sm:h-36",
                hideMobile: false,
              },
            ].map((platter, idx) => (
              <Link
                key={idx}
                href="/menu"
                className={`${platter.hideMobile ? "hidden sm:block" : "block"} group relative ${platter.h} rounded-2xl overflow-hidden border border-[#E8A514]/35 shadow-[0_20px_50px_rgba(0,0,0,0.85)] bg-[#23170E]`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={platter.src}
                  alt={platter.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute inset-x-2 bottom-2 text-center">
                  <span className="text-[10px] sm:text-xs font-extrabold text-[#E8A514] drop-shadow">
                    {platter.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================================
          3. BOTTOM COPYRIGHT + ADMIN LINK + "POWERED BY CHAMELEON" PILL BADGE
             Exact match to all Chameleon Subdomains
         ===================================================================== */}
      <div className="relative z-20 mx-auto max-w-7xl px-5 sm:px-8 py-5 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-3.5 text-xs text-white/65 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-1.5 sm:gap-3">
          <span className="font-bold text-white/80">
            جميع الحقوق محفوظة — مطعم الياسمين للمأكولات السورية • القاهرة
          </span>
          <div className="flex items-center justify-center gap-2 text-[11px]">
            <span>توصيل سريع: 01010400507</span>
            <span className="opacity-40">•</span>
            <Link
              href="/admin"
              className="font-extrabold text-[#E8A514] hover:underline transition-colors"
            >
              لوحة تحكم الإدارة
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5" dir="ltr">
          <span className="text-[11px] font-bold text-white/55 whitespace-nowrap">
            © {new Date().getFullYear()} ALYASMIN SYRIAN CUISINE
          </span>
          <a
            href="https://chameleon.vision/"
            target="_blank"
            rel="noopener noreferrer"
            dir="ltr"
            className="group inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-[#E8A514] text-white hover:text-[#18110C] border border-white/15 transition-all duration-200 shadow-xs whitespace-nowrap"
          >
            <span className="text-[11px] font-semibold tracking-wide opacity-85 whitespace-nowrap">
              Powered by
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/chameleon-logo.webp"
              alt="Chameleon"
              className="h-4 w-auto object-contain shrink-0"
            />
            <span className="text-xs font-black tracking-wider text-[#E8A514] group-hover:text-[#18110C] whitespace-nowrap">
              Chameleon
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
