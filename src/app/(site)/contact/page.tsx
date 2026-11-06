import type { Metadata } from "next";
import { publicDB } from "@/lib/db";
import OccasionForm from "@/components/OccasionForm";
import { FacebookIcon, MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "تواصل معنا | مطعم الياسمين للمأكولات السورية",
  description:
    "تواصل مع مطعم الياسمين للمأكولات السورية في القاهرة عبر الهاتف أو واتساب 01010400507 أو البريد الإلكتروني alyasminaldimashqi24@gmail.com.",
  openGraph: {
    title: "تواصل مع مطعم الياسمين للمأكولات السورية | 01010400507",
    description: "نسعد بخدمتكم وتلقي طلباتكم واستفساراتكم يومياً في القاهرة.",
    images: [{ url: "/og-contact.jpg?v=3", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "تواصل مع مطعم الياسمين للمأكولات السورية | 01010400507",
    images: ["/og-contact.jpg?v=3"],
  },
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const data = await publicDB();

  return (
    <div className="space-y-12 pb-16">
      <section
        className="relative bg-[#E8A514] text-[#18110C] rounded-b-[32px] sm:rounded-b-[40px] py-10 sm:py-14 px-4 sm:px-6 overflow-hidden shadow-md"
        style={{
          backgroundImage: 'url("/images/shawarma-pattern-gold.webp")',
          backgroundSize: "440px 440px",
        }}
      >
        <div className="relative z-10 mx-auto max-w-7xl space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-[0_3px_0_#18110C]">
            تواصل مع مطعم الياسمين
          </h1>
          <p className="text-xs sm:text-sm font-bold text-[#18110C]/90 max-w-xl leading-relaxed">
            نسعد بتلقي طلباتكم، حجوزات العزومات، ومقترحاتكم يومياً عبر الهاتف أو واتساب أو صفحتنا الرسمية.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-4">
          <a
            href="tel:01010400507"
            className="rounded-[24px] bg-[#FDF2CE] border border-[#E8A514]/45 p-5 flex items-center gap-4 hover:border-[#18110C] transition"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#18110C] text-[#E8A514] grid place-items-center shrink-0">
              <PhoneIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-[#5A3218]">الهاتف والطلبات المباشرة</div>
              <div dir="ltr" className="font-en text-xl font-black text-[#18110C] text-right">
                01010400507
              </div>
            </div>
          </a>

          <a
            href="https://wa.me/201010400507"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[24px] bg-[#FDF2CE] border border-[#E8A514]/45 p-5 flex items-center gap-4 hover:border-[#18110C] transition"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#18110C] text-[#E8A514] grid place-items-center shrink-0">
              <WhatsAppIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-[#5A3218]">واتساب الطلبات السريعة</div>
              <div dir="ltr" className="font-en text-lg font-black text-[#18110C] text-right">
                +20 101 040 0507
              </div>
            </div>
          </a>

          <a
            href="mailto:alyasminaldimashqi24@gmail.com"
            className="rounded-[24px] bg-[#FDF2CE] border border-[#E8A514]/45 p-5 flex items-center gap-4 hover:border-[#18110C] transition"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#18110C] text-[#E8A514] grid place-items-center shrink-0">
              <MailIcon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-extrabold text-[#5A3218]">البريد الإلكتروني الرسمي</div>
              <div
                dir="ltr"
                className="font-en text-xs sm:text-sm font-bold text-[#18110C] truncate text-right"
              >
                alyasminaldimashqi24@gmail.com
              </div>
            </div>
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61555928014156"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[24px] bg-[#FDF2CE] border border-[#E8A514]/45 p-5 flex items-center gap-4 hover:border-[#18110C] transition"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#18110C] text-[#E8A514] grid place-items-center shrink-0">
              <FacebookIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-[#5A3218]">فيسبوك الرسمي (47K+ متابع)</div>
              <div className="text-sm font-black text-[#18110C]">الياسمين Alyasmin</div>
            </div>
          </a>

          <div className="rounded-[24px] bg-white border border-[#18110C]/10 p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FDF2CE] text-[#18110C] grid place-items-center shrink-0">
              <MapPinIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-[#5A3218]">الموقع</div>
              <div className="text-sm font-black text-[#18110C]">القاهرة، مصر — توصيل لجميع المناطق</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <OccasionForm branches={data.branches} />
        </div>
      </div>
    </div>
  );
}
