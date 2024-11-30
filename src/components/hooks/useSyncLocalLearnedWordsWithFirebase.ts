import { db } from "../../utils/firebaseConfig";
import { doc, collection, getDocs } from "firebase/firestore";

import { useState, useEffect } from "react";

const useSyncLocalLearnedWordsWithFirebase = (onSyncComplete: () => void) => {
  const [userID, setUserID] = useState<string | null>(null);

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");

    setUserID(storedUserID);
  }, []);

  useEffect(() => {
    const syncLocalStorageWithFirebase = async () => {
      if (!userID) return;

      const userDocRef = doc(db, "users", userID);
      const learnedA1WordsCollectionRef = collection(
        userDocRef,
        "learnedWords",
        "A1",
        "words"
      );

      const localStorageWords = JSON.parse(
        localStorage.getItem("learnedWordsID") ?? "[]"
      );
      const firebaseWordsSnapshot = await getDocs(learnedA1WordsCollectionRef);
      const firebaseWords = firebaseWordsSnapshot.docs.map(
        (doc) => doc.data().WordId
      );

      if (localStorageWords.length !== firebaseWords.length) {
        localStorage.setItem("learnedWordsID", JSON.stringify(firebaseWords));
      }

      onSyncComplete();
    };
    syncLocalStorageWithFirebase();
  }, [userID, onSyncComplete]);
};

export default useSyncLocalLearnedWordsWithFirebase;
