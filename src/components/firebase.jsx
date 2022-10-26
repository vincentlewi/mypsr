// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import {
  getAuth, createUserWithEmailAndPassword,
  signOut, signInWithEmailAndPassword,
  onAuthStateChanged, sendEmailVerification, updateProfile
} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBymbzTkYRjuKaV7pym484v7rnOpHjloFg",
  authDomain: "mypsr-dc320.firebaseapp.com",
  projectId: "mypsr-dc320",
  storageBucket: "mypsr-dc320.appspot.com",
  messagingSenderId: "541265964220",
  appId: "1:541265964220:web:c49333fe38245386f3b4b9",
  measurementId: "G-6CPLWGZGDL"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth()