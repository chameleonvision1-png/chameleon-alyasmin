"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useStore } from "./store";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpLeftIcon, CheckIcon, PlusIcon } from "./icons";

export default function TheEditShowcase({ products }: { products: Product[] }) {
  const { addToCart } = useStore();
  const [page, setPage] = useState(0);
  const [addedId, setAddedId] = useState<string | null>(null);

  const pagesCount = Math.max(1, Math.ceil(products.length / 3));
  const start = (page * 3) % Math.max(1, products.length);
  const visible = [
    products[start % products.length],
    products[(start + 1) % products.length],
    products[(start + 2) % products.length],
  ].filter(Boolean);

  const handleQuickAdd = (p: Product) => {
    const firstSize = p.sizes[0];
    addToCart({
      productId: p.id,
      name: p.nameAr,
      image: p.image,
      sizeLabel: firstSize?.label,
      addons: [],
      unitPrice: firstSize?.price ?? 0,
      qty: 1,
    });
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1300);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* =====================================================================
          LOMORA "THE EDIT" HEADER ROW
          Desktop: 3-Column Header (Title | Philosophy | Pill CTA with Dark Circle Arrow)
          Mobile: Clean Stacked Editorial Header
         ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start mb-8 lg:mb-12">
        {/* Col 1: Title */}
        <div className="lg:col-span-4 space-y-1">
          <div dir="ltr" className="font-en text-left lg:text-right text-xs font-extrabold tracking-[0.18em] text-[#A87508] uppercase">
            THE EDIT • SIGNATURE DISHES
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#18110C] tracking-tight">
            مختارات الياسمين
          </h2>
        </div>

        {/* Col 2: Philosophy Sub-block */}
        <div className="lg:col-span-5 space-y-1.5">
          <div className="text-xs font-extrabold text-[#5A3218] tracking-wide">
            فلسفة الضيافة الدمشقية • <span dir="ltr" className="font-en">OUR PHILOSOPHY</span>
          </div>
          <p className="text-xs sm:text-sm text-[#292929]/75 leading-relaxed">
            كل طبق يُحضّر بعناية ليجمع بين أصالة التتبيلة السورية، جودة اللحوم الطازجة، ودفء اللمة العائلية — مذاق شامي أصيل يترك أثره في كل لقمة.
          </p>
        </div>

        {/* Col 3: Desktop Pill CTA Button (`Enter Collection` style from LOMORA reference) */}
        <div className="hidden lg:flex lg:col-span-3 justify-end">
          <Link
            href="/menu"
            className="inline-flex items-center gap-3 rounded-full border border-[#18110C]/20 bg-white hover:border-[#E8A818] hover:bg-[#FAF6EC] text-[#18110C] pr-5 pl-1.5 py-1.5 text-xs font-extrabold transition shadow-sm group"
          >
            <span>تصفح المنيو الكامل</span>
            <span className="w-8 h-8 rounded-full bg-[#18110C] group-hover:bg-[#E8A818] text-white group-hover:text-[#18110C] grid place-items-center transition">
              <ArrowUpLeftIcon className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>

      {/* =====================================================================
          STAGGERED 3-CARD SHOWCASE (Matches LOMORA Reference `Web` & `Mobile`)
          Desktop: Card 1 Tall (h-[470px]), Card 2 Shifted Down (mt-12 h-[420px]), Card 3 Wide/Lower with Prev/Next Circles above it
          Mobile: Clean Stacked Rounded Cards with Frosted Glassmorphic Bottom Bar
         ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
        {visible.map((item, idx) => {
          const price = item.sizes[0]?.price ?? 0;
          const isAdded = addedId === item.id;

          // Desktop staggered layout classes matching LOMORA reference image 5
          const colClasses =
            idx === 0
              ? "lg:col-span-4"
              : idx === 1
                ? "lg:col-span-4 lg:mt-14"
                : "lg:col-span-4 lg:mt-6";

          const heightClasses =
            idx === 0
              ? "h-[360px] sm:h-[420px] lg:h-[470px]"
              : idx === 1
                ? "h-[360px] sm:h-[420px] lg:h-[430px]"
                : "h-[360px] sm:h-[420px] lg:h-[370px]";

          return (
            <div key={item.id} className={`${colClasses} flex flex-col`}>
              {/* Above Card 3 on Desktop: Prev / Next Circular Buttons (Exact LOMORA detail) */}
              {idx === 2 && (
                <div className="hidden lg:flex items-center justify-end gap-2 mb-4" dir="ltr">
                  <button
                    type="button"
                    onClick={() => setPage((p) => (p - 1 + pagesCount) % pagesCount)}
                    aria-label="المجموعة السابقة"
                    className="w-10 h-10 rounded-full bg-[#F3EFE6] hover:bg-[#E8A818] text-[#18110C] grid place-items-center transition"
                  >
                    <ArrowLeftIcon className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPage((p) => (p + 1) % pagesCount)}
                    aria-label="المجموعة التالية"
                    className="w-10 h-10 rounded-full bg-[#18110C] hover:bg-[#E8A818] text-white hover:text-[#18110C] grid place-items-center transition"
                  >
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Card Container */}
              <div
                className={`group relative w-full ${heightClasses} rounded-[26px] overflow-hidden bg-[#F5F2EA] border border-[#18110C]/8 shadow-[0_16px_40px_-18px_rgba(24,17,12,0.18)]`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.nameAr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Top Subtle Price & Badge */}
                <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between gap-2 pointer-events-none">
                  {item.badge ? (
                    <span className="rounded-full bg-[#E8A818] text-[#18110C] text-[11px] font-black px-3 py-1 shadow">
                      {item.badge}
                    </span>
                  ) : (
                    <span />
                  )}
                  <span className="rounded-full bg-[#18110C]/80 backdrop-blur-md text-white text-xs font-extrabold px-3 py-1 border border-white/15">
                    {formatPrice(price)}
                  </span>
                </div>

                {/* Frosted Glassmorphic Bottom Bar (Exact match to LOMORA `Terra / Noir / Halo` bar) */}
                <div className="absolute inset-x-2.5 bottom-2.5 rounded-[20px] backdrop-blur-md bg-[#18110C]/55 border border-white/15 px-4 py-3 flex items-center justify-between gap-3 text-white">
                  <div className="min-w-0 text-right">
                    <h3 className="font-extrabold text-sm sm:text-base text-white truncate">
                      {item.nameAr}
                    </h3>
                    <div
                      dir="ltr"
                      className="font-en text-[11px] text-white/75 truncate text-right"
                    >
                      {item.nameEn || "Authentic Syrian Dish"}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleQuickAdd(item)}
                    aria-label={`أضف ${item.nameAr} إلى السلة`}
                    className={`w-10 h-10 rounded-full border transition grid place-items-center shrink-0 ${
                      isAdded
                        ? "bg-[#E8A818] border-[#E8A818] text-[#18110C]"
                        : "bg-white/10 hover:bg-[#E8A818] border-white/25 hover:border-[#E8A818] text-white hover:text-[#18110C]"
                    }`}
                  >
                    {isAdded ? <CheckIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Bottom Pill CTA Button (`Enter Collection` placement on Mobile Reference `media_1793973612494_4b9ff1ed.jpg`) */}
      <div className="mt-6 flex lg:hidden items-center justify-between gap-3">
        <Link
          href="/menu"
          className="inline-flex items-center gap-3 rounded-full border border-[#18110C]/20 bg-white text-[#18110C] pr-4 pl-1.5 py-1.5 text-xs font-extrabold shadow-sm"
        >
          <span>شاهد المنيو الكامل</span>
          <span className="w-8 h-8 rounded-full bg-[#18110C] text-[#E8A818] grid place-items-center">
            <ArrowUpLeftIcon className="w-4 h-4" />
          </span>
        </Link>

        <div className="flex items-center gap-2" dir="ltr">
          <button
            type="button"
            onClick={() => setPage((p) => (p - 1 + pagesCount) % pagesCount)}
            aria-label="السابق"
            className="w-9 h-9 rounded-full bg-[#F3EFE6] text-[#18110C] grid place-items-center"
          >
            <ArrowLeftIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => (p + 1) % pagesCount)}
            aria-label="التالي"
            className="w-9 h-9 rounded-full bg-[#18110C] text-white grid place-items-center"
          >
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
