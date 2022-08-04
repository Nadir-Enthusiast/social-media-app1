import firebase from 'firebase';
import 'firebase/firestore'

const firebaseApp = firebase.initializeApp({
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: "social-media-app-by-nadir.firebaseapp.com",
  projectId: "social-media-app-by-nadir",
  storageBucket: "social-media-app-by-nadir.appspot.com",
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
});

const db = firebase.firestore();
const storage = firebase.storage();

export {db, storage};