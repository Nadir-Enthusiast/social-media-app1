import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDZ5VAiVzIPCTP2O9DIeGNpdsbeD4D3L4U",
  authDomain: "usermade-instagram.firebaseapp.com",
  projectId: "usermade-instagram",
  storageBucket: "usermade-instagram.appspot.com",
  messagingSenderId: "525601616878",
  appId: "1:525601616878:web:621cd0a8ba48c13a1514ff",
  measurementId: "G-08BE9GBNFL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp)
const auth = firebase.auth();
const storage = firebase.storage

export {db, auth, storage};
