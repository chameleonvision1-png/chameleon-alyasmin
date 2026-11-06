import type { Metadata } from "next";
import { publicDB } from "@/lib/db";
import MenuClient from "@/components/MenuClient";
import { JasmineDiamondIcon, PhoneIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "منيو الياسمين الكامل بالأسعار | شاورما، مشاوي، فتات ومقبلات",
  description:
    "تصفح منيو مطعم الياسمين للمأكولات السورية — شاورما دجاج ولحم عالصاج، مشاوي مشكلة عالفحم، فتات دمشقية بالسمن البلدي، مقبلات سورية، وصواني العزومات.",
  openGraph: {
    title: "منيو مطعم الياسمين الدمشقي الكامل",
    description:
      "شاورما عالصاج • مشاوي شامي عالفحم • فتات بالسمن البلدي • مقبلات سورية • وجبات عائلية",
    images: [{ url: "/og-menu.jpg?v=1", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-menu.jpg?v=1"],
  },
};

export default async function MenuPage() {
  const data = await publicDB();

  return (
    <div className="min-h-screen bg-white">
      {/* LOMORA Dark Walnut Page Header */}
      <section className="relative bg-[#18110C] text-white rounded-b-[32px] py-10 sm:py-14 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'url("/images/shawarma-pattern-gold.webp")',
            backgroundSize: "460px 460px",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E8A818]/35 bg-[#E8A818]/10 px-3 py-1 text-xs font-extrabold text-[#E8A818]">
              <JasmineDiamondIcon className="w-3 h-3" />
              <span dir="ltr" className="font-en">FULL DAMASCENE MENU</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              منيو مطعم الياسمين الكامل
            </h1>
            <p className="text-xs sm:text-sm text-white/75 max-w-xl">
              اختر أطباقك المفضلة من الشاورما السورية والمشاوي والفتات والمقبلات، وحدد الحجم والإضافات ليصلك طلبك ساخناً وطازجاً.
            </p>
          </div>

          <a
            href="tel:01010400507"
            className="self-start sm:self-auto inline-flex items-center gap-2 rounded-full bg-[#E8A818] text-[#18110C] font-black text-xs px-5 py-2.5 shadow"
          >
            <PhoneIcon className="w-3.5 h-3.5" />
            <span>للطلب السريع:</span>
            <span dir="ltr" className="font-en">01010400507</span>
          </a>
        </div>
      </section>

      <MenuClient categories={data.categories} products={data.products} />
    </div>
  );
}
