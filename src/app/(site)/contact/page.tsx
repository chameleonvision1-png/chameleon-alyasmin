import type { Metadata } from "next";
import { publicDB } from "@/lib/db";
import OccasionForm from "@/components/OccasionForm";
import { JasmineDiamondIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "تواصل معنا | مطعم الياسمين للمأكولات السورية — 01010400507",
  description:
    "تواصل مع مطعم الياسمين للمأكولات السورية في القاهرة — الهاتف والواتساب: 01010400507، البريد الإلكتروني: alyasminaldimashqi24@gmail.com، وصفحة فيسبوك الرسمية.",
  openGraph: {
    title: "تواصل مع مطعم الياسمين الدمشقي",
    description: "الهاتف والطلبات: 01010400507 • القاهرة، مصر",
    images: [{ url: "/og-contact.jpg?v=1", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-contact.jpg?v=1"],
  },
};

export default async function ContactPage() {
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
            <span dir="ltr" className="font-en">GET IN TOUCH • ALYASMIN CAIRO</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            تواصل مع مطعم الياسمين والروابط الرسمية
          </h1>
          <p className="text-xs sm:text-sm text-white/75 max-w-xl">
            نسعد باستقبال طلباتكم واستفساراتكم يومياً عبر الهاتف المباشر، واتساب، أو صفحتنا الرسمية على فيسبوك.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid lg:grid-cols-[1fr_420px] gap-8 items-start">
        <div className="space-y-4">
          {/* Official Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="tel:01010400507"
              className="rounded-[24px] bg-white border border-[#18110C]/10 hover:border-[#E8A818] p-5 flex items-center justify-between gap-3 shadow-xs transition"
            >
              <div>
                <div className="text-xs font-bold text-[#A87508]">رقم الهاتف والطلبات</div>
                <div dir="ltr" className="font-en text-xl font-black text-[#18110C] mt-1">
                  01010400507
                </div>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-[#E8A818] text-[#18110C] grid place-items-center shrink-0">
                <PhoneIcon className="w-5 h-5" />
              </div>
            </a>

            <a
              href="https://wa.me/201010400507"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[24px] bg-white border border-[#18110C]/10 hover:border-[#25D366] p-5 flex items-center justify-between gap-3 shadow-xs transition"
            >
              <div>
                <div className="text-xs font-bold text-[#198754]">الطلب السريع عبر واتساب</div>
                <div dir="ltr" className="font-en text-xl font-black text-[#18110C] mt-1">
                  +20 101 040 0507
                </div>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-[#25D366] text-white grid place-items-center shrink-0">
                <WhatsAppIcon className="w-5 h-5" />
              </div>
            </a>
          </div>

          <div className="rounded-[24px] bg-white border border-[#18110C]/10 p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#18110C]/10 pb-3">
              <span className="text-xs sm:text-sm font-black text-[#18110C]">البريد الإلكتروني الرسمي</span>
              <a
                href="mailto:alyasminaldimashqi24@gmail.com"
                dir="ltr"
                className="font-en text-xs sm:text-sm font-bold text-[#A87508] hover:underline"
              >
                alyasminaldimashqi24@gmail.com
              </a>
            </div>

            <div className="flex items-center justify-between border-b border-[#18110C]/10 pb-3">
              <span className="text-xs sm:text-sm font-black text-[#18110C]">صفحة فيسبوك الرسمية (47K متابع)</span>
              <a
                href="https://www.facebook.com/profile.php?id=61555928014156"
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="font-en text-xs sm:text-sm font-bold text-[#18110C] bg-[#E8A818] px-3.5 py-1 rounded-full"
              >
                Alyasmin Facebook ↗
              </a>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-black text-[#18110C]">صفحة التقييمات والمراجعات</span>
              <a
                href="https://www.facebook.com/profile.php?id=61555928014156&sk=reviews"
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="font-en text-xs sm:text-sm font-bold text-[#A87508] hover:underline"
              >
                Facebook Reviews ↗
              </a>
            </div>
          </div>

          {/* Location Card */}
          <div className="rounded-[24px] bg-[#18110C] text-white p-6 space-y-2">
            <div className="flex items-center gap-2 text-[#E8A818] text-xs font-extrabold">
              <PinIcon className="w-4 h-4" />
              <span>القاهرة، مصر</span>
            </div>
            <h3 className="text-lg font-black">مطعم الياسمين للمأكولات السورية</h3>
            <p className="text-xs text-white/75 leading-relaxed">
              نخدم عملاءنا يومياً من الساعة 11:00 صباحاً حتى 2:00 بعد منتصف الليل بأشهى أطباق الشاورما، المشاوي، الفتات، والمقبلات السورية الأصيلة.
            </p>
          </div>
        </div>

        <OccasionForm branches={data.branches} />
      </div>
    </div>
  );
}
