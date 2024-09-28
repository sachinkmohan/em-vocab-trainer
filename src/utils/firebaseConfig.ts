// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { NavigateFunction } from "react-router-dom";

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
  roles: string[],
  navigate: NavigateFunction
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email,
      nickname,
      name,
      learningLanguage,
      languageLevel,
      roles,
      growthPoints: 0,
    });
    navigate("/library");
    localStorage.setItem("userID", user.uid ?? "");
  } catch (error) {
    console.error("Error during sign up:", error);
  }
};

const signInWithEmail = (
  email: string,
  password: string,
  navigate: NavigateFunction
): Promise<string | void> => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      navigate("/library");
      localStorage.setItem("userID", user.uid ?? "");

      // ...
    })
    .catch((error) => {
      const errorMessage = error.message;
      return errorMessage;
    });
};

export { auth, db, signUpWithEmail, signInWithEmail };
