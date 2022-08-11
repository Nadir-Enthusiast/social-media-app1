import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage"
import { getDatabase } from "firebase/database";

const app = initializeApp({
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: "social-media-app-by-nadir.firebaseapp.com",
  projectId: "social-media-app-by-nadir",
  storageBucket: "social-media-app-by-nadir.appspot.com",
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
});

const db = getFirestore(app);
const database = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {db, auth, storage, database};