
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyB7bDsrj9oQYKKQxPOtePHgf5J8KzgR3hY",
  authDomain: "aulalogin-d7b7c.firebaseapp.com",
  projectId: "aulalogin-d7b7c",
  storageBucket: "aulalogin-d7b7c.appspot.com",
  messagingSenderId: "737880906890",
  appId: "1:737880906890:web:2e21f28026f7457b576173"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


