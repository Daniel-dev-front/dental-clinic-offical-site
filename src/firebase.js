// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvhZbaKAehh901iVMuR1I0Qe9PBZcU-HY",
  authDomain: "dental-clinic-76463.firebaseapp.com",
  projectId: "dental-clinic-76463",
  storageBucket: "dental-clinic-76463.firebasestorage.app",
  messagingSenderId: "43750985114",
  appId: "1:43750985114:web:024f4513650d34b1ed3e23",
  measurementId: "G-LDGTSVV35X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
