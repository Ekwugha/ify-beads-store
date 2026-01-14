import type { Metadata, Viewport } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ifybeads.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ify Beads | Handcrafted Bead Bags",
    template: "%s | Ify Beads",
  },
  description:
    "Discover exquisite handcrafted bead bags made with love. Each piece is unique and tells a story. Shop our collection of stunning bead bags from Nigeria.",
  keywords: [
    "bead bags",
    "handcrafted bags",
    "beaded bags",
    "beaded purse",
    "luxury bags",
    "Nigerian fashion",
    "African fashion",
    "handmade bags",
    "artisan bags",
    "unique handbags",
    "statement bags",
    "evening bags",
    "Ify Beads",
  ],
  authors: [{ name: "Ify Beads" }],
  creator: "Ify Beads",
  publisher: "Ify Beads",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Ify Beads",
    title: "Ify Beads | Handcrafted Bead Bags",
    description:
      "Discover exquisite handcrafted bead bags made with love. Each piece is unique and tells a story.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Ify Beads - Handcrafted Bead Bags",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ify Beads | Handcrafted Bead Bags",
    description:
      "Discover exquisite handcrafted bead bags made with love. Each piece is unique and tells a story.",
    images: ["/twitter-image"],
    creator: "@ifybeads",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "fashion",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#683726" },
    { media: "(prefers-color-scheme: dark)", color: "#683726" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ify Beads",
    url: siteUrl,
    logo: `${siteUrl}/apple-icon`,
    description:
      "Discover exquisite handcrafted bead bags made with love. Each piece is unique and tells a story.",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "English",
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ify Beads",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/products?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${playfair.variable} ${outfit.variable} font-body antialiased bg-cream`}
      >
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#683726",
              color: "#fff",
              fontFamily: "var(--font-outfit)",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
