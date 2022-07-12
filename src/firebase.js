import firebase from 'firebase';
import 'firebase/firestore'

const firebaseApp = firebase.initializeApp({
  //config
});

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};