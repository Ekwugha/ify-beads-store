import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Check if Firebase is properly configured (storage is optional)
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId
);

// Check if Firebase Storage is configured
export const isStorageConfigured = Boolean(firebaseConfig.storageBucket);

if (!isFirebaseConfigured && typeof window !== "undefined") {
  console.error(
    "Firebase is not configured! Please set the following environment variables:\n" +
    "- NEXT_PUBLIC_FIREBASE_API_KEY\n" +
    "- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN\n" +
    "- NEXT_PUBLIC_FIREBASE_PROJECT_ID\n" +
    "- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET\n" +
    "- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID\n" +
    "- NEXT_PUBLIC_FIREBASE_APP_ID"
  );
}

// Initialize Firebase only if it hasn't been initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

