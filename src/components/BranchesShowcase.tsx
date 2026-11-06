"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Branch } from "@/lib/types";
import { useStore } from "./store";
import { ArrowLeftIcon, ArrowRightIcon, ClockIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";

export default function BranchesShowcase({ branches }: { branches: Branch[] }) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { setBranchId } = useStore();
  const router = useRouter();
  const safeIndex = activeIndex < branches.length ? activeIndex : 0;

  return (
    <div>
      {/* Interactive Zone Selector Tabs + Prev/Next Arrows on Mobile */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {branches.map((b, idx) => {
            const isSelected = idx === safeIndex;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`px-4 py-2 rounded-full font-extrabold text-xs sm:text-sm shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#18110C] text-[#E8A818] shadow-xs"
                    : "bg-white text-[#18110C] border border-[#18110C]/15 hover:border-[#E8A818]"
                }`}
              >
                {b.city}
              </button>
            );
          })}
        </div>

        {branches.length > 1 && (
          <div className="flex md:hidden items-center gap-1.5 shrink-0" dir="ltr">
            <button
              type="button"
              onClick={() => setActiveIndex((prev) => (prev - 1 + branches.length) % branches.length)}
              aria-label="النطاق السابق"
              className="w-8 h-8 rounded-full bg-white border border-[#18110C]/15 text-[#18110C] grid place-items-center"
            >
              <ArrowLeftIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex((prev) => (prev + 1) % branches.length)}
              aria-label="النطاق التالي"
              className="w-8 h-8 rounded-full bg-[#18110C] text-[#E8A818] grid place-items-center"
            >
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {branches.map((b, idx) => (
          <div
            key={b.id}
            className={`${
              idx === safeIndex ? "flex" : "hidden md:flex"
            } rounded-[26px] bg-white p-5 sm:p-6 flex-col justify-between border border-[#18110C]/10 hover:border-[#E8A818] shadow-[0_12px_30px_-16px_rgba(24,17,12,0.12)] transition-all`}
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-black text-base sm:text-lg text-[#18110C] leading-snug text-right">
                  {b.name}
                </h3>
                <span className="shrink-0 text-xs font-black bg-[#E8A818] text-[#18110C] px-3 py-1 rounded-full">
                  {b.city}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#292929]/75 mt-3 flex items-start gap-1.5 font-semibold leading-relaxed text-right">
                <PinIcon className="w-4 h-4 shrink-0 text-[#A87508] mt-0.5" />
                <span>{b.address}</span>
              </p>

              <p className="text-xs text-[#292929]/65 mt-1.5 flex items-center gap-1.5 font-semibold text-right">
                <ClockIcon className="w-3.5 h-3.5 shrink-0 text-[#A87508]" />
                <span>{b.hours}</span>
              </p>

              {/* Delivery Areas Chips */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {b.deliveryAreas.slice(0, 5).map((area) => (
                  <span
                    key={area}
                    className="rounded-full bg-[#FAF6EC] border border-[#E8A818]/30 px-2.5 py-0.5 text-[11px] font-bold text-[#5A3218]"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#18110C]/10 space-y-2">
              {/* Row 1: Phone & Map Side-by-Side */}
              <div className="grid grid-cols-2 gap-2" dir="ltr">
                <a
                  href={`tel:${b.phone}`}
                  className="font-en inline-flex items-center justify-center gap-1.5 rounded-full bg-[#FAF6EC] hover:bg-[#E8A818] border border-[#18110C]/15 px-3 py-1.5 text-xs font-black text-[#18110C] transition"
                >
                  <PhoneIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>{b.phone}</span>
                </a>
                <a
                  href={b.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  dir="rtl"
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#FAF6EC] hover:bg-[#E8A818] border border-[#18110C]/15 px-3 py-1.5 text-xs font-black text-[#18110C] transition"
                >
                  <PinIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>الخريطة</span>
                </a>
              </div>

              {/* Row 2: Order & WhatsApp Side-by-Side */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setBranchId(b.id);
                    router.push("/menu");
                  }}
                  className="rounded-full bg-[#18110C] hover:bg-[#2B1E15] text-[#E8A818] font-black text-xs py-2.5 text-center transition cursor-pointer"
                >
                  اطلب في هذه المنطقة
                </button>
                <a
                  href={`https://wa.me/${b.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#25D366] hover:brightness-105 text-white font-black text-xs py-2.5 flex items-center justify-center gap-1.5 transition"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>واتساب</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
