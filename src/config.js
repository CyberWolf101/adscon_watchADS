import { initializeApp } from "firebase/app";
import { getFirestore, } from 'firebase/firestore';
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"

// const firebaseConfig = {
//   apiKey: "AIzaSyA8n4LA_jXXFfZgm81AIAB66iLRBNrXNq8",
//   authDomain: "adscon-5db56.firebaseapp.com",
//   projectId: "adscon-5db56",
//   storageBucket: "adscon-5db56.appspot.com",
//   messagingSenderId: "876409827602",
//   appId: "1:876409827602:web:bf686bf3c4d2e69738c3cb"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCzFolXvGRgoBropu-30sP0QFLAXUkdBvQ",
  authDomain: "shopwithtosin-209ec.firebaseapp.com",
  projectId: "shopwithtosin-209ec",
  storageBucket: "shopwithtosin-209ec.appspot.com",
  messagingSenderId: "938766798824",
  appId: "1:938766798824:web:f1ad597e7331859aa6de5d"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();

export const storage = getStorage()

export const auth = getAuth()