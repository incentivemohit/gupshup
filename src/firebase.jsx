import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKuAAbafkyT85NpM0tbbkzPl2fVmf1bbw",
  authDomain: "whatsapp-5d4f9.firebaseapp.com",
  projectId: "whatsapp-5d4f9",
  storageBucket: "whatsapp-5d4f9.appspot.com",
  messagingSenderId: "817794252615",
  appId: "1:817794252615:web:9657fb5148442febc09662",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
