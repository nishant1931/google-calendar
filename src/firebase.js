// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBdYXhqSoduVHqVTcr3ydk-oArd4AKSvio",
//   authDomain: "calendar-78445.firebaseapp.com",
//   projectId: "calendar-78445",
//   storageBucket: "calendar-78445.appspot.com",
//   messagingSenderId: "999873188910",
//   appId: "1:999873188910:web:efc533c959c8d23fa97bbf",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
