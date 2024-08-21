
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6Uh8Q3C4TOWWVfS2iaCJeBe8eRajjVxQ",
  authDomain: "daily-pe-82261.firebaseapp.com",
  projectId: "daily-pe-82261",
  storageBucket: "daily-pe-82261.appspot.com",
  messagingSenderId: "237203250316",
  appId: "1:237203250316:web:5e6d362e87f47a528a6fa9"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
