import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBS9Bn6Uxarw0ei398K4UmlLHR3rTwa4w0",
  authDomain: "food-cb709.firebaseapp.com",
  databaseURL: "https://food-cb709-default-rtdb.firebaseio.com",
  projectId: "food-cb709",
  storageBucket: "food-cb709.appspot.com",
  messagingSenderId: "915745800605",
  appId: "1:915745800605:web:c3d790661b80d2f398ef74"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

