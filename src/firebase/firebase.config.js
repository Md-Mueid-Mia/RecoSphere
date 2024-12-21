// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjWTcvO5aGzdF1YBWnDCtfR8uEjEFaIZY",
  authDomain: "assignment-11-41308.firebaseapp.com",
  projectId: "assignment-11-41308",
  storageBucket: "assignment-11-41308.firebasestorage.app",
  messagingSenderId: "989093958372",
  appId: "1:989093958372:web:92c4d6b5ebd274567012f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;