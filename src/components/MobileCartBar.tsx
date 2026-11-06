"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "./store";
import { formatPrice } from "@/lib/format";
import { ArrowUpLeftIcon, CartIcon } from "./icons";

export default function MobileCartBar() {
  const { count, subtotal, hydrated, bump } = useStore();
  const pathname = usePathname();

  if (pathname === "/cart" || pathname.startsWith("/order")) return null;
  if (!hydrated || count <= 0) return null;

  return (
    <div
      className="fixed inset-x-4 md:inset-x-6 z-40 pointer-events-none flex justify-center md:justify-start"
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)" }}
    >
      <Link
        href="/cart"
        className="pointer-events-auto w-full max-w-md md:w-auto md:min-w-[320px] md:gap-6 h-[54px] rounded-full bg-[#18110C] text-white ps-1.5 pe-5 flex items-center justify-between shadow-[0_16px_38px_-10px_rgba(24,17,12,0.85)] ring-2 ring-[#E8A818] active:scale-[0.98] transition-transform"
      >
        <span className="flex items-center gap-3">
          <span className="relative w-10 h-10 rounded-full bg-[#E8A818] text-[#18110C] grid place-items-center">
            <CartIcon className="w-[18px] h-[18px]" />
            <span
              key={bump}
              className="absolute -top-1 -end-1 min-w-5 h-5 px-1 rounded-full bg-white text-[#18110C] text-[10px] font-black grid place-items-center ring-2 ring-[#18110C]"
            >
              {count}
            </span>
          </span>
          <span className="text-xs sm:text-sm font-extrabold">إتمام الطلب عبر واتساب</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="text-sm font-black text-[#E8A818] tabular-nums">{formatPrice(subtotal)}</span>
          <ArrowUpLeftIcon className="w-4 h-4 text-[#E8A818]" />
        </span>
      </Link>
    </div>
  );
}
