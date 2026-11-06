import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Cairo, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = "https://alyasmin.chameleon.vision";
const siteTitle = "مطعم الياسمين الدمشقي | Alyasmin Syrian Cuisine — أصالة المذاق السوري";
const siteDescription =
  "مطعم الياسمين للمأكولات السورية في القاهرة — شاورما سوري عالصاج، مشاوي شامية عالفحم، فتات دمشقية بالسمن البلدي، مقبلات سورية، وصواني العزومات العائلية. اطلب الآن: 01010400507.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "الياسمين Alyasmin",
  title: {
    default: siteTitle,
    template: "%s | مطعم الياسمين الدمشقي",
  },
  description: siteDescription,
  keywords: [
    "مطعم الياسمين",
    "الياسمين الدمشقي",
    "Alyasmin Syrian Restaurant",
    "أكل سوري في القاهرة",
    "شاورما سوري",
    "فتة شاورما",
    "مشاوي شامية",
    "كبة شامية",
    "منيو مطعم الياسمين",
    "رقم مطعم الياسمين 01010400507",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon-192.png?v=3", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png?v=3", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/icon-192.png?v=3"],
    apple: [{ url: "/icon-192.png?v=3", sizes: "192x192", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: siteUrl,
    siteName: "مطعم الياسمين الدمشقي | Alyasmin",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og-image.jpg?v=3",
        width: 1200,
        height: 630,
        alt: "مطعم الياسمين للمأكولات السورية — أصالة المذاق السوري في كل طبق",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.jpg?v=3"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "الياسمين",
  },
};

export const viewport: Viewport = {
  themeColor: "#E8A818",
};

const pwaInitScript = `
(function() {
  if (typeof window === "undefined") return;
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker.register("/sw.js").catch(function() {});
    });
  }
  window.addEventListener("beforeinstallprompt", function(e) {
    e.preventDefault();
    window.__pwaInstallPrompt = e;
    window.dispatchEvent(new Event("pwa-install-available"));
  });
  window.addEventListener("appinstalled", function() {
    window.__pwaInstallPrompt = null;
    window.dispatchEvent(new Event("pwa-app-installed"));
  });
})();
`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "مطعم الياسمين للمأكولات السورية - Alyasmin",
  alternateName: "Alyasmin Syrian Cuisine",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/og-image.jpg`,
  servesCuisine: ["Syrian", "Levantine", "Shawarma", "Middle Eastern", "Charcoal Grill"],
  priceRange: "$$",
  telephone: "+201010400507",
  email: "alyasminaldimashqi24@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "القاهرة",
    addressRegion: "القاهرة",
    addressCountry: "EG",
  },
  sameAs: ["https://www.facebook.com/profile.php?id=61555928014156"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${cairo.variable} ${jakarta.variable} antialiased`}
    >
      <body suppressHydrationWarning className="min-h-dvh flex flex-col w-full max-w-full overflow-x-clip">
        <Script
          id="pwa-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: pwaInitScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
