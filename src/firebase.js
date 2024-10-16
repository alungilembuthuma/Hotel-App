import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDpzYj712F0uNwZrQWuMXPa4emWhPpTsfU",
  authDomain: "hotel-app-7f859.firebaseapp.com",
  projectId: "hotel-app-7f859",
  storageBucket: "hotel-app-7f859.appspot.com",
  messagingSenderId: "965768852220",
  appId: "1:965768852220:web:54291f8bed93a708d01d79",
  measurementId: "G-R9929RDGVM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
