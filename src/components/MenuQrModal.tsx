"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { generateQrMatrix } from "@/lib/qrcode";
import { CheckIcon, CloseIcon, QrCodeIcon, WhatsAppIcon } from "./icons";

const MENU_URL = "https://alyasmin.chameleon.vision/menu";
const SHARE_TITLE = "منيو مطعم الياسمين الدمشقي | Alyasmin Syrian Cuisine";
const SHARE_TEXT =
  "تصفح منيو مطعم الياسمين للمأكولات السورية (شاورما عالصاج، مشاوي شامية، فتات دمشقية، مقبلات، وصواني العيلة) واطلب مباشرة:";

export default function MenuQrModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const matrix = useMemo(() => generateQrMatrix(MENU_URL, "Q"), []);
  const size = matrix.length;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const isCenterLogoZone = useCallback(
    (r: number, c: number) => {
      const center = (size - 1) / 2;
      const radius = 3.5;
      return Math.abs(r - center) <= radius && Math.abs(c - center) <= radius;
    },
    [size],
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(MENU_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  if (!open || typeof document === "undefined") return null;

  const encodedWhatsapp = encodeURIComponent(`${SHARE_TEXT}\n${MENU_URL}`);

  return createPortal(
    <div
      className="fixed inset-0 z-[95] flex items-end sm:items-center justify-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-qr-modal-title"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#18110C]/70 backdrop-blur-sm" />

      <div
        className="relative w-full sm:max-w-md bg-[#FAF6EC] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#E8A818]/35 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="shrink-0 bg-[#18110C] text-white px-5 pt-4 sm:pt-5 pb-4 border-b border-white/10">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E8A818] text-[#18110C] grid place-items-center shrink-0">
                <QrCodeIcon className="w-5 h-5" />
              </div>
              <div>
                <h2
                  id="menu-qr-modal-title"
                  className="text-base sm:text-lg font-black text-white leading-tight"
                >
                  باركود ومشاركة منيو الياسمين
                </h2>
                <p className="text-xs text-white/70 mt-0.5">
                  امسح الكود بالكاميرا لفتح المنيو السوري أو شارك الرابط
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="إغلاق"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center transition shrink-0"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 overflow-y-auto">
          <div className="rounded-2xl bg-white border border-[#18110C]/10 p-4 flex flex-col items-center gap-3.5 shadow-sm">
            <div className="relative w-44 h-44 rounded-2xl bg-white p-3 border border-[#E8A818]/35 grid place-items-center">
              <svg
                id="alyasmin-menu-qr-svg"
                viewBox={`0 0 ${size} ${size}`}
                className="w-full h-full"
                shapeRendering="geometricPrecision"
                role="img"
                aria-label="QR Code منيو مطعم الياسمين"
              >
                {matrix.map((row, r) =>
                  row.map((dark, c) => {
                    if (!dark || isCenterLogoZone(r, c)) return null;
                    return (
                      <rect
                        key={`${r}-${c}`}
                        x={c + 0.06}
                        y={r + 0.06}
                        width={0.88}
                        height={0.88}
                        rx={0.22}
                        fill="#18110C"
                      />
                    );
                  }),
                )}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-10 h-10 rounded-xl bg-[#18110C] p-1.5 border-2 border-[#E8A818] grid place-items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo-emblem.png"
                    alt="الياسمين"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Copy Link Row */}
            <div className="w-full flex items-center justify-between gap-2 rounded-xl bg-[#FAF6EC] border border-[#18110C]/10 p-1.5 ps-3">
              <span
                dir="ltr"
                className="font-en truncate text-xs font-extrabold text-[#18110C]/85 select-all"
              >
                alyasmin.chameleon.vision/menu
              </span>

              <button
                type="button"
                onClick={handleCopy}
                className={`shrink-0 inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-extrabold transition ${
                  copied
                    ? "bg-[#198754] text-white"
                    : "bg-[#E8A818] text-[#18110C] hover:bg-[#D99B10]"
                }`}
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-3.5 h-3.5" />
                    <span>تم النسخ</span>
                  </>
                ) : (
                  <span>نسخ الرابط</span>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={`https://wa.me/?text=${encodedWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-extrabold bg-[#25D366] text-white transition"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0" />
              <span>مشاركة عبر واتساب</span>
            </a>

            <button
              type="button"
              onClick={() => {
                if (typeof navigator !== "undefined" && navigator.share) {
                  navigator.share({ title: SHARE_TITLE, text: SHARE_TEXT, url: MENU_URL }).catch(() => {});
                } else {
                  handleCopy();
                }
              }}
              className="flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-extrabold bg-[#18110C] text-white transition"
            >
              <span>مشاركة سريعة</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
