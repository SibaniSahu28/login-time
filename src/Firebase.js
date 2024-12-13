// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWGrBW57mpz71rWEAbeEi_Ec9q9BhJvIk",
  authDomain: "logintime-a77bf.firebaseapp.com",
  projectId: "logintime-a77bf",
  storageBucket: "logintime-a77bf.firebasestorage.app",
  messagingSenderId: "359538219122",
  appId: "1:359538219122:web:70edb6a0d34efd8bcb8aeb",
  measurementId: "G-8EX70324R0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database=getDatabase(app);
export{database};