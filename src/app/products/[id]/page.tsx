"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MessageCircle,
  Flame,
  Tag,
  AlertTriangle,
  Clock,
  Share2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Product } from "@/types/product";
import { getProductById, getAllProducts } from "@/lib/products";
import {
  formatPrice,
  generateWhatsAppUrl,
  calculateDiscount,
} from "@/lib/utils";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const id = params.id as string;
        const productData = await getProductById(id);
        
        if (!productData) {
          router.push("/products");
          return;
        }
        
        setProduct(productData);

        // Fetch related products
        const allProducts = await getAllProducts();
        const related = allProducts
          .filter((p) => p.id !== id && !p.isSoldOut)
          .slice(0, 4);
        setRelatedProducts(related);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id, router]);

  const handleShare = async () => {
    if (!product) return;

    const shareData = {
      title: product.name,
      text: `Check out this beautiful bead bag: ${product.name}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-cream">
        <Navbar />
        <div className="pt-32 flex items-center justify-center">
          <LoadingSpinner size="lg" text="Loading product..." />
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-cream">
        <Navbar />
        <div className="pt-32 text-center">
          <p className="font-body text-brand-600">Product not found</p>
          <Link href="/products" className="text-brand-700 underline mt-4 inline-block">
            Back to products
          </Link>
        </div>
      </main>
    );
  }

  const discount =
    product.isOnSale && product.salePrice
      ? calculateDiscount(product.price, product.salePrice)
      : 0;

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      {/* Breadcrumb */}
      <section className="pt-24 pb-4 md:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 font-body text-brand-600 hover:text-brand-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Collection
          </Link>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-4 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              {/* Sale Ends Soon Banner */}
              {product.saleEndsSoon && product.isOnSale && !product.isSoldOut && (
                <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-body font-semibold py-2 text-center flex items-center justify-center gap-2 rounded-t-3xl">
                  <Clock className="w-4 h-4" />
                  Sale Ends Soon!
                </div>
              )}

              <div
                className={`relative aspect-square rounded-3xl overflow-hidden shadow-glass-lg ${
                  product.saleEndsSoon && product.isOnSale ? "mt-0" : ""
                }`}
              >
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
                    <span className="text-brand-400 font-body text-lg">
                      No Image Available
                    </span>
                  </div>
                )}

                {/* Sold Out Overlay */}
                {product.isSoldOut && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="bg-white text-brand-900 font-display text-2xl font-bold px-8 py-3 rounded-full">
                      Sold Out
                    </span>
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNewArrival && !product.isSoldOut && (
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-body font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                      <Flame className="w-4 h-4" />
                      New Arrival
                    </span>
                  )}
                  {product.isOnSale && !product.isSoldOut && discount > 0 && (
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-body font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      {discount}% OFF
                    </span>
                  )}
                  {product.isLimitedStock && !product.isSoldOut && (
                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-body font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Limited Stock
                    </span>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-brand-900">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-4 flex items-center gap-3">
                {product.isOnSale && product.salePrice ? (
                  <>
                    <span className="font-display text-3xl md:text-4xl font-bold text-brand-900">
                      {formatPrice(product.salePrice)}
                    </span>
                    <span className="font-body text-xl text-brand-400 line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="bg-red-100 text-red-600 text-sm font-body font-semibold px-3 py-1 rounded-full">
                      Save {formatPrice(product.price - product.salePrice)}
                    </span>
                  </>
                ) : (
                  <span className="font-display text-3xl md:text-4xl font-bold text-brand-900">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="mt-6">
                <h2 className="font-display text-lg font-semibold text-brand-900 mb-2">
                  Description
                </h2>
                <p className="font-body text-brand-600 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { label: "Handcrafted", value: "Yes" },
                  { label: "Material", value: "Premium Beads" },
                  { label: "Style", value: "Luxury" },
                  { label: "Care", value: "Handle with Care" },
                ].map((feature) => (
                  <div
                    key={feature.label}
                    className="bg-white/60 backdrop-blur-md rounded-xl p-4 border border-brand-100"
                  >
                    <p className="font-body text-sm text-brand-500">
                      {feature.label}
                    </p>
                    <p className="font-display font-semibold text-brand-900">
                      {feature.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                {!product.isSoldOut ? (
                  <motion.a
                    href={generateWhatsAppUrl(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-body font-semibold text-lg py-4 px-6 rounded-2xl shadow-xl transition-all duration-300"
                  >
                    <MessageCircle className="w-6 h-6" />
                    Buy on WhatsApp
                  </motion.a>
                ) : (
                  <button
                    disabled
                    className="flex-1 flex items-center justify-center gap-3 bg-gray-300 text-gray-500 font-body font-semibold text-lg py-4 px-6 rounded-2xl cursor-not-allowed"
                  >
                    Sold Out
                  </button>
                )}

                <motion.button
                  onClick={handleShare}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 bg-white border-2 border-brand-200 text-brand-700 font-body font-semibold py-4 px-6 rounded-2xl hover:bg-brand-50 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </motion.button>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 pt-8 border-t border-brand-100">
                <div className="flex flex-wrap items-center gap-4 text-sm font-body text-brand-600">
                  <span className="flex items-center gap-2">
                    ✓ 100% Handmade
                  </span>
                  <span className="flex items-center gap-2">
                    ✓ Premium Quality
                  </span>
                  <span className="flex items-center gap-2">
                    ✓ Fast Delivery
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-900 text-center mb-12">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}

