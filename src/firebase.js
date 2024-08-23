
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCUQUUYS4JvDbA3ezQan-Zbt-Z851Se-aI",
  authDomain: "dailpe-a18fe.firebaseapp.com",
  projectId: "dailpe-a18fe",
  storageBucket: "dailpe-a18fe.appspot.com",
  messagingSenderId: "733510380530",
  appId: "1:733510380530:web:7c44a1e8d8f9e4fbaad96b"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
