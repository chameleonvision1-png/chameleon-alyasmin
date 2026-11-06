import Link from "next/link";

interface BentoCell {
  id: string;
  type: "quote" | "photo";
  line1?: string;
  line2?: string;
  alt?: string;
  image?: string;
  href?: string;
}

const BENTO_CELLS: BentoCell[] = [
  // Row 1 Cell 1: Quote Tile
  {
    id: "q-1",
    type: "quote",
    line1: "طعم الشام في كل لقمة.",
    line2: "صُنع بحب لجمعة العيلة.",
  },
  // Row 1 Cell 2: Photo
  {
    id: "p-shawarma",
    type: "photo",
    alt: "الشاورما السورية",
    image: "/images/products/shawarma-arabi-chicken.webp",
    href: "/menu#cat-shawarma",
  },
  // Row 1 Cell 3: Photo
  {
    id: "p-grills",
    type: "photo",
    alt: "المشاوي الشامية",
    image: "/images/products/mixed-grill-syrian.webp",
    href: "/menu#cat-grills",
  },
  // Row 1 Cell 4: Photo
  {
    id: "p-fatteh",
    type: "photo",
    alt: "الفتات الدمشقية",
    image: "/images/products/fatteh-chicken.webp",
    href: "/menu#cat-fatteh",
  },
  // Row 2 Cell 1: Photo
  {
    id: "p-mezze",
    type: "photo",
    alt: "المقبلات السورية",
    image: "/images/products/hummus-beiruti.webp",
    href: "/menu#cat-appetizers",
  },
  // Row 2 Cell 2: Photo
  {
    id: "p-kibbeh",
    type: "photo",
    alt: "الكبة الشامية",
    image: "/images/products/kibbeh-shamiya.webp",
    href: "/menu#cat-appetizers",
  },
  // Row 2 Cell 3: Quote Tile
  {
    id: "q-2",
    type: "quote",
    line1: "أصالة المذاق السوري.",
    line2: "تتبيلة دمشقية على أصولها.",
  },
  // Row 2 Cell 4: Photo
  {
    id: "p-family",
    type: "photo",
    alt: "ولائم وصواني العيلة",
    image: "/images/products/walima-syrian-tray.webp",
    href: "/menu#cat-family",
  },
];

export default function ChessboardBento() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      {/* =====================================================================
          8-CELL CHESSBOARD BENTO MOSAIC GRID
          Desktop: 4 columns × 2 rows (`lg:grid-cols-4`) matching `media_1793973639351_06794481.jpg`
          Mobile: 2 columns × 4 rows (`grid-cols-2`) matching `media_1793973600701_ff99753a.jpg`
         ===================================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        {BENTO_CELLS.map((cell) => {
          if (cell.type === "quote") {
            return (
              <div
                key={cell.id}
                className="aspect-square rounded-[20px] sm:rounded-[24px] bg-[#FDF2CE] border border-[#E8A514]/35 p-4 sm:p-6 flex flex-col items-center justify-center text-center relative overflow-hidden"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.14]"
                  style={{
                    backgroundImage: 'url("/images/shawarma-pattern-overlay.png")',
                    backgroundSize: "340px 340px",
                  }}
                />
                <div className="relative z-10 space-y-0.5 text-xs sm:text-sm font-bold text-[#18110C] leading-relaxed">
                  <div>{cell.line1}</div>
                  <div className="text-[#5A3218]">{cell.line2}</div>
                </div>
              </div>
            );
          }

          return (
            <Link
              key={cell.id}
              href={cell.href || "/menu"}
              className="group relative aspect-square rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#23170E] shadow-xs"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cell.image}
                alt={cell.alt || ""}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
