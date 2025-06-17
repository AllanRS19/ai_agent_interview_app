import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDf9zI0_T6JO1Pv_mUDkS45K3hLtzVAWck",
    authDomain: "arsprepwise.firebaseapp.com",
    projectId: "arsprepwise",
    storageBucket: "arsprepwise.firebasestorage.app",
    messagingSenderId: "9773634009",
    appId: "1:9773634009:web:e7fe720f5c917f9cf909c8",
    measurementId: "G-44WJBVVE3J"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);