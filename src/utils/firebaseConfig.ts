// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { NavigateFunction } from "react-router-dom";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

const signUpWithEmail = async (
  email: string,
  password: string,
  nickname: string,
  name: string,
  learningLanguage: string,
  languageLevel: string,
  navigate: any
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (learningLanguage === "malayalam") {
      await setDoc(doc(db, "usersMalayalam", user.uid), {
        email,
        nickname,
        name,
        learningLanguage,
        languageLevel,
      });
      navigate("/home");
    } else {
      await setDoc(doc(db, "usersKannada", user.uid), {
        email,
        nickname,
        name,
        learningLanguage,
        languageLevel,
      });
      navigate("/home");
    }
  } catch (error) {
    console.error("Error during sign up:", error);
  }
};

const signInWithEmail = (
  email: string,
  password: string,
  navigate: NavigateFunction
) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      navigate("/home");
      localStorage.setItem("userEmail", user.email ?? "");

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error Code & Message", errorCode, errorMessage);
    });
};

export { auth, db, signUpWithEmail, signInWithEmail };
