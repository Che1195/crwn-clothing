import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAR5WzIhzmoXUaxdq-B82w8YQMXkZGJFaw",
  authDomain: "crwn-db-b874f.firebaseapp.com",
  databaseURL: "https://crwn-db-b874f.firebaseio.com",
  projectId: "crwn-db-b874f",
  storageBucket: "crwn-db-b874f.appspot.com",
  messagingSenderId: "991998593063",
  appId: "1:991998593063:web:42ba9807913ff75bc36602",
  measurementId: "G-0MX9PK1BDE",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
