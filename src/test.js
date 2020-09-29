import firebase from "firebase/app";
import "firebase/firestore";

const firestore = firebase.firestore();

firestore
  .collection("users")
  .doc("S51hMyrExTYudoACC2EH")
  .collection("cartItems")
  .doc("2UHzqFnrDwjSIEzg2pC6");

firestore.doc("/users/S51hMyrExTYudoACC2EH/cartItems/2UHzqFnrDwjSIEzg2pC6");

firestore.collection("/users/S51hMyrExTYudoACC2EH/cartItems/");
