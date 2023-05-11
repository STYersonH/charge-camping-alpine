// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHVTSmlHsYPmewLWEy7VSWCrwZfi0EVAc",
  authDomain: "charge-camping-alpine.firebaseapp.com",
  projectId: "charge-camping-alpine",
  storageBucket: "charge-camping-alpine.appspot.com",
  messagingSenderId: "1028723295352",
  appId: "1:1028723295352:web:da97de586d9c8d37f7598d",
  measurementId: "G-22LZ2FBGC9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
