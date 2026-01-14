import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ify Beads - Handcrafted Bead Bags",
    short_name: "Ify Beads",
    description:
      "Discover exquisite handcrafted bead bags made with love. Each piece is unique and tells a story. Shop our collection of stunning bead bags.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF7F2",
    theme_color: "#683726",
    orientation: "portrait-primary",
    categories: ["shopping", "fashion", "lifestyle"],
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}

