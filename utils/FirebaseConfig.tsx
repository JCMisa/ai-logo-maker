// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: "website-fullstack-9a383.firebaseapp.com",
  projectId: "website-fullstack-9a383",
  storageBucket: "website-fullstack-9a383.firebasestorage.app",
  messagingSenderId: "70412643727",
  appId: "1:70412643727:web:deb63b6053580ea29aeffa",
  measurementId: "G-7GS0BPVL70",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
