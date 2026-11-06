"use client";

import { useEffect } from "react";
import { useStore } from "./store";
import { CheckIcon, ClockIcon, CloseIcon, PhoneIcon, PinIcon } from "./icons";

export default function BranchPicker() {
  const { branches, branch, setBranchId, pickerOpen, closePicker } = useStore();

  useEffect(() => {
    if (!pickerOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePicker();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [pickerOpen, closePicker]);

  if (!pickerOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="branch-picker-title"
      onClick={closePicker}
    >
      <div className="absolute inset-0 bg-[#18110C]/70 backdrop-blur-sm" />

      <div
        className="relative w-full sm:max-w-xl bg-[#FAF6EC] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#E8A818]/35 overflow-hidden flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 bg-[#18110C] text-white px-5 sm:px-6 pt-4 sm:pt-5 pb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E8A818] text-[#18110C] grid place-items-center shrink-0">
                <PinIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 id="branch-picker-title" className="text-lg font-black text-white leading-tight">
                  اختر نطاق التوصيل في القاهرة
                </h2>
                <p className="text-xs text-white/75 mt-0.5">
                  توصيل سريع لكافة مناطق القاهرة أو تواصل معنا مباشرة على 01010400507
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={closePicker}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center transition shrink-0"
              aria-label="إغلاق"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {branches.map((b) => {
            const active = branch?.id === b.id;
            return (
              <div
                key={b.id}
                role="button"
                tabIndex={0}
                onClick={() => setBranchId(b.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setBranchId(b.id);
                  }
                }}
                className={`w-full text-start rounded-2xl border p-4 transition-all flex items-start justify-between gap-3 cursor-pointer ${
                  active
                    ? "border-[#E8A818] bg-white shadow-md ring-1 ring-[#E8A818]"
                    : "border-[#18110C]/12 bg-white/85 hover:border-[#E8A818]"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-black text-sm sm:text-base text-[#18110C]">
                      {b.name}
                    </span>
                    {active && (
                      <span className="text-[11px] font-black bg-[#E8A818] text-[#18110C] px-2.5 py-0.5 rounded-full">
                        النطاق المختار
                      </span>
                    )}
                  </div>

                  <div className="mt-1.5 text-xs text-[#292929]/75 flex items-start gap-1.5">
                    <PinIcon className="w-3.5 h-3.5 text-[#A87508] shrink-0 mt-0.5" />
                    <span>{b.address}</span>
                  </div>

                  <div className="mt-1 text-xs text-[#292929]/65 flex items-center gap-1.5">
                    <ClockIcon className="w-3.5 h-3.5 text-[#292929]/45 shrink-0" />
                    <span>{b.hours}</span>
                  </div>

                  <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                    {b.deliveryAreas.map((area) => (
                      <span
                        key={area}
                        className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FAF6EC] text-[#5A3218] border border-[#E8A818]/30"
                      >
                        {area}
                      </span>
                    ))}
                  </div>

                  <div
                    className="mt-2.5 flex items-center gap-2"
                    dir="ltr"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <a
                      href={`tel:${b.phone}`}
                      className="font-en inline-flex items-center gap-1 rounded-full bg-[#18110C] text-[#E8A818] px-3 py-1 text-xs font-black"
                    >
                      <PhoneIcon className="w-3 h-3" />
                      <span>{b.phone}</span>
                    </a>
                  </div>
                </div>

                <span
                  className={`w-7 h-7 rounded-full grid place-items-center shrink-0 mt-0.5 transition-all ${
                    active
                      ? "bg-[#E8A818] text-[#18110C]"
                      : "border border-[#18110C]/15 bg-[#FAF6EC] text-transparent"
                  }`}
                >
                  <CheckIcon className="w-4 h-4" />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
