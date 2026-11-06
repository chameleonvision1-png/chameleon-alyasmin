"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useStore } from "./store";
import { CheckIcon, CloseIcon, MinusIcon, PlusIcon } from "./icons";

export function isUnavailable(p: Product, branchId?: string | null) {
  return !p.isAvailable || (!!branchId && p.unavailableBranches.includes(branchId));
}

export function ProductCard({
  product,
  variant = "grid",
}: {
  product: Product;
  variant?: "menu" | "grid";
}) {
  const [open, setOpen] = useState(false);
  const [initialSizeId, setInitialSizeId] = useState<string | undefined>(product.sizes[0]?.id);
  const { branch, addToCart } = useStore();
  const [quickAdded, setQuickAdded] = useState(false);
  const off = isUnavailable(product, branch?.id);
  const mainSize = product.sizes[0];
  const mainPrice = mainSize?.price ?? 0;

  const openModal = (sizeId?: string) => {
    if (off) return;
    setInitialSizeId(sizeId ?? product.sizes[0]?.id);
    setOpen(true);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (off) return;
    addToCart({
      productId: product.id,
      name: product.nameAr,
      image: product.image,
      sizeLabel: mainSize?.label,
      addons: [],
      unitPrice: mainPrice,
      qty: 1,
    });
    setQuickAdded(true);
    setTimeout(() => setQuickAdded(false), 1200);
  };

  if (variant === "menu") {
    return (
      <>
        <article
          role="button"
          tabIndex={off ? -1 : 0}
          onClick={() => openModal()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openModal();
            }
          }}
          className={`group relative w-full max-w-full min-w-0 overflow-hidden bg-white rounded-[24px] p-3.5 sm:p-4 border border-[#18110C]/10 hover:border-[#E8A818] shadow-[0_6px_20px_-10px_rgba(24,17,12,0.08)] hover:shadow-[0_14px_30px_-12px_rgba(232,168,24,0.2)] transition-all duration-200 flex items-center gap-3.5 text-start ${
            off ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {/* Main Menu Details — Arabic Right (RTL), English Left (LTR) */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div className="flex items-baseline justify-between gap-2 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                <h3 className="font-black text-sm sm:text-base text-[#18110C] group-hover:text-[#A87508] transition-colors leading-snug truncate text-right">
                  {product.nameAr}
                </h3>
                {product.badge && (
                  <span className="text-[10px] font-black bg-[#E8A818]/20 text-[#5A3218] px-2 py-0.5 rounded-full shrink-0">
                    {product.badge}
                  </span>
                )}
              </div>

              {product.nameEn && (
                <span
                  dir="ltr"
                  className="font-en text-[11px] font-bold text-[#A87508] truncate text-left shrink-0 max-w-[42%]"
                >
                  {product.nameEn}
                </span>
              )}
            </div>

            <p className="text-xs text-[#292929]/70 mt-1 line-clamp-2 leading-relaxed text-right">
              {product.descriptionAr}
            </p>

            {/* Bottom Row: Price Pill (Right) + Clean Size Chips (Left) */}
            <div className="mt-2.5 flex items-center justify-between gap-1.5 flex-wrap">
              <span className="inline-flex items-center rounded-full bg-[#18110C] text-[#E8A818] px-3 py-0.5 text-xs font-black whitespace-nowrap">
                {formatPrice(mainPrice)}
              </span>

              {product.sizes.length > 1 && (
                <div className="flex items-center gap-1 flex-wrap">
                  {product.sizes.slice(0, 2).map((s) => (
                    <span
                      key={s.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(s.id);
                      }}
                      className="rounded-full bg-[#FAF6EC] hover:bg-[#E8A818] border border-[#E8A818]/35 px-2.5 py-0.5 text-[10px] font-extrabold text-[#18110C] whitespace-nowrap transition"
                    >
                      {s.label}: {s.price} ج
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Thumbnail + Quick Add Button */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-[#18110C] shrink-0 border border-[#18110C]/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.nameAr}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <button
              type="button"
              onClick={handleQuickAdd}
              aria-label={`أضف ${product.nameAr} للسلة`}
              className={`absolute bottom-1.5 left-1.5 w-8 h-8 rounded-full shadow-md grid place-items-center transition ${
                quickAdded
                  ? "bg-[#198754] text-white"
                  : "bg-[#E8A818] hover:bg-[#D99B10] text-[#18110C]"
              }`}
            >
              {quickAdded ? <CheckIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
            </button>
          </div>
        </article>

        {open && (
          <ProductModal
            product={product}
            initialSizeId={initialSizeId}
            onClose={() => setOpen(false)}
          />
        )}
      </>
    );
  }

  // Grid Card Variant (LOMORA Frosted / Editorial Card Style)
  return (
    <>
      <article
        role="button"
        tabIndex={off ? -1 : 0}
        onClick={() => openModal()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openModal();
          }
        }}
        className={`group rounded-[26px] bg-white border border-[#18110C]/10 hover:border-[#E8A818] overflow-hidden flex flex-col justify-between shadow-[0_10px_28px_-14px_rgba(24,17,12,0.1)] hover:shadow-[0_18px_38px_-14px_rgba(232,168,24,0.24)] transition-all duration-300 ${
          off ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <div>
          <div className="relative aspect-[4/3] overflow-hidden bg-[#18110C]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.nameAr}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2">
              {product.badge ? (
                <span className="rounded-full bg-[#E8A818] text-[#18110C] text-[11px] font-black px-3 py-1 shadow">
                  {product.badge}
                </span>
              ) : (
                <span />
              )}
              <span className="rounded-full bg-[#18110C]/85 backdrop-blur-md text-[#E8A818] text-xs font-black px-3 py-1 border border-white/15">
                {formatPrice(mainPrice)}
              </span>
            </div>
          </div>

          <div className="p-4 sm:p-5">
            {/* Arabic Right / English Left */}
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-black text-base text-[#18110C] group-hover:text-[#A87508] transition-colors truncate text-right">
                {product.nameAr}
              </h3>
              {product.nameEn && (
                <span
                  dir="ltr"
                  className="font-en text-[11px] font-bold text-[#A87508] truncate text-left shrink-0 max-w-[42%]"
                >
                  {product.nameEn}
                </span>
              )}
            </div>

            <p className="text-xs text-[#292929]/70 mt-1.5 line-clamp-2 leading-relaxed text-right">
              {product.descriptionAr}
            </p>
          </div>
        </div>

        <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-[#18110C]/8 flex items-center justify-between gap-2">
          <div className="text-xs font-extrabold text-[#5A3218] truncate">
            {mainSize?.label || "حجم أساسي"}
          </div>
          <button
            type="button"
            onClick={handleQuickAdd}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-black transition ${
              quickAdded
                ? "bg-[#198754] text-white"
                : "bg-[#E8A818] hover:bg-[#D99B10] text-[#18110C]"
            }`}
          >
            {quickAdded ? (
              <>
                <CheckIcon className="w-3.5 h-3.5" />
                <span>أُضيف</span>
              </>
            ) : (
              <>
                <PlusIcon className="w-3.5 h-3.5" />
                <span>أضف للسلة</span>
              </>
            )}
          </button>
        </div>
      </article>

      {open && (
        <ProductModal
          product={product}
          initialSizeId={initialSizeId}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

function ProductModal({
  product,
  initialSizeId,
  onClose,
}: {
  product: Product;
  initialSizeId?: string;
  onClose: () => void;
}) {
  const { addToCart } = useStore();
  const [sizeId, setSizeId] = useState(initialSizeId || product.sizes[0]?.id || "");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const activeSize = product.sizes.find((s) => s.id === sizeId) ?? product.sizes[0];
  const addonsList = product.addons.filter((a) => selectedAddons.includes(a.id));
  const unitPrice = (activeSize?.price ?? 0) + addonsList.reduce((s, a) => s + a.price, 0);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center sm:p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#18110C]/75 backdrop-blur-sm" />

      <div
        className="relative w-full sm:max-w-lg bg-[#FAF6EC] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#E8A818]/35 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Dish Image */}
        <div className="relative h-56 sm:h-64 bg-[#18110C] shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.nameAr}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#18110C] via-transparent to-black/30" />

          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="absolute top-3.5 left-3.5 w-9 h-9 rounded-full bg-[#18110C]/80 hover:bg-[#18110C] text-white border border-white/15 grid place-items-center"
          >
            <CloseIcon className="w-4 h-4" />
          </button>

          <div className="absolute bottom-3.5 inset-x-4 flex items-end justify-between gap-2 text-white">
            <div className="text-right">
              <h2 className="text-lg sm:text-xl font-black">{product.nameAr}</h2>
              {product.nameEn && (
                <div dir="ltr" className="font-en text-xs text-[#E8A818] text-right">
                  {product.nameEn}
                </div>
              )}
            </div>
            <span className="rounded-full bg-[#E8A818] text-[#18110C] font-black text-sm px-3.5 py-1 shrink-0">
              {formatPrice(unitPrice)}
            </span>
          </div>
        </div>

        {/* Scrollable Options */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1">
          <p className="text-xs sm:text-sm text-[#292929]/80 leading-relaxed">
            {product.descriptionAr}
          </p>

          {/* Sizes */}
          {product.sizes.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-[#18110C]">اختر الحجم المطلوب</span>
                <span dir="ltr" className="font-en text-[11px] font-bold text-[#A87508]">
                  SELECT SIZE
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.sizes.map((s) => {
                  const active = s.id === activeSize?.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSizeId(s.id)}
                      className={`rounded-xl p-3 border text-right flex items-center justify-between gap-2 transition ${
                        active
                          ? "bg-[#18110C] text-white border-[#18110C]"
                          : "bg-white text-[#18110C] border-[#18110C]/15 hover:border-[#E8A818]"
                      }`}
                    >
                      <span className="text-xs font-extrabold">{s.label}</span>
                      <span className={`text-xs font-black shrink-0 ${active ? "text-[#E8A818]" : "text-[#5A3218]"}`}>
                        {formatPrice(s.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Addons */}
          {product.addons.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-[#18110C]">إضافات شامية (اختياري)</span>
                <span dir="ltr" className="font-en text-[11px] font-bold text-[#A87508]">
                  EXTRAS
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.addons.map((a) => {
                  const checked = selectedAddons.includes(a.id);
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => toggleAddon(a.id)}
                      className={`rounded-xl p-2.5 border text-right flex items-center justify-between gap-2 transition ${
                        checked
                          ? "bg-[#FFF4D6] border-[#E8A818] text-[#18110C]"
                          : "bg-white border-[#18110C]/12 text-[#18110C]"
                      }`}
                    >
                      <span className="text-xs font-bold">{a.label}</span>
                      <span className="text-xs font-black text-[#A87508] shrink-0">+{a.price} ج</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="text-xs font-black text-[#18110C] block mb-1.5" htmlFor="p-note">
              ملاحظات التحضير (اختياري)
            </label>
            <input
              id="p-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="مثلاً: زيادة تحميص، بدون مخلل، ثومية إضافية..."
              className="input text-xs"
            />
          </div>
        </div>

        {/* Footer Action Bar */}
        <div className="p-4 bg-white border-t border-[#18110C]/10 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 rounded-full bg-[#FAF6EC] border border-[#18110C]/15 px-2 py-1">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-full bg-white text-[#18110C] grid place-items-center"
              aria-label="تقليل الكمية"
            >
              <MinusIcon className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center font-black text-sm">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              className="w-8 h-8 rounded-full bg-[#18110C] text-[#E8A818] grid place-items-center"
              aria-label="زيادة الكمية"
            >
              <PlusIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              addToCart({
                productId: product.id,
                name: product.nameAr,
                image: product.image,
                sizeLabel: activeSize?.label,
                addons: addonsList.map((a) => ({ label: a.label, price: a.price })),
                note: note.trim() || undefined,
                unitPrice,
                qty,
              });
              onClose();
            }}
            className="flex-1 rounded-full bg-[#E8A818] hover:bg-[#D99B10] text-[#18110C] font-black text-xs sm:text-sm py-3 px-4 flex items-center justify-between shadow-md transition"
          >
            <span>أضف إلى السلة</span>
            <span>{formatPrice(unitPrice * qty)}</span>
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
