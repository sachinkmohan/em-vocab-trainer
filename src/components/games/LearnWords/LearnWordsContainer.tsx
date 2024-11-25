import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../../utils/firebaseConfig";
import { doc, collection, getDocs } from "firebase/firestore";

const LearnWords = () => {
  const [userID, setUserID] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/start-words-game");
  };

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    setUserID(storedUserID);

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
    };

    syncLocalStorageWithFirebase();
  }, [userID]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-800">
      <head>
        <title>Word Quest</title>
      </head>
      <div className="text-center">
        <h1 className="text-4xl">Word Quest</h1>
        <p className="text-lg">
          Boost your vocab daily with Word Quest. Learn, challenge, and grow
          your word power!
        </p>
      </div>
      <div className="flex flex-grow justify-center items-center">
        <button
          className="bg-white py-2 px-4 rounded-full"
          onClick={handleButtonClick}
        >
          Let's Learn!
        </button>
      </div>
    </div>
  );
};

export default LearnWords;
