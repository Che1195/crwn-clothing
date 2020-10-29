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