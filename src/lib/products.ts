import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage, isFirebaseConfigured, isStorageConfigured } from "./firebase";
import { Product, ProductFormData } from "@/types/product";

// Helper to check Firebase configuration
function checkFirebaseConfig() {
  if (!isFirebaseConfigured) {
    throw new Error(
      "Firebase is not configured. Please add your Firebase environment variables to Vercel."
    );
  }
}

const COLLECTION_NAME = "products";

// Convert Firestore document to Product type
const convertDoc = (doc: any): Product => {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name,
    description: data.description,
    price: data.price,
    salePrice: data.salePrice,
    imageUrl: data.imageUrl,
    isNewArrival: data.isNewArrival || false,
    isSoldOut: data.isSoldOut || false,
    isOnSale: data.isOnSale || false,
    isFeatured: data.isFeatured || false,
    isLimitedStock: data.isLimitedStock || false,
    saleEndsSoon: data.saleEndsSoon || false,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
  };
};

// Get all products
export async function getAllProducts(): Promise<Product[]> {
  checkFirebaseConfig();
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(convertDoc);
  } catch (error: any) {
    console.error("Error fetching products:", error);
    if (error.code === "failed-precondition") {
      throw new Error("Database index required. Please check Firebase console for index creation link.");
    }
    if (error.code === "permission-denied") {
      throw new Error("Permission denied. Please check your Firestore security rules.");
    }
    throw error;
  }
}

// Get featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  const q = query(
    collection(db, COLLECTION_NAME),
    where("isFeatured", "==", true),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(convertDoc);
}

// Get new arrivals
export async function getNewArrivals(): Promise<Product[]> {
  const q = query(
    collection(db, COLLECTION_NAME),
    where("isNewArrival", "==", true),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(convertDoc);
}

// Get products on sale
export async function getSaleProducts(): Promise<Product[]> {
  const q = query(
    collection(db, COLLECTION_NAME),
    where("isOnSale", "==", true),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(convertDoc);
}

// Get single product by ID
export async function getProductById(id: string): Promise<Product | null> {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return convertDoc(docSnap);
  }
  return null;
}

// Helper to remove undefined values (Firestore doesn't accept undefined)
function cleanData(obj: Record<string, any>): Record<string, any> {
  const cleaned: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

// Add a new product
export async function addProduct(data: ProductFormData): Promise<string> {
  checkFirebaseConfig();
  try {
    const cleanedData = cleanData({
      ...data,
      salePrice: data.isOnSale && data.salePrice ? data.salePrice : null,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    
    const docRef = await addDoc(collection(db, COLLECTION_NAME), cleanedData);
    return docRef.id;
  } catch (error: any) {
    console.error("Error adding product:", error);
    if (error.code === "permission-denied") {
      throw new Error("Permission denied. Please check your Firestore security rules allow writes.");
    }
    throw error;
  }
}

// Update a product
export async function updateProduct(id: string, data: Partial<ProductFormData>): Promise<void> {
  checkFirebaseConfig();
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const cleanedData = cleanData({
      ...data,
      salePrice: data.isOnSale && data.salePrice ? data.salePrice : null,
      updatedAt: Timestamp.now(),
    });
    
    await updateDoc(docRef, cleanedData);
  } catch (error: any) {
    console.error("Error updating product:", error);
    if (error.code === "permission-denied") {
      throw new Error("Permission denied. Please check your Firestore security rules allow writes.");
    }
    throw error;
  }
}

// Delete a product
export async function deleteProduct(id: string, imageUrl?: string): Promise<void> {
  // Delete image from storage if exists
  if (imageUrl && (imageUrl.includes("firebasestorage.googleapis.com") || imageUrl.includes("firebasestorage.app"))) {
    try {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  }
  
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}

// Upload image to Firebase Storage
export async function uploadProductImage(file: File): Promise<string> {
  if (!isStorageConfigured) {
    throw new Error(
      "Firebase Storage is not configured. Please use an external image hosting service like imgbb.com instead."
    );
  }
  
  const timestamp = Date.now();
  const fileName = `products/${timestamp}_${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
  const storageRef = ref(storage, fileName);
  
  try {
    console.log("Uploading file to:", fileName);
    const snapshot = await uploadBytes(storageRef, file);
    console.log("Upload complete, getting download URL...");
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("Download URL:", downloadURL);
    return downloadURL;
  } catch (error: any) {
    console.error("Upload error details:", error);
    if (error.code === "storage/unauthorized") {
      throw new Error("Storage permission denied. Please check Firebase Storage rules.");
    }
    throw error;
  }
}

// Delete image from Firebase Storage
export async function deleteProductImage(imageUrl: string): Promise<void> {
  if (imageUrl && (imageUrl.includes("firebasestorage.googleapis.com") || imageUrl.includes("firebasestorage.app"))) {
    try {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  }
}

