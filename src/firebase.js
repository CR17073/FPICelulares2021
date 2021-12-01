import firebase from "firebase/compat/app"
import "firebase/compat/storage";
import "firebase/compat/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyAuraCOk2GAqjB4f82RQAsChtIaYkEY5Sg",
  authDomain: "project-a6161.firebaseapp.com",
  databaseURL: "https://project-a6161-default-rtdb.firebaseio.com",
  projectId: "project-a6161",
  storageBucket: "project-a6161.appspot.com",
  messagingSenderId: "884439716768",
  appId: "1:884439716768:web:eb7200725ec47e1dbfcac5"
};


// Initialize Firebase

let firebaseApp = firebase.initializeApp(firebaseConfig)
// let firebaseApp = firebase.initializeApp(firebaseConfig)
let db = firebase.firestore();
let st = firebase.storage();

export { firebase, db, st ,firebaseApp}