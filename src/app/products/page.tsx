"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, Flame, Tag, Grid, LayoutGrid } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Product } from "@/types/product";
import { getAllProducts } from "@/lib/products";

function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [gridSize, setGridSize] = useState<"normal" | "large">("normal");

  useEffect(() => {
    const filter = searchParams.get("filter");
    if (filter) {
      setActiveFilter(filter);
    }
  }, [searchParams]);

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

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Apply filter
    if (activeFilter === "new") {
      result = result.filter((p) => p.isNewArrival);
    } else if (activeFilter === "sale") {
      result = result.filter((p) => p.isOnSale);
    } else if (activeFilter === "available") {
      result = result.filter((p) => !p.isSoldOut);
    }

    return result;
  }, [products, searchQuery, activeFilter]);

  const filters = [
    { key: null, label: "All", icon: Grid },
    { key: "new", label: "New Arrivals", icon: Flame },
    { key: "sale", label: "On Sale", icon: Tag },
    { key: "available", label: "In Stock", icon: LayoutGrid },
  ];

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-8 md:pt-32 md:pb-12 bg-gradient-to-b from-brand-50 to-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl font-bold text-brand-900"
          >
            Our Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-body text-lg text-brand-600 max-w-2xl mx-auto"
          >
            Discover our stunning range of handcrafted bead bags
          </motion.p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="sticky top-16 md:top-20 z-40 bg-cream/80 backdrop-blur-lg border-b border-brand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-400" />
              <input
                type="text"
                placeholder="Search bags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-brand-200 rounded-xl font-body text-brand-900 placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-400 hover:text-brand-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {filters.map((filter) => (
                <button
                  key={filter.key || "all"}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-body text-sm font-medium whitespace-nowrap transition-all ${
                    activeFilter === filter.key
                      ? "bg-brand-700 text-white shadow-lg"
                      : "bg-white text-brand-700 hover:bg-brand-50 border border-brand-200"
                  }`}
                >
                  <filter.icon className="w-4 h-4" />
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Grid Toggle (Desktop) */}
            <div className="hidden md:flex items-center gap-2 ml-auto">
              <button
                onClick={() => setGridSize("normal")}
                className={`p-2 rounded-lg transition-colors ${
                  gridSize === "normal"
                    ? "bg-brand-700 text-white"
                    : "bg-white text-brand-600 border border-brand-200"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setGridSize("large")}
                className={`p-2 rounded-lg transition-colors ${
                  gridSize === "large"
                    ? "bg-brand-700 text-white"
                    : "bg-white text-brand-600 border border-brand-200"
                }`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="py-24 flex items-center justify-center">
              <LoadingSpinner size="lg" text="Loading products..." />
            </div>
          ) : filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center"
            >
              <div className="text-6xl mb-4">😢</div>
              <h3 className="font-display text-2xl font-bold text-brand-900 mb-2">
                No products found
              </h3>
              <p className="font-body text-brand-600">
                {searchQuery
                  ? `No results for "${searchQuery}"`
                  : "Check back later for new arrivals!"}
              </p>
              {(searchQuery || activeFilter) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveFilter(null);
                  }}
                  className="mt-4 font-body text-brand-700 underline hover:text-brand-900"
                >
                  Clear filters
                </button>
              )}
            </motion.div>
          ) : (
            <>
              <p className="font-body text-brand-600 mb-6">
                Showing {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
              <AnimatePresence mode="popLayout">
                <motion.div
                  layout
                  className={`grid gap-6 md:gap-8 ${
                    gridSize === "large"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  }`}
                >
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-cream flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </main>
    }>
      <ProductsContent />
    </Suspense>
  );
}

