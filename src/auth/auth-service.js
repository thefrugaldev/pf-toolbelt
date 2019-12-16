import * as firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "./config";

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth };
