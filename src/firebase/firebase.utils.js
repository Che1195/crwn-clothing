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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log(`error creating user`, error.message);
    }
  }

  return userRef;
};

// initializes firebase with the configurations that we got from our account
firebase.initializeApp(config);

// export out to be used anywhere authentication is needed
export const auth = firebase.auth();
// will be explained later
export const firestore = firebase.firestore();

// gives us access to the google auth provider class from the authentication library
const provider = new firebase.auth.GoogleAuthProvider();
// trigger the google sign in pop up when ever we use this google auth provider
// for authentication and sign in.
provider.setCustomParameters({ prompt: "select_account" });
// sign in with popup needs to know what the provider is, it could be facebook,
// github etc...
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;