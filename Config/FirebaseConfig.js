import { initializeApp } from "firebase/app";
import {getFirestore,collection} from "firebase/firestore" 

const firebaseConfig = {
  apiKey: "AIzaSyA2IMQKYgfUdXjGoC8H32Pj6fbNBmS_R18",
  authDomain: "nextjsapp-b1652.firebaseapp.com",
  projectId: "nextjsapp-b1652",
  storageBucket: "nextjsapp-b1652.appspot.com",
  messagingSenderId: "91708834194",
  appId: "1:91708834194:web:69d566d856d7fe9abd014b",
  measurementId: "G-VMLBVHD7KV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const  usersRef = collection(db,'Users');



