import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2FwTwTWOLGkzUUjSShFCEamKJgDEmNl4",
  authDomain: "fir-donnee.firebaseapp.com",
  databaseURL:
    "https://fir-donnee-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-donnee",
  storageBucket: "fir-donnee.firebasestorage.app",
  messagingSenderId: "330582320496",
  appId: "1:330582320496:web:623f6da1566dd34c169bb5",
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const auth = getAuth(app);

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  const userCredential = await signInWithPopup(auth, provider);

  return userCredential.user;
};