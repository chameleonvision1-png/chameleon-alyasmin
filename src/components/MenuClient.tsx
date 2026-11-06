"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Category, Product } from "@/lib/types";
import { ProductCard } from "./Product";
import { openMenuQrModal } from "./MenuQrModal";
import { CloseIcon, QrCodeIcon, SearchIcon } from "./icons";

export default function MenuClient({
  categories,
  products,
}: {
  categories: Category[];
  products: Product[];
  compactPreview?: boolean;
}) {
  const [activeCat, setActiveCat] = useState<string>("all");
  const [search, setSearch] = useState("");
  const pillsContainerRef = useRef<HTMLDivElement | null>(null);
  const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const isProgrammaticScroll = useRef(false);

  const availableProducts = useMemo(
    () => products.filter((p) => p.isAvailable),
    [products]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return availableProducts;
    return availableProducts.filter((p) => {
      const hitAr =
        p.nameAr.toLowerCase().includes(q) ||
        p.descriptionAr.toLowerCase().includes(q);
      const hitEn = (p.nameEn || "").toLowerCase().includes(q);
      return hitAr || hitEn;
    });
  }, [availableProducts, search]);

  // Auto-scroll the horizontal category pills bar whenever `activeCat` changes
  useEffect(() => {
    const btn = pillRefs.current[activeCat];
    const container = pillsContainerRef.current;
    if (!btn || !container) return;

    const btnCenter = btn.offsetLeft + btn.offsetWidth / 2;
    const targetScroll = btnCenter - container.clientWidth / 2;
    container.scrollTo({ left: targetScroll, behavior: "smooth" });
  }, [activeCat]);

  // ScrollSpy: As the user scrolls down the menu page, automatically highlight
  // the current category section in the sticky bar and scroll the bar horizontally!
  useEffect(() => {
    if (search.trim()) return;

    const handleWindowScroll = () => {
      if (isProgrammaticScroll.current) return;

      const offset = 190; // Header (64px) + Sticky Menu Bar (~115px)
      if (window.scrollY < 160) {
        setActiveCat("all");
        return;
      }

      let currentSectionId = "all";
      for (const cat of categories) {
        const el = document.getElementById(`cat-${cat.id}`);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= offset) {
          currentSectionId = cat.id;
        }
      }
      setActiveCat(currentSectionId);
    };

    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, [categories, search]);

  const handleCategoryClick = (catId: string) => {
    setActiveCat(catId);
    isProgrammaticScroll.current = true;

    if (catId === "all") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 650);
      return;
    }

    const sectionEl = document.getElementById(`cat-${catId}`);
    if (sectionEl) {
      const headerOffset = 175;
      const top =
        sectionEl.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 650);
  };

  return (
    <div className="w-full">
      {/* =====================================================================
          FULL-WIDTH STICKY SEARCH & SCROLLSPY CATEGORY BAR
          Pinned cleanly right under Header (`sticky top-16 lg:top-[72px]`)
          Automatically tracks scroll position and slides the active pill into view
         ===================================================================== */}
      <div className="sticky top-16 lg:top-[72px] z-30 w-full bg-white/95 backdrop-blur-md border-b border-[#18110C]/10 shadow-[0_8px_24px_-12px_rgba(24,17,12,0.12)] py-2.5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-2">
          {/* Search Input + QR Code & Share Button Row */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 min-w-0">
              <SearchIcon className="w-4 h-4 text-[#A87508] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث في منيو الياسمين (شاورما، مشاوي، فتة، كبة، حمص...)"
                className="w-full rounded-full bg-[#FAF6EC] border border-[#18110C]/12 focus:border-[#E8A514] focus:bg-white pr-10 pl-9 py-2 text-xs sm:text-sm font-bold text-[#18110C] outline-none transition"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="مسح البحث"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#18110C]/10 text-[#18110C] grid place-items-center"
                >
                  <CloseIcon className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={openMenuQrModal}
              title="باركود ومشاركة المنيو (QR)"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#18110C] hover:bg-[#E8A514] text-white hover:text-[#18110C] px-3.5 sm:px-4 py-2 text-xs font-black shadow-sm transition cursor-pointer shrink-0"
            >
              <QrCodeIcon className="w-4 h-4 text-[#E8A514] group-hover:text-[#18110C]" />
              <span>باركود المنيو</span>
            </button>
          </div>

          {/* Horizontal Scrollable Category Pills (Auto-scrolls with page scroll) */}
          <div
            ref={pillsContainerRef}
            className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            <button
              ref={(el) => {
                pillRefs.current["all"] = el;
              }}
              type="button"
              onClick={() => handleCategoryClick("all")}
              className={`px-4 py-2 rounded-full text-xs font-black shrink-0 transition cursor-pointer ${
                activeCat === "all"
                  ? "bg-[#18110C] text-[#E8A514] shadow-sm"
                  : "bg-[#FAF6EC] text-[#18110C] border border-[#18110C]/10 hover:border-[#E8A514]"
              }`}
            >
              كل الأصناف ({availableProducts.length})
            </button>

            {categories.map((c) => {
              const active = activeCat === c.id;
              const cnt = availableProducts.filter(
                (p) => p.categoryId === c.id
              ).length;
              return (
                <button
                  key={c.id}
                  ref={(el) => {
                    pillRefs.current[c.id] = el;
                  }}
                  type="button"
                  onClick={() => handleCategoryClick(c.id)}
                  className={`px-4 py-2 rounded-full text-xs font-black shrink-0 transition cursor-pointer ${
                    active
                      ? "bg-[#E8A514] text-[#18110C] shadow-sm ring-1 ring-[#18110C]/20"
                      : "bg-[#FAF6EC] text-[#18110C] border border-[#18110C]/10 hover:border-[#E8A514]"
                  }`}
                >
                  {c.nameAr} ({cnt})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================================
          MENU SECTIONS LIST
         ===================================================================== */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-9">
        {categories.map((cat) => {
          const catItems = filtered.filter((p) => p.categoryId === cat.id);
          if (catItems.length === 0) return null;

          return (
            <section
              key={cat.id}
              id={`cat-${cat.id}`}
              className="scroll-mt-44 space-y-3.5"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between gap-2 pb-2 border-b-2 border-[#E8A514]/40">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#E8A514] ring-2 ring-[#18110C]" />
                  <h2 className="text-lg sm:text-2xl font-black text-[#18110C]">
                    {cat.nameAr}
                  </h2>
                </div>
                <span className="rounded-full bg-[#FDF2CE] text-[#5A3218] text-xs font-black px-3 py-0.5">
                  {catItems.length} أصناف
                </span>
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
              className="rounded-full bg-[#E8A514] text-[#18110C] font-black text-xs px-6 py-3"
            >
              عرض المنيو الكامل
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
