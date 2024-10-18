import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDapx9bYQISOHbNaiWIStNrEj9a1LxSHTY",
  authDomain: "quantum-algo-ada72.firebaseapp.com",
  projectId: "quantum-algo-ada72",
  storageBucket: "quantum-algo-ada72.appspot.com",
  messagingSenderId: "242370164929",
  appId: "1:242370164929:web:ae15d4d4a98dc5147c3c40",
  measurementId: "G-TJR7CKZDR2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);