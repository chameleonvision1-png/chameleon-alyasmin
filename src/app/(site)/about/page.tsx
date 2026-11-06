import type { Metadata } from "next";
import Link from "next/link";
import { JasmineDiamondIcon, PhoneIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "قصتنا | مطعم الياسمين للمأكولات السورية — أصالة المذاق الدمشقي",
  description:
    "تعرّف على قصة مطعم الياسمين للمأكولات السورية في القاهرة — أسرار التتبيلة الدمشقية الأصيلة، جودة المكونات، وكرم الضيافة الشامية.",
  openGraph: {
    title: "حكاية مطعم الياسمين الدمشقي",
    description: "طعم الشام في كل لقمة — تتبيلات سورية عريقة وكرم ضيافة أصيل في القاهرة",
    images: [{ url: "/og-about.jpg?v=1", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-about.jpg?v=1"],
  },
};

export default function AboutPage() {
  const pillars = [
    {
      titleAr: "تتبيلة دمشقية أصلية",
      titleEn: "AUTHENTIC RECIPES",
      desc: "نعتمد على الخلطات والتوابل الشامية المتوارثة لتحضير الشاورما والمشاوي والفتات بنفس الطعم الدمشقي الأصيل.",
    },
    {
      titleAr: "مكونات طازجة يومياً",
      titleEn: "FRESH DAILY INGREDIENTS",
      desc: "لحوم ودواجن طازجة يومياً، خبز صاج يُخبز ساخناً مع كل طلب، وثومية كريمية ومقبلات تُحضّر أولاً بأول.",
    },
    {
      titleAr: "كرم الضيافة السورية",
      titleEn: "SYRIAN HOSPITALITY",
      desc: "نهتم بأدق التفاصيل من وفرة الحصص إلى التغليف الحراري الفاخر ليصلك الطعام وكأنه خرج للتو من المطبخ.",
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-16">
      <section className="relative bg-[#18110C] text-white rounded-b-[32px] py-12 sm:py-16 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'url("/images/shawarma-pattern-gold.webp")',
            backgroundSize: "460px 460px",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E8A818]/35 bg-[#E8A818]/10 px-3 py-1 text-xs font-extrabold text-[#E8A818]">
            <JasmineDiamondIcon className="w-3 h-3" />
            <span dir="ltr" className="font-en">OUR DAMASCENE STORY</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white">
            حكاية الياسمين — طعم الشام في كل لقمة
          </h1>
          <p className="text-xs sm:text-sm text-white/75 max-w-2xl leading-relaxed">
            من قلب القاهرة، انطلق مطعم الياسمين ليحمل عبق المطبخ السوري الدمشقي الأصيل، ويجمع بين عراقة الوصفات الشامية وجودة التحضير العصري.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-[#18110C]">
              أصالة المذاق السوري في كل طبق نُقدمه
            </h2>
            <p className="text-xs sm:text-sm text-[#292929]/80 leading-relaxed">
              تستمد هويتنا اسمها ورمزها من زهرة الياسمين الدمشقية التي تشتهر بها بيوت وحارات الشام العريقة — رمز النقاء، الدفء، والترحيب بالضيف.
            </p>
            <p className="text-xs sm:text-sm text-[#292929]/80 leading-relaxed">
              سواء كنت تبحث عن ساندوتش شاورما عالصاج محمص بإتقان، أو فتة شاورما بالسمن البلدي والمكسرات، أو صينية مشاوي مشكلة لجمعة العيلة، فإن كل طبق في الياسمين يُحضّر بشغف وإتقان ليرضي ذوقك.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link href="/menu" className="btn btn-primary text-xs">
                تصفح المنيو الكامل
              </Link>
              <a
                href="tel:01010400507"
                className="btn btn-outline text-xs"
              >
                <PhoneIcon className="w-3.5 h-3.5 text-[#A87508]" />
                <span dir="ltr" className="font-en">01010400507</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-[28px] overflow-hidden bg-[#18110C] shadow-xl border border-[#18110C]/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero/story-syrian-table.webp"
                alt="مطعم الياسمين للمأكولات السورية"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((p) => (
            <div
              key={p.titleEn}
              className="rounded-[26px] bg-[#FAF6EC] border border-[#E8A818]/35 p-6 space-y-2.5"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-base sm:text-lg font-black text-[#18110C] text-right">
                  {p.titleAr}
                </h3>
                <span dir="ltr" className="font-en text-[10px] font-extrabold text-[#A87508] text-left">
                  {p.titleEn}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#292929]/75 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
