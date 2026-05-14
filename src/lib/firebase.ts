import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getRemoteConfig, fetchAndActivate, getValue } from "firebase/remote-config";

const firebaseConfig = {
  apiKey: "AIzaSyAkMrg14DXGbynx94kEXorKvpsB8FT38eY",
  authDomain: "atscv-7eb38.firebaseapp.com",
  projectId: "atscv-7eb38",
  storageBucket: "atscv-7eb38.firebasestorage.app",
  messagingSenderId: "788163558010",
  appId: "1:788163558010:web:24dc2c103f6e48cc04d9c3",
  measurementId: "G-49D9KZSZXP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Remote Config
export const remoteConfig = getRemoteConfig(app);
remoteConfig.settings = {
  minimumFetchIntervalMillis: 3600000, // 1 hour
  fetchTimeoutMillis: 60000, // 60 seconds
};

// Default values for Remote Config
remoteConfig.defaultConfig = {
  "gemini_api": "", // Default empty, will be fetched from Firebase
};

/**
 * Fetches the Gemini API key from Firebase Remote Config
 * @returns Promise<string> - The Gemini API key
 */
export async function getGeminiApiKey(): Promise<string> {
  try {
    // Fetch and activate the latest config
    await fetchAndActivate(remoteConfig);

    // Get the Gemini API key
    const apiKey = getValue(remoteConfig, "gemini_api").asString();

    if (!apiKey) {
      console.warn("[Firebase Remote Config] Gemini API key not found in Remote Config");
      return "";
    }

    console.log("[Firebase Remote Config] Successfully fetched Gemini API key");
    return apiKey;
  } catch (error) {
    console.error("[Firebase Remote Config] Error fetching Gemini API key:", error);
    return "";
  }
}
