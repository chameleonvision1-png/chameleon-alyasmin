import type { Metadata } from "next";
import Link from "next/link";
import { publicDB } from "@/lib/db";
import BranchesShowcase from "@/components/BranchesShowcase";
import { ClockIcon, JasmineDiamondIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "التوصيل والطلبات | مطعم الياسمين للمأكولات السورية — القاهرة",
  description:
    "مناطق توصيل مطعم الياسمين في القاهرة الكبرى، مواعيد العمل، وأرقام الطلب السريع عبر الهاتف والواتساب: 01010400507.",
  openGraph: {
    title: "خدمة التوصيل والطلب السريع — مطعم الياسمين",
    description: "اطلب الآن أونلاين أو عبر الهاتف والواتساب: 01010400507 — توصيل سريع في القاهرة",
    images: [{ url: "/og-delivery.jpg?v=1", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-delivery.jpg?v=1"],
  },
};

export default async function DeliveryPage() {
  const data = await publicDB();

  return (
    <div className="min-h-screen bg-[#FAF6EC]/50 pb-16">
      <section className="relative bg-[#18110C] text-white rounded-b-[32px] py-10 sm:py-14 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'url("/images/shawarma-pattern-gold.webp")',
            backgroundSize: "460px 460px",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E8A818]/35 bg-[#E8A818]/10 px-3 py-1 text-xs font-extrabold text-[#E8A818]">
            <JasmineDiamondIcon className="w-3 h-3" />
            <span dir="ltr" className="font-en">FAST DELIVERY • CAIRO</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            التوصيل السريع ومناطق التغطية في القاهرة
          </h1>
          <p className="text-xs sm:text-sm text-white/75 max-w-xl">
            نوصّل أشهى المأكولات السورية الساخنة إلى باب منزلك أو مكتبك بتغليف حراري يحفظ القرمشة والحرارة.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Direct Order Banner */}
        <div className="rounded-[28px] bg-white border border-[#E8A818]/35 p-6 sm:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-[#18110C]">
              اطلب مباشرة من الموقع أو عبر الهاتف والواتساب
            </h2>
            <p className="text-xs sm:text-sm text-[#292929]/75 leading-relaxed">
              اختر أصنافك من المنيو وأرسل طلبك بضغطة زر عبر واتساب، أو تواصل معنا مباشرة على الرقم الموحد للطلبات والاستفسارات.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-bold text-[#5A3218]">
              <span className="inline-flex items-center gap-1.5">
                <ClockIcon className="w-4 h-4 text-[#E8A818]" />
                <span>يومياً من 11:00 ص حتى 2:00 ص</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <PinIcon className="w-4 h-4 text-[#E8A818]" />
                <span>القاهرة، مصر</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <Link
              href="/menu"
              className="rounded-2xl bg-[#E8A818] hover:bg-[#D99B10] text-[#18110C] font-black text-xs py-3.5 text-center transition"
            >
              اطلب من المنيو
            </Link>
            <a
              href="tel:01010400507"
              dir="ltr"
              className="font-en rounded-2xl bg-[#18110C] hover:bg-[#2B1E15] text-white font-black text-xs py-3.5 flex items-center justify-center gap-1.5 transition"
            >
              <PhoneIcon className="w-3.5 h-3.5 text-[#E8A818]" />
              <span>01010400507</span>
            </a>
            <a
              href="https://wa.me/201010400507"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-[#25D366] hover:brightness-105 text-white font-black text-xs py-3.5 flex items-center justify-center gap-1.5 transition"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>واتساب</span>
            </a>
          </div>
        </div>

        <BranchesShowcase branches={data.branches} />
      </div>
    </div>
  );
}
