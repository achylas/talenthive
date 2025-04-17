// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxD0CyfhecobE3iETjpBCFhHZO94Ly31U",
  authDomain: "talenthive-b3b7f.firebaseapp.com",
  projectId: "talenthive-b3b7f",
  storageBucket: "talenthive-b3b7f.firebasestorage.app",
  messagingSenderId: "76488115105",
  appId: "1:76488115105:web:34b44e4c378dcb7e21c1e0",
  measurementId: "G-JKJ5F3J5XV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);