import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSyZklwARw-8rnfqrofR4MKCve-45jTSg",
  authDomain: "clone-e7a62.firebaseapp.com",
  projectId: "clone-e7a62",
  storageBucket: "clone-e7a62.firebasestorage.app",
  messagingSenderId: "1061632524994",
  appId: "1:1061632524994:web:42eca3f0f367b2989a715b",
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
