"use client";

import { useMemo, useRef, useState } from "react";
import type { Category, Product } from "@/lib/types";
import { ProductCard } from "./Product";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon, SearchIcon } from "./icons";

export default function MenuClient({
  categories,
  products,
  compactPreview = false,
}: {
  categories: Category[];
  products: Product[];
  compactPreview?: boolean;
}) {
  const [activeCat, setActiveCat] = useState<string>("all");
  const [search, setSearch] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      if (!p.isAvailable) return false;
      if (activeCat !== "all" && p.categoryId !== activeCat) return false;
      if (q) {
        const hitAr = p.nameAr.toLowerCase().includes(q) || p.descriptionAr.toLowerCase().includes(q);
        const hitEn = (p.nameEn || "").toLowerCase().includes(q);
        return hitAr || hitEn;
      }
      return true;
    });
  }, [products, activeCat, search]);

  const scrollCarousel = (dir: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.85;
    el.scrollBy({ left: dir === "prev" ? step : -step, behavior: "smooth" });
  };

  if (compactPreview) {
    const previewCats = [{ id: "all", nameAr: "الكل", nameEn: "ALL" }, ...categories];
    const items = filtered.slice(0, 8);

    return (
      <div className="w-full max-w-full min-w-0 overflow-x-clip space-y-5">
        {/* Category Pills + Mobile Carousel Arrows */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {previewCats.map((c) => {
              const active = activeCat === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveCat(c.id)}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold shrink-0 transition cursor-pointer ${
                    active
                      ? "bg-[#18110C] text-[#E8A818] shadow-sm"
                      : "bg-white text-[#18110C] border border-[#18110C]/15 hover:border-[#E8A818]"
                  }`}
                >
                  {c.nameAr}
                </button>
              );
            })}
          </div>

          <div className="flex md:hidden items-center gap-1.5 shrink-0" dir="ltr">
            <button
              type="button"
              onClick={() => scrollCarousel("prev")}
              aria-label="السابق"
              className="w-8 h-8 rounded-full bg-white border border-[#18110C]/15 text-[#18110C] grid place-items-center"
            >
              <ArrowLeftIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => scrollCarousel("next")}
              aria-label="التالي"
              className="w-8 h-8 rounded-full bg-[#18110C] text-[#E8A818] grid place-items-center"
            >
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Snap Carousel / Desktop 2-Col Menu List */}
        <div
          ref={scrollRef}
          className="flex md:grid md:grid-cols-2 gap-3.5 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar pb-2"
        >
          {items.map((p) => (
            <div
              key={p.id}
              className="w-[85vw] max-w-[350px] md:w-auto md:max-w-none shrink-0 snap-center"
            >
              <ProductCard product={p} variant="menu" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full min-w-0 overflow-x-clip">
      {/* Sticky Filter & Search Bar (`sticky top-14 lg:top-16` so it never clips under Header) */}
      <div className="sticky top-14 lg:top-16 z-30 bg-[#FAF6EC]/95 backdrop-blur-md border-b border-[#18110C]/10 py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-2.5">
          {/* Search Input */}
          <div className="relative">
            <SearchIcon className="w-4 h-4 text-[#A87508] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث في منيو الياسمين (شاورما، مشاوي، فتة، كبة، حمص...)"
              className="w-full rounded-full bg-white border border-[#18110C]/15 focus:border-[#E8A818] pr-10 pl-9 py-2.5 text-xs sm:text-sm font-bold text-[#18110C] outline-none"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="مسح البحث"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FAF6EC] text-[#18110C] grid place-items-center"
              >
                <CloseIcon className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Horizontal Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <button
              type="button"
              onClick={() => setActiveCat("all")}
              className={`px-4 py-2 rounded-full text-xs font-extrabold shrink-0 transition cursor-pointer ${
                activeCat === "all"
                  ? "bg-[#18110C] text-[#E8A818] shadow-xs"
                  : "bg-white text-[#18110C] border border-[#18110C]/12 hover:border-[#E8A818]"
              }`}
            >
              كل الأصناف ({products.filter((p) => p.isAvailable).length})
            </button>
            {categories.map((c) => {
              const active = activeCat === c.id;
              const cnt = products.filter((p) => p.isAvailable && p.categoryId === c.id).length;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveCat(c.id)}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold shrink-0 transition cursor-pointer ${
                    active
                      ? "bg-[#E8A818] text-[#18110C] shadow-xs"
                      : "bg-white text-[#18110C] border border-[#18110C]/12 hover:border-[#E8A818]"
                  }`}
                >
                  {c.nameAr} ({cnt})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {categories
          .filter((c) => activeCat === "all" || c.id === activeCat)
          .map((cat) => {
            const catItems = filtered.filter((p) => p.categoryId === cat.id);
            if (catItems.length === 0) return null;

            return (
              <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-36 space-y-4">
                {/* Category Header — Arabic Right, English Left */}
                <div className="flex items-baseline justify-between gap-2 pb-2 border-b border-[#18110C]/10">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E8A818]" />
                    <h2 className="text-xl sm:text-2xl font-black text-[#18110C]">
                      {cat.nameAr}
                    </h2>
                  </div>
                  {cat.nameEn && (
                    <span
                      dir="ltr"
                      className="font-en text-xs sm:text-sm font-extrabold tracking-wider text-[#A87508] uppercase"
                    >
                      {cat.nameEn}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                  {catItems.map((p) => (
                    <ProductCard key={p.id} product={p} variant="menu" />
                  ))}
                </div>
              </section>
            );
          })}

        {filtered.length === 0 && (
          <div className="py-16 text-center space-y-3">
            <p className="text-base font-extrabold text-[#18110C]">
              لا توجد أصناف مطابقة لبحثك حالياً
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCat("all");
              }}
              className="btn btn-primary text-xs"
            >
              عرض المنيو الكامل
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
