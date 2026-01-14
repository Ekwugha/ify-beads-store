export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  imageUrl: string;
  isNewArrival: boolean;
  isSoldOut: boolean;
  isOnSale: boolean;
  isFeatured: boolean;
  isLimitedStock: boolean;
  saleEndsSoon: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  imageUrl: string;
  isNewArrival: boolean;
  isSoldOut: boolean;
  isOnSale: boolean;
  isFeatured: boolean;
  isLimitedStock: boolean;
  saleEndsSoon: boolean;
}

export const defaultProductFormData: ProductFormData = {
  name: "",
  description: "",
  price: 0,
  salePrice: undefined,
  imageUrl: "",
  isNewArrival: false,
  isSoldOut: false,
  isOnSale: false,
  isFeatured: false,
  isLimitedStock: false,
  saleEndsSoon: false,
};

