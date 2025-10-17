// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// // You'll add other services like getFirestore here later

// // TODO: Replace the following with your app's Firebase project configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAUoSQw1U6ILyOS2iQY-UBAaJ7JWL6sn8w",
//   authDomain: "tooltribe-42d7a.firebaseapp.com",
//   projectId: "tooltribe-42d7a",
//   storageBucket: "tooltribe-42d7a.firebasestorage.app",
//   messagingSenderId: "430464546139",
//   appId: "1:430464546139:web:27c9063fc992fe2eadd67e",
//   measurementId: "G-0L6M60730J",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase Authentication and export it
// export const auth = getAuth(app);

// app/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDGImGEKVVlIZg8o1IoM9eZLU5vqfZPhwQ",
  authDomain: "zyvia-cf6da.firebaseapp.com",
  projectId: "zyvia-cf6da",
  storageBucket: "zyvia-cf6da.firebasestorage.app",
  messagingSenderId: "989737796481",
  appId: "1:989737796481:web:1d6759ebd60f19c2b79e80",
  measurementId: "G-VEE88E8P1E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
