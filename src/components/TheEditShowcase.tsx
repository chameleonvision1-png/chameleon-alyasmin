"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useStore } from "./store";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, PlusIcon } from "./icons";

export default function TheEditShowcase({ products }: { products: Product[] }) {
  const { addToCart } = useStore();
  const [page, setPage] = useState(0);
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);
  const [addedId, setAddedId] = useState<string | null>(null);
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);

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

  const handleMobileScroll = () => {
    const el = mobileTrackRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth || 280;
    const scrollPos = Math.abs(el.scrollLeft);
    const idx = Math.round(scrollPos / (cardWidth + 16));
    setActiveMobileIdx(Math.max(0, Math.min(products.length - 1, idx)));
  };

  const scrollToMobileCard = (idx: number) => {
    const el = mobileTrackRef.current;
    if (!el) return;
    const child = el.children[idx] as HTMLElement | undefined;
    if (child) {
      child.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      setActiveMobileIdx(idx);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* =====================================================================
          LOMORA "THE EDIT" HEADER ROW
         ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start mb-6 lg:mb-10">
        {/* Col 1: Section Title */}
        <div className="lg:col-span-4">
          <h2 className="text-2xl sm:text-4xl font-black text-[#18110C] tracking-tight">
            مختارات الياسمين
          </h2>
        </div>

        {/* Col 2: Philosophy Subtitle + 3-Line Paragraph */}
        <div className="lg:col-span-5 space-y-1.5">
          <div className="text-xs font-black text-[#18110C] tracking-wide uppercase">
            فلسفة الضيافة السورية
          </div>
          <p className="text-xs sm:text-sm text-[#292929]/75 leading-relaxed">
            كل طبق يُحضّر بعناية ليجمع بين أصالة التتبيلة الدمشقية، جودة اللحوم الطازجة، ودفء اللمة العائلية — مذاق شامي أصيل يترك أثره في كل لقمة.
          </p>
        </div>

        {/* Col 3: Desktop Pill CTA Button */}
        <div className="hidden lg:flex lg:col-span-3 justify-end">
          <Link
            href="/menu"
            className="inline-flex items-center gap-3 rounded-full border border-[#18110C]/20 bg-white hover:border-[#E8A514] hover:bg-[#FFF9EA] text-[#18110C] pr-5 pl-1.5 py-1.5 text-xs font-extrabold transition shadow-2xs group"
          >
            <span>تصفح المنيو</span>
            <span className="w-8 h-8 rounded-full bg-[#18110C] group-hover:bg-[#E8A514] text-white group-hover:text-[#18110C] grid place-items-center transition">
              <ArrowLeftIcon className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>

      {/* =====================================================================
          MOBILE HORIZONTAL SNAP CAROUSEL (`lg:hidden`)
          Swipeable cards side-by-side instead of stacked vertically
         ===================================================================== */}
      <div className="lg:hidden space-y-4">
        <div
          ref={mobileTrackRef}
          onScroll={handleMobileScroll}
          className="flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 pb-2"
        >
          {products.map((item) => {
            const price = item.sizes[0]?.price ?? 0;
            const isAdded = addedId === item.id;

            return (
              <div
                key={item.id}
                className="w-[82vw] max-w-[330px] shrink-0 snap-center"
              >
                <div className="group relative w-full h-[380px] rounded-[24px] overflow-hidden bg-[#23170E] shadow-[0_16px_40px_-18px_rgba(24,17,12,0.22)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.nameAr}
                    className="w-full h-full object-cover"
                  />

                  {/* Frosted Glassmorphic Bottom Bar */}
                  <div className="absolute inset-x-2.5 bottom-2.5 rounded-[18px] backdrop-blur-md bg-[#18110C]/55 border border-white/20 px-4 py-3 flex items-center justify-between gap-3 text-white">
                    <div className="min-w-0 text-right">
                      <h3 className="font-extrabold text-sm text-white truncate">
                        {item.nameAr}
                      </h3>
                      <div className="text-[11px] text-white/80 truncate">
                        تتبيلة دمشقية أصلية • {formatPrice(price)}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleQuickAdd(item)}
                      aria-label={`أضف ${item.nameAr} إلى السلة`}
                      className={`w-9 h-9 rounded-full border transition grid place-items-center shrink-0 ${
                        isAdded
                          ? "bg-[#E8A514] border-[#E8A514] text-[#18110C]"
                          : "bg-white/15 hover:bg-[#E8A514] border-white/25 hover:border-[#E8A514] text-white hover:text-[#18110C]"
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

        {/* Mobile Bottom Row: Pill CTA Button + Carousel Dots */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <Link
            href="/menu"
            className="inline-flex items-center gap-3 rounded-full border border-[#18110C]/20 bg-white text-[#18110C] pr-5 pl-1.5 py-1.5 text-xs font-extrabold shadow-2xs"
          >
            <span>تصفح المنيو</span>
            <span className="w-8 h-8 rounded-full bg-[#18110C] text-[#E8A514] grid place-items-center">
              <ArrowLeftIcon className="w-4 h-4" />
            </span>
          </Link>

          {/* Interactive Carousel Dots */}
          <div className="flex items-center gap-1.5">
            {products.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToMobileCard(idx)}
                aria-label={`عرض ${item.nameAr}`}
                className={`rounded-full transition-all ${
                  idx === activeMobileIdx
                    ? "w-6 h-2 bg-[#E8A514]"
                    : "w-2 h-2 bg-[#18110C]/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================================
          DESKTOP STAGGERED 3-CARD STAIRCASE SHOWCASE (`hidden lg:grid`)
         ===================================================================== */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-6 lg:items-end">
        {visible.map((item, idx) => {
          const price = item.sizes[0]?.price ?? 0;
          const isAdded = addedId === item.id;

          const heightClasses =
            idx === 0
              ? "lg:h-[500px]"
              : idx === 1
                ? "lg:h-[415px]"
                : "lg:h-[335px]";

          return (
            <div key={item.id} className="lg:col-span-4 flex flex-col">
              {/* Above Card 3 on Desktop: Prev / Next Circular Buttons */}
              {idx === 2 && (
                <div className="flex items-center justify-end gap-2.5 mb-5" dir="ltr">
                  <button
                    type="button"
                    onClick={() => setPage((p) => (p - 1 + pagesCount) % pagesCount)}
                    aria-label="السابق"
                    className="w-10 h-10 rounded-full bg-[#F5EFE0] hover:bg-[#E8A514] text-[#18110C] grid place-items-center transition"
                  >
                    <ArrowLeftIcon className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPage((p) => (p + 1) % pagesCount)}
                    aria-label="التالي"
                    className="w-10 h-10 rounded-full bg-[#18110C] hover:bg-[#E8A514] text-white hover:text-[#18110C] grid place-items-center transition"
                  >
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Card Container */}
              <div
                className={`group relative w-full ${heightClasses} rounded-[24px] overflow-hidden bg-[#23170E] shadow-[0_16px_40px_-18px_rgba(24,17,12,0.18)]`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.nameAr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Frosted Glassmorphic Bottom Bar */}
                <div className="absolute inset-x-2.5 bottom-2.5 rounded-[18px] backdrop-blur-md bg-[#18110C]/45 border border-white/20 px-4 py-3 flex items-center justify-between gap-3 text-white">
                  <div className="min-w-0 text-right">
                    <h3 className="font-extrabold text-base text-white truncate">
                      {item.nameAr}
                    </h3>
                    <div className="text-[11px] text-white/80 truncate">
                      تتبيلة دمشقية أصلية • {formatPrice(price)}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleQuickAdd(item)}
                    aria-label={`أضف ${item.nameAr} إلى السلة`}
                    className={`w-9 h-9 rounded-full border transition grid place-items-center shrink-0 ${
                      isAdded
                        ? "bg-[#E8A514] border-[#E8A514] text-[#18110C]"
                        : "bg-white/15 hover:bg-[#E8A514] border-white/25 hover:border-[#E8A514] text-white hover:text-[#18110C]"
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
    </section>
  );
}
