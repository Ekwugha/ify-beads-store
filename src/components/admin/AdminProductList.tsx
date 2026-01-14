"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Edit,
  Trash2,
  MoreVertical,
  Eye,
  EyeOff,
  Tag,
  Flame,
  AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";
import { Product } from "@/types/product";
import { deleteProduct, updateProduct } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import LoadingSpinner from "@/components/LoadingSpinner";

interface AdminProductListProps {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onRefresh: () => void;
}

export default function AdminProductList({
  products,
  loading,
  onEdit,
  onRefresh,
}: AdminProductListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleDelete = async (product: Product) => {
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) {
      return;
    }

    setDeletingId(product.id);
    try {
      await deleteProduct(product.id, product.imageUrl);
      toast.success("Product deleted");
      onRefresh();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  const handleQuickToggle = async (
    product: Product,
    field: keyof Product,
    value: boolean
  ) => {
    try {
      await updateProduct(product.id, { [field]: value });
      toast.success("Product updated");
      onRefresh();
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
    setActiveMenu(null);
  };

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading products..." />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-brand-100">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="font-display text-xl font-bold text-brand-900 mb-2">
          No products yet
        </h3>
        <p className="font-body text-brand-600">
          Click &quot;Add Product&quot; to create your first product
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-brand-100 overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-brand-50 border-b border-brand-100">
            <tr>
              <th className="text-left font-body font-semibold text-brand-700 px-6 py-4">
                Product
              </th>
              <th className="text-left font-body font-semibold text-brand-700 px-6 py-4">
                Price
              </th>
              <th className="text-left font-body font-semibold text-brand-700 px-6 py-4">
                Status
              </th>
              <th className="text-left font-body font-semibold text-brand-700 px-6 py-4">
                Badges
              </th>
              <th className="text-right font-body font-semibold text-brand-700 px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-brand-50 hover:bg-brand-50/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-brand-100">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-brand-300 text-xs">
                          No img
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-display font-semibold text-brand-900">
                        {product.name}
                      </p>
                      <p className="font-body text-sm text-brand-500 line-clamp-1 max-w-xs">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    {product.isOnSale && product.salePrice ? (
                      <>
                        <p className="font-display font-bold text-brand-900">
                          {formatPrice(product.salePrice)}
                        </p>
                        <p className="font-body text-sm text-brand-400 line-through">
                          {formatPrice(product.price)}
                        </p>
                      </>
                    ) : (
                      <p className="font-display font-bold text-brand-900">
                        {formatPrice(product.price)}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {product.isSoldOut ? (
                    <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs font-body font-medium px-3 py-1.5 rounded-full">
                      <EyeOff className="w-3 h-3" />
                      Sold Out
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-body font-medium px-3 py-1.5 rounded-full">
                      <Eye className="w-3 h-3" />
                      Available
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {product.isNewArrival && (
                      <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs font-body px-2 py-1 rounded-full">
                        <Flame className="w-3 h-3" />
                        New
                      </span>
                    )}
                    {product.isOnSale && (
                      <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs font-body px-2 py-1 rounded-full">
                        <Tag className="w-3 h-3" />
                        Sale
                      </span>
                    )}
                    {product.isLimitedStock && (
                      <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-body px-2 py-1 rounded-full">
                        <AlertTriangle className="w-3 h-3" />
                        Limited
                      </span>
                    )}
                    {product.isFeatured && (
                      <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 text-xs font-body px-2 py-1 rounded-full">
                        ★ Featured
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-2 text-brand-600 hover:text-brand-900 hover:bg-brand-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      disabled={deletingId === product.id}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      {deletingId === product.id ? (
                        <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
                    </button>
                    <div className="relative">
                      <button
                        onClick={() =>
                          setActiveMenu(
                            activeMenu === product.id ? null : product.id
                          )
                        }
                        className="p-2 text-brand-600 hover:text-brand-900 hover:bg-brand-100 rounded-lg transition-colors"
                        title="More"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      <AnimatePresence>
                        {activeMenu === product.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-brand-100 py-2 z-50 min-w-[180px]"
                          >
                            <button
                              onClick={() =>
                                handleQuickToggle(
                                  product,
                                  "isSoldOut",
                                  !product.isSoldOut
                                )
                              }
                              className="w-full text-left px-4 py-2 font-body text-sm hover:bg-brand-50 transition-colors"
                            >
                              {product.isSoldOut
                                ? "Mark as Available"
                                : "Mark as Sold Out"}
                            </button>
                            <button
                              onClick={() =>
                                handleQuickToggle(
                                  product,
                                  "isOnSale",
                                  !product.isOnSale
                                )
                              }
                              className="w-full text-left px-4 py-2 font-body text-sm hover:bg-brand-50 transition-colors"
                            >
                              {product.isOnSale
                                ? "Remove from Sale"
                                : "Put on Sale"}
                            </button>
                            <button
                              onClick={() =>
                                handleQuickToggle(
                                  product,
                                  "isFeatured",
                                  !product.isFeatured
                                )
                              }
                              className="w-full text-left px-4 py-2 font-body text-sm hover:bg-brand-50 transition-colors"
                            >
                              {product.isFeatured
                                ? "Remove Featured"
                                : "Add to Featured"}
                            </button>
                            <button
                              onClick={() =>
                                handleQuickToggle(
                                  product,
                                  "isNewArrival",
                                  !product.isNewArrival
                                )
                              }
                              className="w-full text-left px-4 py-2 font-body text-sm hover:bg-brand-50 transition-colors"
                            >
                              {product.isNewArrival
                                ? "Remove New Arrival"
                                : "Mark as New Arrival"}
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-brand-100">
        {products.map((product) => (
          <div key={product.id} className="p-4">
            <div className="flex gap-4">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-brand-100 flex-shrink-0">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-brand-300 text-xs">
                    No img
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-brand-900 truncate">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  {product.isOnSale && product.salePrice ? (
                    <>
                      <span className="font-display font-bold text-brand-900">
                        {formatPrice(product.salePrice)}
                      </span>
                      <span className="font-body text-sm text-brand-400 line-through">
                        {formatPrice(product.price)}
                      </span>
                    </>
                  ) : (
                    <span className="font-display font-bold text-brand-900">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {product.isSoldOut && (
                    <span className="inline-flex bg-gray-100 text-gray-700 text-xs font-body px-2 py-0.5 rounded-full">
                      Sold Out
                    </span>
                  )}
                  {product.isNewArrival && (
                    <span className="inline-flex bg-emerald-100 text-emerald-700 text-xs font-body px-2 py-0.5 rounded-full">
                      New
                    </span>
                  )}
                  {product.isOnSale && (
                    <span className="inline-flex bg-red-100 text-red-700 text-xs font-body px-2 py-0.5 rounded-full">
                      Sale
                    </span>
                  )}
                  {product.isFeatured && (
                    <span className="inline-flex bg-purple-100 text-purple-700 text-xs font-body px-2 py-0.5 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-4">
              <button
                onClick={() => onEdit(product)}
                className="flex items-center gap-1 px-3 py-2 text-brand-600 hover:bg-brand-50 rounded-lg font-body text-sm transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(product)}
                disabled={deletingId === product.id}
                className="flex items-center gap-1 px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg font-body text-sm transition-colors disabled:opacity-50"
              >
                {deletingId === product.id ? (
                  <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

