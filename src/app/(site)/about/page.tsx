import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "حكاية الياسمين | أصالة المذاق السوري في قلب القاهرة",
  description:
    "تعرف على قصة مطعم الياسمين للمأكولات السورية في القاهرة — شغفنا بالتتبيلة الدمشقية الأصيلة، الشاورما عالصاج، والمشاوي على الفحم.",
  openGraph: {
    title: "حكاية مطعم الياسمين للمأكولات السورية | Alyasmin",
    description: "طعم الشام في كل لقمة — عائلة تضم أكثر من 47,000 محب للأكل السوري الأصيل.",
    images: [{ url: "/og-about.jpg", width: 1200, height: 630 }],
  },
};

export default function AboutPage() {
  return (
    <div className="space-y-12 pb-16">
      <section
        className="relative bg-[#E8A514] text-[#18110C] rounded-b-[32px] sm:rounded-b-[40px] py-12 sm:py-16 px-4 sm:px-6 overflow-hidden shadow-md"
        style={{
          backgroundImage: 'url("/images/shawarma-pattern-gold.webp")',
          backgroundSize: "440px 440px",
        }}
      >
        <div className="relative z-10 mx-auto max-w-7xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-[0_3px_0_#18110C] leading-tight">
              حكاية الياسمين — طعم الشام في كل لقمة.
            </h1>
            <p className="text-xs sm:text-sm font-bold text-[#18110C]/90 leading-relaxed">
              من شوارع دمشق العتيقة وعبق زهر الياسمين، حملنا معنا أسرار المطبخ السوري الأصيل لنقدمها بكل حب وإتقان على مائدتك في القاهرة.
            </p>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-vertical-shadow.png"
            alt="شعار مطعم الياسمين"
            className="w-28 sm:w-36 h-auto object-contain"
          />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-[#18110C]">
              فلسفة الضيافة السورية على أصولها
            </h2>
            <p className="text-sm text-[#292929]/80 leading-relaxed">
              في مطعم الياسمين، نؤمن أن سر الأكل السوري الحقيقي يكمن في التفاصيل الصغيرة: اختيار اللحوم والدواجن الطازجة يومياً، النقع في التتبيلة الدمشقية المتوازنة لمدة ٢٤ ساعة، وخبز الصاج الساخن مع الثومية الكريمية الأصيلة.
            </p>
            <p className="text-sm text-[#292929]/80 leading-relaxed">
              بفضل ثقة أكثر من ٤٧,٠٠٠ متابع على صفحتنا الرسمية في القاهرة، نواصل يومياً تقديم أشهى أطباق الشاورما، المشاوي على الفحم، الفتات بالسمن البلدي، والمقبلات الشامية بنفس الجودة والروح العائلية الدافئة.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/menu"
                className="rounded-full bg-[#18110C] text-[#E8A514] font-black text-xs px-6 py-3"
              >
                تصفح المنيو الكامل
              </Link>
              <Link
                href="/contact"
                className="rounded-full bg-[#E8A514] text-[#18110C] font-black text-xs px-6 py-3"
              >
                تواصل معنا
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-[28px] overflow-hidden bg-[#18110C] shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero/story-syrian-table.webp"
                alt="أطباق مطعم الياسمين السورية"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
