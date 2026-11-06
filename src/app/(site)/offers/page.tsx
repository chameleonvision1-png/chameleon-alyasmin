import type { Metadata } from "next";
import { publicDB } from "@/lib/db";
import OfferCard from "@/components/OfferCard";

export const metadata: Metadata = {
  title: "العروض وبوكسات التوفير العائلية | مطعم الياسمين",
  description:
    "اكتشف أقوى عروض وبوكسات التوفير العائلية من مطعم الياسمين للمأكولات السورية في القاهرة — بوكس لمة الياسمين، وليمة المشاوي، وعرض الكومبو الثنائي.",
  openGraph: {
    title: "عروض وبوكسات الياسمين للمأكولات السورية",
    description: "لمة العيلة تبدأ من هنا — أقوى عروض الشاورما والمشاوي السورية.",
    images: [{ url: "/og-offers.jpg", width: 1200, height: 630 }],
  },
};

export const dynamic = "force-dynamic";

export default async function OffersPage() {
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
            عروض الياسمين وبوكسات اللمة
          </h1>
          <p className="text-xs sm:text-sm font-bold text-[#18110C]/90 max-w-xl leading-relaxed">
            وفر أكثر مع بوكسات اللمة العائلية المجهزة طازجة من الشاورما العربي، المشاوي المشكلة، والفتات الدمشقية.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {data.offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
    </div>
  );
}
