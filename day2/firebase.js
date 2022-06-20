// enable firebase
import firebase from "firebase";

// ... config settings

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};
