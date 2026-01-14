import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Our Collection",
  description:
    "Browse our stunning collection of handcrafted bead bags. From elegant evening bags to statement pieces, find your perfect beaded accessory. Shop new arrivals, sale items, and limited edition bags.",
  openGraph: {
    title: "Shop Handcrafted Bead Bags | Ifvy Beads",
    description:
      "Browse our stunning collection of handcrafted bead bags. From elegant evening bags to statement pieces.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop Handcrafted Bead Bags | Ifvy Beads",
    description:
      "Browse our stunning collection of handcrafted bead bags. From elegant evening bags to statement pieces.",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

