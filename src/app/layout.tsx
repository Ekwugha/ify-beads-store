import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Ify Beads | Handcrafted Bead Bags",
  description:
    "Discover exquisite handcrafted bead bags made with love. Each piece is unique and tells a story. Shop our collection of stunning bead bags.",
  keywords: [
    "bead bags",
    "handcrafted bags",
    "beaded bags",
    "luxury bags",
    "Nigerian fashion",
    "handmade bags",
  ],
  openGraph: {
    title: "Ify Beads | Handcrafted Bead Bags",
    description:
      "Discover exquisite handcrafted bead bags made with love.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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

