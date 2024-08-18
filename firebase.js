// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoPosyMmYnhj9WnJADcLAHsjTyGFKfLtI",
  authDomain: "tasktracker-4aa68.firebaseapp.com",
  projectId: "tasktracker-4aa68",
  storageBucket: "tasktracker-4aa68.appspot.com",
  messagingSenderId: "305409838210",
  appId: "1:305409838210:web:9815e3a2eca8a31494389b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;