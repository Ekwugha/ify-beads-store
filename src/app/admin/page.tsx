"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  LogOut,
  Plus,
  Sparkles,
  Package,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import toast from "react-hot-toast";
import AdminProductList from "@/components/admin/AdminProductList";
import ProductFormModal from "@/components/admin/ProductFormModal";
import { Product } from "@/types/product";
import { getAllProducts } from "@/lib/products";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "ifybeads2024";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Check if already authenticated
    const savedAuth = sessionStorage.getItem("ifybeads_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    try {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("ifybeads_admin_auth", "true");
      toast.success("Welcome back!");
    } else {
      toast.error("Incorrect password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("ifybeads_admin_auth");
    setPassword("");
    toast.success("Logged out successfully");
  };

  const handleProductSaved = () => {
    fetchProducts();
    setShowAddModal(false);
    setEditingProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingProduct(null);
  };

  // Stats
  const totalProducts = products.length;
  const inStockProducts = products.filter((p) => !p.isSoldOut).length;
  const onSaleProducts = products.filter((p) => p.isOnSale).length;
  const newArrivals = products.filter((p) => p.isNewArrival).length;

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Sparkles className="w-12 h-12 text-gold-400 mx-auto mb-4" />
            <h1 className="font-display text-3xl font-bold text-white">
              Ify Beads Admin
            </h1>
            <p className="font-body text-brand-200 mt-2">
              Enter password to manage your store
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-300" />
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl font-body text-white placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all"
                  autoFocus
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-brand-900 font-body font-semibold py-4 rounded-xl shadow-lg transition-all"
              >
                Access Dashboard
              </motion.button>
            </div>
          </form>

          <p className="text-center text-brand-300 text-sm font-body mt-6">
            Forgot password? Contact your developer.
          </p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-brand-900 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-gold-400" />
              <span className="font-display text-xl font-bold">
                Ify Beads Admin
              </span>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="/"
                target="_blank"
                className="font-body text-sm text-brand-200 hover:text-white transition-colors"
              >
                View Store →
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg font-body text-sm transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Products",
              value: totalProducts,
              icon: Package,
              color: "bg-blue-500",
            },
            {
              label: "In Stock",
              value: inStockProducts,
              icon: TrendingUp,
              color: "bg-green-500",
            },
            {
              label: "On Sale",
              value: onSaleProducts,
              icon: DollarSign,
              color: "bg-red-500",
            },
            {
              label: "New Arrivals",
              value: newArrivals,
              icon: Sparkles,
              color: "bg-purple-500",
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-brand-100"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`${stat.color} p-2 rounded-lg text-white`}
                >
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-body text-sm text-brand-500">
                    {stat.label}
                  </p>
                  <p className="font-display text-2xl font-bold text-brand-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-brand-900">
            Products
          </h2>
          <motion.button
            onClick={() => setShowAddModal(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-body font-semibold px-6 py-3 rounded-xl shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </motion.button>
        </div>

        {/* Products List */}
        <AdminProductList
          products={products}
          loading={loading}
          onEdit={handleEditProduct}
          onRefresh={fetchProducts}
        />
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showAddModal && (
          <ProductFormModal
            product={editingProduct}
            onClose={handleCloseModal}
            onSaved={handleProductSaved}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

