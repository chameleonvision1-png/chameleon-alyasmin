import Link from "next/link";
import { JasmineDiamondIcon } from "./icons";

interface BentoCell {
  id: string;
  type: "quote" | "photo";
  quoteAr?: string;
  quoteEn?: string;
  titleAr?: string;
  titleEn?: string;
  image?: string;
  href?: string;
}

const BENTO_CELLS: BentoCell[] = [
  // Row 1 Cell 1: Quote Tile
  {
    id: "q-1",
    type: "quote",
    quoteAr: "طعم الشام في كل لقمة. صُنع بحب لجمعة العيلة.",
    quoteEn: "Authentic Flavors. Crafted for warm family gatherings.",
  },
  // Row 1 Cell 2: Photo
  {
    id: "p-shawarma",
    type: "photo",
    titleAr: "الشاورما السورية",
    titleEn: "Damascene Shawarma",
    image: "/images/products/shawarma-arabi-chicken.webp",
    href: "/menu#cat-shawarma",
  },
  // Row 1 Cell 3: Photo
  {
    id: "p-grills",
    type: "photo",
    titleAr: "المشاوي الشامية",
    titleEn: "Charcoal Grills",
    image: "/images/products/mixed-grill-syrian.webp",
    href: "/menu#cat-grills",
  },
  // Row 1 Cell 4: Photo
  {
    id: "p-fatteh",
    type: "photo",
    titleAr: "الفتات الدمشقية",
    titleEn: "Syrian Fatteh",
    image: "/images/products/fatteh-chicken.webp",
    href: "/menu#cat-fatteh",
  },
  // Row 2 Cell 1: Photo
  {
    id: "p-mezze",
    type: "photo",
    titleAr: "المقبلات السورية",
    titleEn: "Levantine Mezze",
    image: "/images/products/hummus-beiruti.webp",
    href: "/menu#cat-appetizers",
  },
  // Row 2 Cell 2: Photo
  {
    id: "p-kibbeh",
    type: "photo",
    titleAr: "الكبة والسمبوسك",
    titleEn: "Syrian Kibbeh",
    image: "/images/products/kibbeh-shamiya.webp",
    href: "/menu#cat-appetizers",
  },
  // Row 2 Cell 3: Quote Tile
  {
    id: "q-2",
    type: "quote",
    quoteAr: "تتبيلات دمشقية عريقة، ومكونات طازجة يومياً.",
    quoteEn: "Prepared with care. Timeless recipe, lasting warmth.",
  },
  // Row 2 Cell 4: Photo
  {
    id: "p-family",
    type: "photo",
    titleAr: "ولائم وصواني العيلة",
    titleEn: "Family Feasts",
    image: "/images/products/walima-syrian-tray.webp",
    href: "/menu#cat-family",
  },
];

export default function ChessboardBento() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* =====================================================================
          8-CELL CHESSBOARD BENTO MOSAIC GRID
          Desktop: 4 columns × 2 rows (`lg:grid-cols-4`)
          Mobile: 2 columns × 4 rows (`grid-cols-2`) matching `media_1793973600701_ff99753a.jpg`
         ===================================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        {BENTO_CELLS.map((cell) => {
          if (cell.type === "quote") {
            return (
              <div
                key={cell.id}
                className="aspect-square rounded-[22px] sm:rounded-[26px] bg-[#F5F1E6] border border-[#E8A818]/20 p-4 sm:p-6 flex flex-col items-center justify-center text-center relative overflow-hidden"
              >
                <JasmineDiamondIcon className="w-4 h-4 text-[#E8A818] mb-2.5 shrink-0" />
                <p className="text-xs sm:text-base font-extrabold text-[#18110C] leading-relaxed max-w-[210px]">
                  {cell.quoteAr}
                </p>
                <p
                  dir="ltr"
                  className="font-en mt-2 text-[10px] sm:text-xs font-medium text-[#5A3218]/75 leading-snug max-w-[200px]"
                >
                  {cell.quoteEn}
                </p>
              </div>
            );
          }

          return (
            <Link
              key={cell.id}
              href={cell.href || "/menu"}
              className="group relative aspect-square rounded-[22px] sm:rounded-[26px] overflow-hidden bg-[#18110C] shadow-sm border border-[#18110C]/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cell.image}
                alt={cell.titleAr || ""}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18110C]/85 via-transparent to-transparent" />
              <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2 text-white">
                <div className="text-right min-w-0">
                  <div className="font-extrabold text-xs sm:text-sm text-white truncate">
                    {cell.titleAr}
                  </div>
                  <div
                    dir="ltr"
                    className="font-en text-[10px] text-[#E8A818] truncate text-right"
                  >
                    {cell.titleEn}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
