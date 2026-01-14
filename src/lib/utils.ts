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
export function generateWhatsAppUrl(productName: string): string {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2348012345678";
  const message = encodeURIComponent(
    `Hi 👋 I want to buy the bead bag: ${productName}`
  );
  return `https://wa.me/${phoneNumber}?text=${message}`;
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

