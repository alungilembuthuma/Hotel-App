import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDpzYj712F0uNwZrQWuMXPa4emWhPpTsfU",
  authDomain: "hotel-app-7f859.firebaseapp.com",
  databaseURL: "https://hotel-app-7f859-default-rtdb.firebaseio.com/",
  projectId: "hotel-app-7f859",
  storageBucket: "hotel-app-7f859.appspot.com",
  messagingSenderId: "965768852220",
  appId: "1:965768852220:web:54291f8bed93a708d01d79",
  measurementId: "G-R9929RDGVM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app); // Change to Firestore

export { auth, db }; // Export auth and db
