import type { Metadata } from "next";
import { publicDB } from "@/lib/db";
import OccasionForm from "@/components/OccasionForm";

export const metadata: Metadata = {
  title: "صواني اللمة والعزومات السورية | مطعم الياسمين",
  description:
    "جهز عزومتك أو مناسبتك مع صواني اللمة وولائم الشاورما والمشاوي السورية من مطعم الياسمين في القاهرة — 01010400507.",
  openGraph: {
    title: "ولائم وعزومات مطعم الياسمين للمأكولات السورية",
    description: "صواني شاورما ومشاوي وفتات سورية فاخرة تكفي كل اللمة.",
    images: [{ url: "/og-occasions.jpg", width: 1200, height: 630 }],
  },
};

export const dynamic = "force-dynamic";

export default async function OccasionsPage() {
  const data = await publicDB();
  const familyTrays = data.products.filter((p) => p.categoryId === "cat-family" && p.isAvailable);

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
            ولائم الياسمين وصواني العزومات
          </h1>
          <p className="text-xs sm:text-sm font-bold text-[#18110C]/90 max-w-xl leading-relaxed">
            تجهيز كامل للعزومات العائلية، المناسبات، واجتماعات الشركات بأفخم صواني الشاورما العربي والمشاوي الشامية على الفحم.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-6 space-y-4">
          <h2 className="text-2xl font-black text-[#18110C]">أشهر صواني وبوكسات اللمة</h2>
          <div className="space-y-4">
            {familyTrays.map((item) => (
              <div
                key={item.id}
                className="rounded-[24px] bg-[#FDF2CE] border border-[#E8A514]/45 p-4 flex items-center gap-4"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.nameAr}
                  className="w-24 h-24 rounded-2xl object-cover shrink-0 bg-[#18110C]"
                />
                <div className="space-y-1 min-w-0 flex-1">
                  <h3 className="font-extrabold text-base text-[#18110C]">{item.nameAr}</h3>
                  <p className="text-xs text-[#292929]/75 line-clamp-2">{item.descriptionAr}</p>
                  <div className="text-sm font-black text-[#5A3218]">
                    {item.sizes[0]?.price} ج.م
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">
          <OccasionForm branches={data.branches} />
        </div>
      </div>
    </div>
  );
}
