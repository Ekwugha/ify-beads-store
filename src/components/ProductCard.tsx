"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Clock, Flame } from "lucide-react";
import { Product } from "@/types/product";
import { formatPrice, generateWhatsAppUrl, calculateDiscount } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const discount = product.isOnSale && product.salePrice 
    ? calculateDiscount(product.price, product.salePrice) 
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative"
    >
      <div className="relative bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden shadow-glass hover:shadow-glass-lg transition-all duration-500 border border-white/40">
        {/* Sale Ends Soon Banner */}
        {product.saleEndsSoon && product.isOnSale && !product.isSoldOut && (
          <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-body font-semibold py-1.5 text-center flex items-center justify-center gap-1">
            <Clock className="w-3 h-3" />
            Sale Ends Soon!
          </div>
        )}

        {/* Image Container */}
        <Link href={`/products/${product.id}`} className="block relative">
          <div className="relative aspect-square overflow-hidden">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
                <span className="text-brand-400 font-body">No Image</span>
              </div>
            )}

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Sold Out Overlay */}
            {product.isSoldOut && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="bg-white text-brand-900 font-display text-lg font-bold px-6 py-2 rounded-full">
                  Sold Out
                </span>
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {product.isNewArrival && !product.isSoldOut && (
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-body font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                <Flame className="w-3 h-3" />
                New
              </span>
            )}
            {product.isOnSale && !product.isSoldOut && discount > 0 && (
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-body font-semibold px-3 py-1.5 rounded-full shadow-lg">
                -{discount}%
              </span>
            )}
            {product.isLimitedStock && !product.isSoldOut && (
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-body font-semibold px-3 py-1.5 rounded-full shadow-lg">
                Limited
              </span>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="p-5">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-display text-lg font-semibold text-brand-900 group-hover:text-brand-700 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="mt-1 text-brand-600 font-body text-sm line-clamp-2 h-10">
            {product.description}
          </p>

          {/* Price */}
          <div className="mt-3 flex items-center gap-2">
            {product.isOnSale && product.salePrice ? (
              <>
                <span className="font-display text-xl font-bold text-brand-900">
                  {formatPrice(product.salePrice)}
                </span>
                <span className="font-body text-sm text-brand-400 line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="font-display text-xl font-bold text-brand-900">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* WhatsApp Button */}
          {!product.isSoldOut && (
            <motion.a
              href={generateWhatsAppUrl(
                product.name,
                product.id,
                product.imageUrl,
                product.price,
                product.salePrice
              )}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-body font-semibold py-3 px-4 rounded-xl shadow-lg transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              Buy on WhatsApp
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

