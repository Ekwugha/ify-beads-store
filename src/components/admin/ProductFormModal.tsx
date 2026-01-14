"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X, Upload, Loader2, ImagePlus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Product, ProductFormData, defaultProductFormData } from "@/types/product";
import { addProduct, updateProduct, uploadProductImage, deleteProductImage } from "@/lib/products";

interface ProductFormModalProps {
  product?: Product | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function ProductFormModal({
  product,
  onClose,
  onSaved,
}: ProductFormModalProps) {
  const [formData, setFormData] = useState<ProductFormData>(defaultProductFormData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEditing = !!product;

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        salePrice: product.salePrice,
        imageUrl: product.imageUrl,
        isNewArrival: product.isNewArrival,
        isSoldOut: product.isSoldOut,
        isOnSale: product.isOnSale,
        isFeatured: product.isFeatured,
        isLimitedStock: product.isLimitedStock,
        saleEndsSoon: product.saleEndsSoon,
      });
      if (product.imageUrl) {
        setImagePreview(product.imageUrl);
      }
    }
  }, [product]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = async () => {
    if (imagePreview && formData.imageUrl && product) {
      // If editing and has existing image, mark for deletion
      try {
        await deleteProductImage(formData.imageUrl);
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
    
    setImageFile(null);
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, imageUrl: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error("Please enter a product name");
      return;
    }

    if (formData.price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    if (formData.isOnSale && (!formData.salePrice || formData.salePrice >= formData.price)) {
      toast.error("Sale price must be less than the original price");
      return;
    }

    setSaving(true);

    try {
      let imageUrl = formData.imageUrl;

      // Upload new image if selected
      if (imageFile) {
        setUploading(true);
        
        // Delete old image if editing and replacing
        if (isEditing && product?.imageUrl) {
          try {
            await deleteProductImage(product.imageUrl);
          } catch (error) {
            console.error("Error deleting old image:", error);
          }
        }

        try {
          imageUrl = await uploadProductImage(imageFile);
        } catch (uploadError: any) {
          console.error("Image upload failed:", uploadError);
          toast.error("Image upload failed. Saving product without image.");
          // Continue without image
          imageUrl = "";
        }
        setUploading(false);
      }

      const productData: ProductFormData = {
        ...formData,
        imageUrl,
        salePrice: formData.isOnSale ? formData.salePrice : undefined,
      };

      if (isEditing && product) {
        await updateProduct(product.id, productData);
        toast.success("Product updated successfully!");
      } else {
        await addProduct(productData);
        toast.success("Product added successfully!");
      }

      onSaved();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product. Please try again.");
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl my-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-brand-100">
          <h2 className="font-display text-2xl font-bold text-brand-900">
            {isEditing ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-brand-600 hover:text-brand-900 hover:bg-brand-50 rounded-xl transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block font-body font-semibold text-brand-900 mb-2">
              Product Image
            </label>
            <div className="relative">
              {imagePreview ? (
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-brand-100">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 640px"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-3 bg-white rounded-full text-brand-900 hover:bg-brand-50 transition-colors"
                    >
                      <ImagePlus className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="p-3 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full aspect-video rounded-2xl border-2 border-dashed border-brand-200 hover:border-brand-400 bg-brand-50 hover:bg-brand-100 flex flex-col items-center justify-center gap-3 transition-colors"
                >
                  <Upload className="w-10 h-10 text-brand-400" />
                  <span className="font-body text-brand-600">
                    Click to upload image
                  </span>
                  <span className="font-body text-sm text-brand-400">
                    PNG, JPG, GIF up to 5MB
                  </span>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>
            
            {/* Alternative: Image URL */}
            <div className="mt-3">
              <p className="font-body text-sm text-brand-500 mb-2">
                Or paste an image URL:
              </p>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl && !imageFile ? formData.imageUrl : ""}
                onChange={(e) => {
                  const url = e.target.value;
                  setFormData((prev) => ({ ...prev, imageUrl: url }));
                  if (url) {
                    setImagePreview(url);
                    setImageFile(null);
                  } else {
                    setImagePreview(null);
                  }
                }}
                className="w-full px-4 py-2 bg-brand-50 border border-brand-200 rounded-xl font-body text-sm text-brand-900 placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block font-body font-semibold text-brand-900 mb-2"
            >
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Elegant Pearl Bead Bag"
              className="w-full px-4 py-3 bg-brand-50 border border-brand-200 rounded-xl font-body text-brand-900 placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block font-body font-semibold text-brand-900 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your beautiful bead bag..."
              rows={4}
              className="w-full px-4 py-3 bg-brand-50 border border-brand-200 rounded-xl font-body text-brand-900 placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all resize-none"
            />
          </div>

          {/* Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="price"
                className="block font-body font-semibold text-brand-900 mb-2"
              >
                Price (₦) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price || ""}
                onChange={handleInputChange}
                placeholder="15000"
                min="0"
                step="100"
                className="w-full px-4 py-3 bg-brand-50 border border-brand-200 rounded-xl font-body text-brand-900 placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                required
              />
            </div>
            <div>
              <label
                htmlFor="salePrice"
                className="block font-body font-semibold text-brand-900 mb-2"
              >
                Sale Price (₦)
              </label>
              <input
                type="number"
                id="salePrice"
                name="salePrice"
                value={formData.salePrice || ""}
                onChange={handleInputChange}
                placeholder="12000"
                min="0"
                step="100"
                disabled={!formData.isOnSale}
                className="w-full px-4 py-3 bg-brand-50 border border-brand-200 rounded-xl font-body text-brand-900 placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Toggle Options */}
          <div className="space-y-4">
            <p className="font-body font-semibold text-brand-900">
              Product Options
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* On Sale */}
              <label className="flex items-center gap-3 p-4 bg-brand-50 rounded-xl cursor-pointer hover:bg-brand-100 transition-colors">
                <input
                  type="checkbox"
                  name="isOnSale"
                  checked={formData.isOnSale}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-brand-300 text-brand-600 focus:ring-brand-500"
                />
                <div>
                  <span className="font-body font-medium text-brand-900">On Sale</span>
                  <p className="font-body text-sm text-brand-500">Show sale badge</p>
                </div>
              </label>

              {/* Sold Out */}
              <label className="flex items-center gap-3 p-4 bg-brand-50 rounded-xl cursor-pointer hover:bg-brand-100 transition-colors">
                <input
                  type="checkbox"
                  name="isSoldOut"
                  checked={formData.isSoldOut}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-brand-300 text-brand-600 focus:ring-brand-500"
                />
                <div>
                  <span className="font-body font-medium text-brand-900">Sold Out</span>
                  <p className="font-body text-sm text-brand-500">Mark as unavailable</p>
                </div>
              </label>

              {/* New Arrival */}
              <label className="flex items-center gap-3 p-4 bg-brand-50 rounded-xl cursor-pointer hover:bg-brand-100 transition-colors">
                <input
                  type="checkbox"
                  name="isNewArrival"
                  checked={formData.isNewArrival}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-brand-300 text-brand-600 focus:ring-brand-500"
                />
                <div>
                  <span className="font-body font-medium text-brand-900">New Arrival</span>
                  <p className="font-body text-sm text-brand-500">Show new badge</p>
                </div>
              </label>

              {/* Featured */}
              <label className="flex items-center gap-3 p-4 bg-brand-50 rounded-xl cursor-pointer hover:bg-brand-100 transition-colors">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-brand-300 text-brand-600 focus:ring-brand-500"
                />
                <div>
                  <span className="font-body font-medium text-brand-900">Featured</span>
                  <p className="font-body text-sm text-brand-500">Show on homepage</p>
                </div>
              </label>

              {/* Limited Stock */}
              <label className="flex items-center gap-3 p-4 bg-brand-50 rounded-xl cursor-pointer hover:bg-brand-100 transition-colors">
                <input
                  type="checkbox"
                  name="isLimitedStock"
                  checked={formData.isLimitedStock}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-brand-300 text-brand-600 focus:ring-brand-500"
                />
                <div>
                  <span className="font-body font-medium text-brand-900">Limited Stock</span>
                  <p className="font-body text-sm text-brand-500">Show limited badge</p>
                </div>
              </label>

              {/* Sale Ends Soon */}
              <label className="flex items-center gap-3 p-4 bg-brand-50 rounded-xl cursor-pointer hover:bg-brand-100 transition-colors">
                <input
                  type="checkbox"
                  name="saleEndsSoon"
                  checked={formData.saleEndsSoon}
                  onChange={handleInputChange}
                  disabled={!formData.isOnSale}
                  className="w-5 h-5 rounded border-brand-300 text-brand-600 focus:ring-brand-500 disabled:opacity-50"
                />
                <div className={!formData.isOnSale ? "opacity-50" : ""}>
                  <span className="font-body font-medium text-brand-900">Sale Ends Soon</span>
                  <p className="font-body text-sm text-brand-500">Show urgency banner</p>
                </div>
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center gap-4 pt-4 border-t border-brand-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 font-body font-semibold text-brand-700 hover:text-brand-900 py-3 rounded-xl hover:bg-brand-50 transition-colors"
            >
              Cancel
            </button>
            <motion.button
              type="submit"
              disabled={saving}
              whileHover={{ scale: saving ? 1 : 1.02 }}
              whileTap={{ scale: saving ? 1 : 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-body font-semibold py-3 rounded-xl shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {uploading ? "Uploading..." : "Saving..."}
                </>
              ) : (
                <>{isEditing ? "Update Product" : "Add Product"}</>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

