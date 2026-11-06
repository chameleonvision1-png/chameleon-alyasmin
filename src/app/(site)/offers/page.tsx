import type { Metadata } from "next";
import Link from "next/link";
import { publicDB } from "@/lib/db";
import OfferCard from "@/components/OfferCard";
import { JasmineDiamondIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "عروض وبوكسات الياسمين | وفر مع عروض الشاورما والمشاوي",
  description:
    "أقوى عروض التوفير من مطعم الياسمين للمأكولات السورية — بوكسات الشاورما العائلية، صواني المشاوي والفتات، وعروض اللمة في القاهرة.",
  openGraph: {
    title: "عروض وبوكسات مطعم الياسمين الدمشقي",
    description: "أقوى عروض الشاورما والمشاوي والفتات لجمعة العيلة والصحاب في القاهرة",
    images: [{ url: "/og-offers.jpg?v=1", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-offers.jpg?v=1"],
  },
};

export default async function OffersPage() {
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
            <span dir="ltr" className="font-en">EXCLUSIVE OFFERS &amp; BUNDLES</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            عروض الياسمين وبوكسات التوفير
          </h1>
          <p className="text-xs sm:text-sm text-white/75 max-w-xl">
            باقات وعروض مميزة تجمع أشهر أطباق الشاورما والمشاوي والفتات بأسعار خاصة لجمعة العيلة والأصدقاء.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {data.offers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {data.offers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] bg-white border border-[#18110C]/10 p-10 text-center space-y-4">
            <h2 className="text-xl font-black text-[#18110C]">تابعنا لمعرفة أحدث العروض اليومية</h2>
            <Link href="/menu" className="btn btn-primary">
              تصفح المنيو الكامل
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
