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
    src: "/images/hero/family-feast-box.webp",
    alt: "وليمة العيلة من الياسمين",
    caption: "صواني اللمة والعزومات السورية",
  },
];

export default function StoryGallery() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollToSlide = (idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    const child = el.children[idx] as HTMLElement | undefined;
    if (child) {
      child.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      setActive(idx);
    }
  };

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el || !el.clientWidth) return;
    const idx = Math.round(Math.abs(el.scrollLeft) / el.clientWidth);
    setActive(Math.max(0, Math.min(STORY_SLIDES.length - 1, idx)));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % STORY_SLIDES.length;
        const el = trackRef.current;
        if (el) {
          const child = el.children[next] as HTMLElement | undefined;
          if (child) {
            el.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
          }
        }
        return next;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative aspect-square sm:aspect-[5/4] rounded-[24px] sm:rounded-[28px] overflow-hidden bg-[#23170E] shadow-[0_20px_50px_-20px_rgba(24,17,12,0.25)]">
      {/* Horizontal Snap Track */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
      >
        {STORY_SLIDES.map((slide, idx) => (
          <div key={idx} className="w-full h-full shrink-0 snap-center relative">
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
      <div className="absolute inset-x-0 bottom-3.5 flex items-center justify-center gap-2 z-10">
        {STORY_SLIDES.map((slide, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => scrollToSlide(idx)}
            aria-label={slide.alt}
            className={`rounded-full transition-all ${
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
