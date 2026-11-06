"use client";

import Link from "next/link";

export default function Footer(_props?: { branches?: unknown; settings?: unknown }) {
  return (
    <footer className="relative bg-[#140E09] text-white overflow-hidden rounded-b-[28px]">
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
        className="pointer-events-none absolute bottom-0 inset-x-0 h-[320px] bg-gradient-to-t from-[#E8A514]/20 via-[#E8A514]/5 to-transparent"
      />

      {/* =====================================================================
          1. TOP MINIMAL NAVIGATION ROW (Exact match to `media_1793973639351_06794481.jpg`)
          Desktop: 4 Links spaced edge-to-edge across the top
          Mobile: 4 Links stacked vertically at the top
         ===================================================================== */}
      <div className="relative z-20 mx-auto max-w-7xl px-5 sm:px-8 pt-8 sm:pt-10 pb-4">
        {/* Desktop 4-Link Spaced Bar */}
        <nav className="hidden sm:flex items-center justify-between text-xs font-extrabold text-white/80">
          <Link href="/menu" className="hover:text-[#E8A514] transition">
            المنيو الكامل
          </Link>
          <Link href="/offers" className="hover:text-[#E8A514] transition">
            العروض والبوكسات
          </Link>
          <Link href="/about" className="hover:text-[#E8A514] transition">
            عن الياسمين
          </Link>
          <Link href="/contact" className="hover:text-[#E8A514] transition">
            تواصل معنا • <span dir="ltr" className="font-en">01010400507</span>
          </Link>
        </nav>

        {/* Mobile Stacked 4-Link List (Exact match to Mobile column in `media_1793973639351_06794481.jpg`) */}
        <nav className="flex sm:hidden flex-col items-start gap-2.5 text-xs font-extrabold text-white/80">
          <Link href="/menu" className="hover:text-[#E8A514] transition">
            المنيو الكامل
          </Link>
          <Link href="/offers" className="hover:text-[#E8A514] transition">
            العروض والبوكسات
          </Link>
          <Link href="/about" className="hover:text-[#E8A514] transition">
            عن الياسمين
          </Link>
          <Link href="/contact" className="hover:text-[#E8A514] transition">
            تواصل معنا • <span dir="ltr" className="font-en">01010400507</span>
          </Link>
        </nav>
      </div>

      {/* =====================================================================
          2. MONUMENTAL EDGE-TO-EDGE "ALYASMIN" WORDMARK + OVERLAPPING DISHES STAGE
          Exact match to `LOMORA` monumental footer in `media_1793973639351_06794481.jpg`
         ===================================================================== */}
      <div className="relative z-10 pt-2 pb-6 sm:pb-10 select-none overflow-hidden">
        {/* Giant 100%-Width Edge-to-Edge Wordmark in Alyasmin Golden-Yellow & White */}
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
                src: "/images/products/fatteh-chicken.webp",
                label: "فتة شاورما",
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
                src: "/images/products/broasted-half.webp",
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
    </footer>
  );
}
