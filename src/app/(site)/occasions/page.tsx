import type { Metadata } from "next";
import { publicDB } from "@/lib/db";
import { ProductCard } from "@/components/Product";
import OccasionForm from "@/components/OccasionForm";
import { JasmineDiamondIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "صواني اللّمة والعزومات | مطعم الياسمين الدمشقي",
  description:
    "صواني العزومات وبوكسات الشاورما والمشاوي العائلية من مطعم الياسمين للمأكولات السورية — مجهزة للمناسبات والتجمعات العائلية.",
  openGraph: {
    title: "صواني اللّمة والعزومات — مطعم الياسمين",
    description: "بوكسات شاورما وصواني مشاوي وفتات دمشقية مجهزة للعزومات والمناسبات",
    images: [{ url: "/og-occasions.jpg?v=1", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-occasions.jpg?v=1"],
  },
};

export default async function OccasionsPage() {
  const data = await publicDB();
  const familyProducts = data.products.filter(
    (p) => p.isAvailable && (p.forFamily || p.categoryId === "family"),
  );

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
            <span dir="ltr" className="font-en">FAMILY FEASTS &amp; GATHERINGS</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            صواني اللّمة والعزومات الدمشقية
          </h1>
          <p className="text-xs sm:text-sm text-white/75 max-w-xl">
            ولائم سورية متكاملة من المشاوي المشكلة على الفحم، الشاورما العربي، الكبة الشامية، والفتات لتشرفك في كل عزومة ومناسبة.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid lg:grid-cols-[1fr_420px] gap-8 items-start">
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-[#18110C]">
            بوكسات وصواني العيلة المتاحة للطلب الفوري
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {familyProducts.map((p) => (
              <ProductCard key={p.id} product={p} variant="grid" />
            ))}
          </div>
        </div>

        <OccasionForm branches={data.branches} />
      </div>
    </div>
  );
}
