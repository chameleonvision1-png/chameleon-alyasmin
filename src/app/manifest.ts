import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "مطعم الياسمين للمأكولات السورية | Alyasmin",
    short_name: "الياسمين",
    description: "أصالة المذاق السوري في كل طبق — شاورما، مشاوي، فتات، ومقبلات شامية في القاهرة",
    start_url: "/",
    display: "standalone",
    background_color: "#18110C",
    theme_color: "#E8A514",
    dir: "rtl",
    lang: "ar",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
