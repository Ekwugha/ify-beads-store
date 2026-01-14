"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame, Tag, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Product } from "@/types/product";
import { getAllProducts } from "@/lib/products";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const featuredProducts = products.filter((p) => p.isFeatured && !p.isSoldOut);
  const newArrivals = products.filter((p) => p.isNewArrival && !p.isSoldOut);
  const saleProducts = products.filter((p) => p.isOnSale && !p.isSoldOut);

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />

      {loading ? (
        <div className="py-24 flex items-center justify-center">
          <LoadingSpinner size="lg" text="Loading beautiful bags..." />
        </div>
      ) : (
        <>
          {/* Featured Products */}
          {featuredProducts.length > 0 && (
            <FeaturedProducts
              products={featuredProducts}
              title="Featured Collection"
              subtitle="Our most loved pieces, handpicked just for you"
            />
          )}

          {/* New Arrivals */}
          {newArrivals.length > 0 && (
            <section className="py-16 md:py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  <div className="inline-flex items-center gap-2 mb-4">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span className="font-body text-sm text-orange-600 uppercase tracking-wider font-semibold">
                      Fresh Arrivals
                    </span>
                  </div>
                  <h2 className="font-display text-3xl md:text-5xl font-bold text-brand-900">
                    New Arrivals
                  </h2>
                  <p className="mt-4 font-body text-lg text-brand-600">
                    Be the first to own our latest designs
                  </p>
                </motion.div>
                <FeaturedProducts
                  products={newArrivals}
                  showViewAll={true}
                  viewAllLink="/products?filter=new"
                  title=""
                  subtitle=""
                />
              </div>
            </section>
          )}

          {/* Sale Products */}
          {saleProducts.length > 0 && (
            <section className="py-16 md:py-24 bg-gradient-to-br from-red-50 to-pink-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  <div className="inline-flex items-center gap-2 mb-4">
                    <Tag className="w-5 h-5 text-red-500" />
                    <span className="font-body text-sm text-red-600 uppercase tracking-wider font-semibold">
                      Limited Time Offer
                    </span>
                  </div>
                  <h2 className="font-display text-3xl md:text-5xl font-bold text-brand-900">
                    On Sale Now
                  </h2>
                  <p className="mt-4 font-body text-lg text-brand-600">
                    Grab these deals before they&apos;re gone!
                  </p>
                </motion.div>
                <FeaturedProducts
                  products={saleProducts}
                  showViewAll={true}
                  viewAllLink="/products?filter=sale"
                  title=""
                  subtitle=""
                />
              </div>
            </section>
          )}

          {/* Trust Section */}
          <section className="py-16 md:py-24 bg-brand-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <Sparkles className="w-8 h-8 text-gold-400 mx-auto mb-4" />
                <h2 className="font-display text-3xl md:text-4xl font-bold">
                  Why Choose Ify Beads?
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Handcrafted Quality",
                    description:
                      "Each bag is meticulously handmade with premium beads and materials.",
                  },
                  {
                    title: "Unique Designs",
                    description:
                      "No two bags are exactly alike. Own a piece that's truly one-of-a-kind.",
                  },
                  {
                    title: "Easy WhatsApp Ordering",
                    description:
                      "Simply tap, chat, and order. No complicated checkout processes.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-6"
                  >
                    <h3 className="font-display text-xl font-semibold text-gold-400 mb-3">
                      {item.title}
                    </h3>
                    <p className="font-body text-brand-200">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </main>
  );
}

