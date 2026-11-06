import type { Metadata } from "next";
import { publicDB } from "@/lib/db";
import MenuClient from "@/components/MenuClient";

export const metadata: Metadata = {
  title: "المنيو الكامل | شاورما، مشاوي، فتات، بروستد ومقبلات سورية",
  description:
    "تصفح المنيو الكامل لمطعم الياسمين للمأكولات السورية في القاهرة — شاورما صاج وعربي، مشاوي عالفحم، فتات دمشقية بالسمن البلدي، مقبلات شامية، وصواني العيلة.",
  alternates: {
    canonical: "/menu",
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "https://alyasmin.chameleon.vision/menu",
    siteName: "مطعم الياسمين الدمشقي | Alyasmin",
    title: "المنيو السوري الكامل | مطعم الياسمين Alyasmin",
    description:
      "تصفح منيو مطعم الياسمين الكامل بالأسعار والصور — شاورما عالصاج، مشاوي عالفحم، فتات بالسمن البلدي، وبروستد سوري. اطلب الآن: 01010400507.",
    images: [
      {
        url: "/og-menu.jpg?v=3",
        width: 1200,
        height: 630,
        alt: "منيو مطعم الياسمين السوري الكامل | Alyasmin Menu",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "المنيو السوري الكامل | مطعم الياسمين Alyasmin",
    description:
      "تصفح منيو مطعم الياسمين الكامل بالأسعار والصور — شاورما عالصاج، مشاوي عالفحم، فتات بالسمن البلدي، وبروستد سوري.",
    images: ["/og-menu.jpg?v=3"],
  },
};

export const dynamic = "force-dynamic";

export default async function MenuPage() {
  const data = await publicDB();
  const available = data.products.filter((p) => p.isAvailable);

  return (
    <div className="pb-14">
      {/* Compact Alyasmin Original Yellow Shawarma-Pattern Hero Banner */}
      <section
        className="relative bg-[#E8A514] text-[#18110C] py-7 sm:py-10 px-4 sm:px-6 overflow-hidden border-b border-[#18110C]/10"
        style={{
          backgroundImage: 'url("/images/shawarma-pattern-gold.webp")',
          backgroundSize: "440px 440px",
        }}
      >
        <div className="relative z-10 mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-[#18110C]">
              منيو الياسمين السوري
            </h1>
            <p className="text-xs sm:text-sm font-bold text-[#18110C]/85 max-w-xl leading-relaxed">
              الشاورما عالصاج، المشاوي على الفحم، الفتات الدمشقية بالسمن البلدي، والمقبلات الشامية الطازجة.
            </p>
          </div>
        </div>
      </section>

      {/* Full-width MenuClient so the Sticky Category & Search Bar spans edge-to-edge and scrolls smoothly */}
      <MenuClient categories={data.categories} products={available} />
    </div>
  );
}
