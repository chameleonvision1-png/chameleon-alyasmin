"use client";

import { useState } from "react";
import type { Offer } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useStore } from "./store";
import { CheckIcon, ClockIcon, PlusIcon } from "./icons";

export default function OfferCard({ offer }: { offer: Offer }) {
  const { addToCart } = useStore();
  const [added, setAdded] = useState(false);

  const discount =
    offer.oldPrice > offer.price
      ? Math.round(((offer.oldPrice - offer.price) / offer.oldPrice) * 100)
      : 0;

  return (
    <article className="rounded-[26px] bg-white overflow-hidden flex flex-col h-full group border border-[#18110C]/10 hover:border-[#E8A818] shadow-[0_10px_28px_-14px_rgba(24,17,12,0.1)] hover:shadow-[0_18px_38px_-14px_rgba(232,168,24,0.22)] transition-all duration-300">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#18110C]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={offer.image}
          alt={offer.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-1.5">
          {discount > 0 ? (
            <span className="bg-[#18110C]/85 backdrop-blur-md text-[#E8A818] border border-[#E8A818]/40 font-black text-xs px-3 py-1 rounded-full shadow-md text-right">
              وفّر {discount}%
            </span>
          ) : (
            <span />
          )}
          {offer.badge && (
            <span className="bg-[#E8A818] text-[#18110C] font-black text-[11px] px-3 py-1 rounded-full shadow-md">
              {offer.badge}
            </span>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Arabic Right / English Left */}
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-black text-base sm:text-lg text-[#18110C] group-hover:text-[#A87508] transition-colors leading-snug text-right">
            {offer.title}
          </h3>
          {offer.titleEn && (
            <span
              dir="ltr"
              className="font-en text-xs text-[#A87508] font-bold tracking-wide text-left shrink-0"
            >
              {offer.titleEn}
            </span>
          )}
        </div>

        <p className="text-[#292929]/70 text-xs sm:text-sm mt-1.5 line-clamp-2 leading-relaxed flex-1 font-medium text-right">
          {offer.description}
        </p>

        {offer.terms && (
          <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-[#5A3218]">
            <ClockIcon className="w-3.5 h-3.5 text-[#E8A818]" />
            <span>{offer.terms}</span>
          </div>
        )}

        <div className="mt-3.5 pt-3 border-t border-[#18110C]/10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-[#18110C] text-[#E8A818] px-3.5 py-1 text-sm sm:text-base font-black whitespace-nowrap">
              {formatPrice(offer.price)}
            </span>
            {offer.oldPrice > offer.price && (
              <span className="text-xs sm:text-sm font-bold text-[#292929]/40 line-through whitespace-nowrap">
                {formatPrice(offer.oldPrice)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              addToCart({
                productId: `offer:${offer.id}`,
                name: offer.title,
                image: offer.image,
                addons: [],
                unitPrice: offer.price,
                qty: 1,
              });
              setAdded(true);
              setTimeout(() => setAdded(false), 1200);
            }}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-black transition cursor-pointer ${
              added
                ? "bg-[#198754] text-white"
                : "bg-[#E8A818] hover:bg-[#D99B10] text-[#18110C]"
            }`}
          >
            {added ? (
              <>
                <CheckIcon className="w-3.5 h-3.5" />
                <span>تمت الإضافة</span>
              </>
            ) : (
              <>
                <PlusIcon className="w-3.5 h-3.5" />
                <span>أضف للسلة</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
