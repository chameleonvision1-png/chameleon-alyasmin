import type { Metadata } from "next";
import { publicDB } from "@/lib/db";
import BranchesShowcase from "@/components/BranchesShowcase";
import { ClockIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "مناطق التوصيل والطلب السريع في القاهرة | مطعم الياسمين",
  description:
    "تعرف على مناطق التوصيل السريع لمطعم الياسمين للمأكولات السورية داخل القاهرة الكبرى واطلب مباشرة عبر الهاتف أو واتساب 01010400507.",
  openGraph: {
    title: "التوصيل السريع في القاهرة | مطعم الياسمين Alyasmin",
    description: "أكلك السوري المفضل يوصلك سخن وطازج — 01010400507.",
    images: [{ url: "/og-delivery.jpg?v=3", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "التوصيل السريع في القاهرة | مطعم الياسمين Alyasmin",
    images: ["/og-delivery.jpg?v=3"],
  },
};

export const dynamic = "force-dynamic";

export default async function DeliveryPage() {
  const data = await publicDB();

  return (
    <div className="space-y-10 pb-16">
      <section
        className="relative bg-[#E8A514] text-[#18110C] rounded-b-[32px] sm:rounded-b-[40px] py-10 sm:py-14 px-4 sm:px-6 overflow-hidden shadow-md"
        style={{
          backgroundImage: 'url("/images/shawarma-pattern-gold.webp")',
          backgroundSize: "440px 440px",
        }}
      >
        <div className="relative z-10 mx-auto max-w-7xl space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-[0_3px_0_#18110C]">
            التوصيل السريع ومناطق الخدمة
          </h1>
          <p className="text-xs sm:text-sm font-bold text-[#18110C]/90 max-w-xl leading-relaxed">
            نوصل أشهى الأطباق السورية طازجة وساخنة من مطبخ الياسمين إلى مختلف مناطق القاهرة الكبرى يومياً.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-[24px] bg-[#FDF2CE] border border-[#E8A514]/45 p-5 space-y-1.5">
            <div className="flex items-center gap-2 text-[#5A3218] font-black text-xs">
              <PhoneIcon className="w-4 h-4 text-[#18110C]" />
              <span>رقم الطلبات الموحد</span>
            </div>
            <a
              href="tel:01010400507"
              dir="ltr"
              className="font-en block text-2xl font-black text-[#18110C] text-right"
            >
              01010400507
            </a>
            <p className="text-xs text-[#292929]/75 font-semibold">اتصال مباشر أو طلب فوري عبر واتساب</p>
          </div>

          <div className="rounded-[24px] bg-[#FDF2CE] border border-[#E8A514]/45 p-5 space-y-1.5">
            <div className="flex items-center gap-2 text-[#5A3218] font-black text-xs">
              <ClockIcon className="w-4 h-4 text-[#18110C]" />
              <span>مواعيد العمل والتوصيل</span>
            </div>
            <div className="text-lg font-black text-[#18110C]">
              {data.branches[0]?.hours || "يومياً من ١٢:٠٠ ظهراً حتى ٢:٠٠ صباحاً"}
            </div>
            <p className="text-xs text-[#292929]/75 font-semibold">تجهيز فوري وتغليف حراري يحفظ السخونة</p>
          </div>

          <div className="rounded-[24px] bg-[#18110C] text-white p-5 flex flex-col justify-between gap-3">
            <div className="flex items-center gap-2 text-[#E8A514] font-black text-xs">
              <MapPinIcon className="w-4 h-4" />
              <span>طلب مباشر عبر واتساب</span>
            </div>
            <p className="text-xs text-white/80">
              أرسل طلبك وعنوانك مباشرة على واتساب الياسمين وهيتم تأكيد الطلب فوراً.
            </p>
            <a
              href="https://wa.me/201010400507"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#E8A514] text-[#18110C] font-black text-xs py-2.5 px-4 flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>تحدث معنا على واتساب</span>
            </a>
          </div>
        </div>

        <BranchesShowcase branches={data.branches} />
      </div>
    </div>
  );
}
