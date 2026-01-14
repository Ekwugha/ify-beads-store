// Format price in Naira
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// Generate WhatsApp URL
export function generateWhatsAppUrl(
  productName: string,
  productId?: string,
  imageUrl?: string,
  price?: number,
  salePrice?: number
): string {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2348130106423";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 
    (typeof window !== "undefined" ? window.location.origin : "");
  
  // Build product URL
  const productUrl = productId ? `${siteUrl}/products/${productId}` : undefined;
  
  // Build message with product details
  let message = `Hi Ifunanya 👋\n\nI want to buy this bead bag:\n\n`;
  message += `*${productName}*\n\n`;
  
  // Add price
  if (salePrice && price) {
    message += `💰 Price: ₦${salePrice.toLocaleString()} (Was ₦${price.toLocaleString()})\n\n`;
  } else if (price) {
    message += `💰 Price: ₦${price.toLocaleString()}\n\n`;
  }
  
  // Add product page link (WhatsApp will show preview with image if OpenGraph is set)
  if (productUrl) {
    message += `🔗 ${productUrl}`;
  }
  
  // Add image URL separately so user can see it
  if (imageUrl) {
    message += `\n\n🖼️ ${imageUrl}`;
  }
  
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

// Classname utility
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Calculate discount percentage
export function calculateDiscount(originalPrice: number, salePrice: number): number {
  if (!salePrice || salePrice >= originalPrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

