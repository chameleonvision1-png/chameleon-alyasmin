"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useStore } from "./store";
import { formatPrice } from "@/lib/format";
import { ArrowUpIcon, CartIcon, ChevronIcon } from "./icons";

const SHOW_CART_AT = 260;
const SHOW_TOP_AT = 480;
const RING_R = 24;
const RING_C = 2 * Math.PI * RING_R;

const EASE = "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";
const shown = "opacity-100 translate-y-0 scale-100 pointer-events-auto";
const hidden = "opacity-0 translate-y-3 scale-90 pointer-events-none";

export default function MobileCartBar() {
  const { count, subtotal, hydrated, bump } = useStore();
  const pathname = usePathname();
  const [showCart, setShowCart] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let raf = 0;
    let maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setShowCart((prev) => {
        const next = y > SHOW_CART_AT;
        return prev === next ? prev : next;
      });
      setShowTop((prev) => {
        const next = y > SHOW_TOP_AT;
        return prev === next ? prev : next;
      });
      if (ringRef.current) {
        const p = Math.min(1, Math.max(0, y / maxScroll));
        ringRef.current.style.strokeDashoffset = String(RING_C * (1 - p));
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const onResize = () => {
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      onScroll();
    };

    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [pathname]);

  if (pathname === "/cart" || pathname.startsWith("/order")) return null;

  const hasItems = hydrated && count > 0;
  const showFloatingCart = !hasItems;

  return (
    <div
      className="fixed inset-x-4 md:inset-x-6 z-40 pointer-events-none flex flex-col items-start gap-2.5"
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)" }}
    >
      {/* Back to top with SVG Scroll-Progress Ring */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="الرجوع لأعلى الصفحة"
        tabIndex={showTop ? 0 : -1}
        className={`relative w-[52px] h-[52px] rounded-full bg-[#FAF6EC]/95 backdrop-blur-md text-[#18110C] grid place-items-center shadow-[0_10px_28px_-8px_rgba(24,17,12,0.45)] ring-1 ring-[#18110C]/15 active:scale-95 cursor-pointer ${EASE} ${
          showTop ? shown : hidden
        }`}
      >
        <svg
          className="absolute inset-0 -rotate-90"
          viewBox="0 0 52 52"
          aria-hidden="true"
        >
          <circle
            cx="26"
            cy="26"
            r={RING_R}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.12"
            strokeWidth="2.2"
          />
          <circle
            ref={ringRef}
            cx="26"
            cy="26"
            r={RING_R}
            fill="none"
            stroke="#E8A514"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={RING_C}
            strokeDashoffset={RING_C}
          />
        </svg>
        <ArrowUpIcon className="relative w-[18px] h-[18px]" />
      </button>

      {/* Floating Cart Button (when cart is empty) */}
      {showFloatingCart && (
        <Link
          href="/cart"
          aria-label="السلة"
          tabIndex={showCart ? 0 : -1}
          className={`w-[52px] h-[52px] rounded-full bg-gradient-to-b from-[#2A1E15] via-[#18110C] to-[#0F0A07] text-[#E8A514] grid place-items-center shadow-[0_12px_28px_-8px_rgba(24,17,12,0.7)] ring-2 ring-[#E8A514]/80 active:scale-95 ${EASE} ${
            showCart ? shown : hidden
          }`}
        >
          <CartIcon className="w-5 h-5" />
        </Link>
      )}

      {/* Full Cart Pill (when cart has items) */}
      {hasItems && (
        <Link
          href="/cart"
          className="pointer-events-auto w-full md:w-auto md:min-w-[300px] md:gap-6 h-[54px] rounded-full bg-gradient-to-l from-[#2A1E15] via-[#18110C] to-[#120C08] text-white ps-1.5 pe-5 flex items-center justify-between shadow-[0_16px_36px_-10px_rgba(24,17,12,0.85)] ring-2 ring-[#E8A514]/85 active:scale-[0.98] transition-transform"
        >
          <span className="flex items-center gap-3">
            <span className="relative w-10 h-10 rounded-full bg-[#E8A514] text-[#18110C] grid place-items-center shadow-sm">
              <CartIcon className="w-[18px] h-[18px]" />
              <span
                key={bump}
                className="absolute -top-1 -end-1 min-w-5 h-5 px-1 rounded-full bg-white text-[#18110C] text-[10px] font-black grid place-items-center ring-2 ring-[#18110C]"
              >
                {count}
              </span>
            </span>
            <span className="text-sm font-extrabold tracking-tight">إتمام الطلب عبر واتساب</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-sm font-black text-[#E8A514] tabular-nums">{formatPrice(subtotal)}</span>
            <ChevronIcon className="w-4 h-4 text-[#E8A514]" />
          </span>
        </Link>
      )}
    </div>
  );
}
