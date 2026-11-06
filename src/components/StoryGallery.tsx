"use client";

import { useEffect, useRef, useState } from "react";

const STORY_SLIDES = [
  {
    src: "/images/hero/story-syrian-table.webp",
    alt: "مشاوي مطعم الياسمين السورية",
    caption: "مشاوي شامية متبلة على الفحم",
  },
  {
    src: "/images/hero/hero-shawarma-arabi.webp",
    alt: "بوكس الشاورما العربي الدمشقي",
    caption: "شاورما عربي دمشقي بخبز الصاج",
  },
  {
    src: "/images/hero/hero-mixed-grill.webp",
    alt: "مشاوي مشكلة شامي",
    caption: "كباب حلبي وشيش طاووق طازج يومياً",
  },
  {
    src: "/images/products/shawarma-beef-saj.webp",
    alt: "سفرة الياسمين الدمشقية",
    caption: "صواني اللمة والعزومات السورية",
  },
];

export default function StoryGallery() {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % STORY_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const diff = endX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        setActive((prev) => (prev + 1) % STORY_SLIDES.length);
      } else {
        setActive((prev) => (prev - 1 + STORY_SLIDES.length) % STORY_SLIDES.length);
      }
    }
    touchStartX.current = null;
  };

  return (
    <div
      dir="ltr"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative aspect-square sm:aspect-[5/4] rounded-[24px] sm:rounded-[28px] overflow-hidden bg-[#23170E] shadow-[0_20px_50px_-20px_rgba(24,17,12,0.25)] select-none"
    >
      <div
        className="w-full h-full flex transition-transform duration-500 ease-out"
        style={{ transform: `translate3d(-${active * 100}%, 0, 0)` }}
      >
        {STORY_SLIDES.map((slide, idx) => (
          <div key={idx} dir="rtl" className="w-full h-full shrink-0 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            <div className="absolute inset-x-4 bottom-10 text-center">
              <span className="inline-block rounded-full bg-black/45 backdrop-blur-md border border-white/15 px-3.5 py-1 text-xs font-extrabold text-white">
                {slide.caption}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Working Carousel Dots */}
      <div className="absolute inset-x-0 bottom-3.5 flex items-center justify-center gap-2 z-10" dir="ltr">
        {STORY_SLIDES.map((slide, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActive(idx)}
            aria-label={slide.alt}
            className={`rounded-full transition-all cursor-pointer ${
              idx === active
                ? "w-6 h-2 bg-[#E8A514] shadow"
                : "w-2 h-2 bg-white/55 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
