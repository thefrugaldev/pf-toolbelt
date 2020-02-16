import * as firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "./config";

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// Helper method for initial load of site
// Firebase takes a second to determine currentUser object
// So we can use local storage for initial UI purposes
const getAuthenticationStatus = (): boolean => {
  return Boolean(localStorage.getItem("isAuthenticated"));
};

export { auth, getAuthenticationStatus };
