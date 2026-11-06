import type { Metadata } from "next";
import { publicDB } from "@/lib/db";
import MenuClient from "@/components/MenuClient";

export const metadata: Metadata = {
  title: "المنيو الكامل | شاورما، مشاوي، فتات، بروستد ومقبلات سورية",
  description:
    "تصفح المنيو الكامل لمطعم الياسمين للمأكولات السورية في القاهرة — شاورما صاج وعربي، مشاوي عالفحم، فتات دمشقية بالسمن البلدي، مقبلات شامية، وصواني العيلة.",
  openGraph: {
    title: "المنيو السوري الكامل | مطعم الياسمين Alyasmin",
    description: "أصالة المذاق السوري في كل طبق — اطلب الآن توصيل سريع 01010400507.",
    images: [{ url: "/og-menu.jpg", width: 1200, height: 630 }],
  },
};

export const dynamic = "force-dynamic";

export default async function MenuPage() {
  const data = await publicDB();
  const available = data.products.filter((p) => p.isAvailable);

  return (
    <div className="space-y-8 pb-14">
      {/* Alyasmin Original Yellow Shawarma-Pattern Hero Banner */}
      <section
        className="relative bg-[#E8A514] text-[#18110C] rounded-b-[32px] sm:rounded-b-[40px] py-10 sm:py-14 px-4 sm:px-6 overflow-hidden shadow-md"
        style={{
          backgroundImage: 'url("/images/shawarma-pattern-gold.webp")',
          backgroundSize: "440px 440px",
        }}
      >
        <div className="relative z-10 mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-[0_3px_0_#18110C]">
              منيو الياسمين السوري
            </h1>
            <p className="text-xs sm:text-sm font-bold text-[#18110C]/90 max-w-xl leading-relaxed">
              اختر أطباقك الشامية المفضلة من الشاورما عالصاج، المشاوي على الفحم، الفتات الدمشقية بالسمن البلدي، والمقبلات الطازجة.
            </p>
          </div>

          <a
            href="tel:01010400507"
            className="self-start sm:self-auto rounded-full bg-[#18110C] text-[#E8A514] font-black text-xs px-5 py-2.5 shadow-md"
          >
            طلب سريع: <span dir="ltr" className="font-en">01010400507</span>
          </a>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MenuClient categories={data.categories} products={available} />
      </div>
    </div>
  );
}
