"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

interface FeaturedProductsProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
  viewAllLink?: string;
}

export default function FeaturedProducts({
  products,
  title = "Featured Collection",
  subtitle = "Our most loved pieces, handpicked just for you",
  showViewAll = true,
  viewAllLink = "/products",
}: FeaturedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-cream to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-gold-500" />
            <span className="font-body text-sm text-gold-600 uppercase tracking-wider font-semibold">
              Curated for You
            </span>
            <Sparkles className="w-5 h-5 text-gold-500" />
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-brand-900">
            {title}
          </h2>
          <p className="mt-4 font-body text-lg text-brand-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.slice(0, 8).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link href={viewAllLink}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-2 bg-brand-900 hover:bg-brand-800 text-white font-body font-semibold px-8 py-4 rounded-2xl shadow-xl transition-all duration-300"
              >
                View All Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

