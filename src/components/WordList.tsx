import { db } from "../utils/firebaseConfig";

import { useState, useRef, useEffect } from "react";
import WordDetails from "./words/WordDetails";
import { toast, ToastContainer } from "react-toastify";
import wordsDataMalayalam from "../../wordsMalayalam.json";
// import wordsDataKannada from "../../wordsKannada.json";
import useUserGrowthPoints from "./hooks/useUserGrowthPoints";
import ReactGA from "react-ga4";

import {
  doc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

import { useUserData } from "./helpers/UserDataContext";
import WordListContainer from "./words/WordListContainer";

interface Word {
  id: string;
  word: {
    inTranslit: string;
    inNativeScript: string;
  };
  meaning: string;
  figureOfSpeech: string;
  examples: {
    inTranslit: string;
    translation: string;
    inNativeScript: string;
  }[];
  wordLevel: string;
  pronunciation: string;
}

const WordList = () => {
  const { nickname, learningLanguage } = useUserData();
  const [words, setWords] = useState<Word[]>([]);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [selectedTranslation, setSelectedTranslation] = useState("");
  const [userID, setUserID] = useState<string | null>(null);
  const [prevUserID, setPrevUserID] = useState<string | null>(null);

  const [favoriteWords, setFavoriteWords] = useState<string[]>([]);
  const [favoriteWordsCount, setFavoriteWordsCount] = useState<number>(0);
  const [highlightedWordId, setHighlightedWordId] = useState<string | null>(
    null
  );
  const { userGrowthPoints, addGPToFirebase, removeGPFromFirebase } =
    useUserGrowthPoints(userID);

  useEffect(() => {
    ReactGA.initialize("G-K25K213J7F");
  }, []);

  useEffect(() => {
    setFavoriteWordsCount(favoriteWords.length);
  }, [favoriteWords]);

  useEffect(() => {
    // if (learningLanguage === "kannada") {
    //   setWords(wordsDataKannada.wordsKannada);
    // } else
    if (learningLanguage === "malayalam") {
      setWords(wordsDataMalayalam.wordsMalayalam);
    } else {
      setWords([]);
    }
  }, [learningLanguage]);

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    const prevUserID = localStorage.getItem("prevUserID");

    setUserID(storedUserID);
    setPrevUserID(prevUserID);
  }, []);

  const handleInfoClick = (word: Word) => {
    setSelectedTranslation(word.meaning);
    setHighlightedWordId(word.id);
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    setSelectedTranslation("");
    setHighlightedWordId(null);
  };

  const handleFavoriteClick = async (WordId: string, actualWord: string) => {
    try {
      const userDocRef = doc(db, "users", userID ?? "");
      const favoriteWordIDsCollectionRef = collection(
        userDocRef,
        "favoriteWordIDs"
      );

      // Optimistically update the local state
      setFavoriteWords((prevFavorites) => {
        if (prevFavorites.includes(WordId)) {
          return prevFavorites.filter((id) => id !== WordId);
        } else {
          return [...prevFavorites, WordId];
        }
      });

      // Update localStorage
      const updatedFavorite = favoriteWords.includes(WordId)
        ? favoriteWords.filter((id) => id !== WordId)
        : [...favoriteWords, WordId];
      localStorage.setItem("favoriteWords", JSON.stringify(updatedFavorite));

      if (favoriteWords.includes(WordId)) {
        // Remove from firestore
        const q = query(
          favoriteWordIDsCollectionRef,
          where("WordId", "==", WordId)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
          await removeGPFromFirebase(1);
          toast.error("Word removed from favorites");
          ReactGA.event({
            category: "All Words",
            action: "Removed from Favorites",
            label: actualWord,
          });
        });
      } else {
        await addDoc(favoriteWordIDsCollectionRef, {
          WordId,
          favoritedAt: new Date().toISOString(),
        });
        await addGPToFirebase(1);
        toast.success("Word added to favorites");
        ReactGA.event({
          category: "All Words",
          action: "Added to Favorites",
          label: actualWord,
        });
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    const fetchFavoriteWords = async () => {
      if (!userID) {
        return;
      }
      try {
        const userDocRef = doc(db, "users", userID ?? "");
        const favoriteWordIDsCollectionRef = collection(
          userDocRef,
          "favoriteWordIDs"
        );

        const querySnapshot = await getDocs(favoriteWordIDsCollectionRef);
        const favoriteWords = querySnapshot.docs.map(
          (doc) => doc.data().WordId
        );
        setFavoriteWords(favoriteWords);

        // Store fetched words in localStorage
        localStorage.setItem("favoriteWords", JSON.stringify(favoriteWords));
      } catch (e) {
        console.error("Error fetching favorite words: ", e);
      }
    };

    // clear favoriteWords in localStorage when userID changes
    if (prevUserID !== userID) {
      localStorage.removeItem("favoriteWords");
    }

    // Read from localStorage on component mount
    const storedFavorites = localStorage.getItem("favoriteWords");
    if (storedFavorites) {
      setFavoriteWords(JSON.parse(storedFavorites));
    } else {
      fetchFavoriteWords();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

  return (
    <>
      <div>
        <h1 className="text-xl font-semibold text-gray-600 ml-2 mb-4">
          {" "}
          Welcome {nickname}!
        </h1>
        <span className="flex items-center space-x-2 rounded-lg mx-2 px-4 py-1 bg-gray-800 text-white shadow-lg">
          <span>Total GP - </span>
          <span className="rounded-full bg-yellow-300 text-gray-800 px-2">
            {userGrowthPoints}
          </span>
        </span>
        <h1 className="text-xl font-bold text-center text-white mt-4 bg-green-600 rounded-lg shadow-lg mx-2">
          🫵 have learned{" "}
          <span className="text-blue-600 text-2xl rounded-full bg-white px-2 py-0">
            {favoriteWordsCount}
          </span>{" "}
          words so far 🥳
        </h1>
      </div>
      <div className="p-4">
        <WordListContainer
          words={words}
          favoriteWords={favoriteWords}
          handleFavoriteClick={handleFavoriteClick}
          handleInfoClick={handleInfoClick}
          highlightedWordId={highlightedWordId}
        ></WordListContainer>
      </div>

      <WordDetails
        ref={dialogRef}
        selectedTranslation={selectedTranslation}
        closeDialog={closeDialog}
      />
      <ToastContainer closeOnClick autoClose={2000} />
    </>
  );
};

export default WordList;
