// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-e10de.firebaseapp.com",
  projectId: "real-estate-e10de",
  storageBucket: "real-estate-e10de.firebasestorage.app",
  messagingSenderId: "596733623070",
  appId: "1:596733623070:web:d144f28f605d03f450e70f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

