import { db } from "../utils/firebaseConfig";

import { useState, useRef, useEffect } from "react";
import WordDetails from "./words/WordDetails";
import { toast, ToastContainer } from "react-toastify";
import wordsDataMalayalam from "../../wordsMalayalam.json";
import wordsDataKannada from "../../wordsKannada.json";
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
  CollectionReference,
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
  const { learningLanguage } = useUserData();
  const [words, setWords] = useState<Word[]>([]);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [selectedTranslation, setSelectedTranslation] = useState<Word | null>(
    null
  );
  const [userID, setUserID] = useState<string | null>(null);
  const [prevUserID, setPrevUserID] = useState<string | null>(null);

  const [favoriteWords, setFavoriteWords] = useState<string[]>([]);
  // const [favoriteWordsCount, setFavoriteWordsCount] = useState<number>(0);
  const [highlightedWordId, setHighlightedWordId] = useState<string | null>(
    null
  );
  const { addGPToFirebase, removeGPFromFirebase } = useUserGrowthPoints(userID);

  const [learnedWords, setLearnedWords] = useState<string[]>([]);

  useEffect(() => {
    const userLearnedWords = JSON.parse(
      localStorage.getItem("learnedWordsID") ?? "[]"
    );
    setLearnedWords(userLearnedWords);
  }, []);

  useEffect(() => {
    if (selectedTranslation) {
      dialogRef.current?.showModal();
    }
  }, [selectedTranslation]);

  useEffect(() => {
    ReactGA.initialize("G-K25K213J7F");
  }, []);

  // useEffect(() => {
  //   setFavoriteWordsCount(favoriteWords.length);
  // }, [favoriteWords]);

  useEffect(() => {
    if (learningLanguage === "kannada") {
      setWords(
        wordsDataKannada.wordsKannada.filter((word) =>
          learnedWords.includes(word.id)
        )
      );
    } else if (learningLanguage === "malayalam") {
      setWords(
        wordsDataMalayalam.wordsMalayalam.filter((word) =>
          learnedWords.includes(word.id)
        )
      );
    } else {
      setWords([]);
    }
  }, [learningLanguage, learnedWords]);

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    const prevUserID = localStorage.getItem("prevUserID");

    setUserID(storedUserID);
    setPrevUserID(prevUserID);
  }, []);

  const handleInfoClick = (word: Word) => {
    setSelectedTranslation(word);
    setHighlightedWordId(word.id);
    // dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    setSelectedTranslation(null);
    setHighlightedWordId(null);
  };

  const updateLocalStorage = (WordId: string) => {
    const updatedFavorite = favoriteWords.includes(WordId)
      ? favoriteWords.filter((id) => id !== WordId)
      : [...favoriteWords, WordId];
    localStorage.setItem("favoriteWords", JSON.stringify(updatedFavorite));
  };

  const updateLocalState = (WordId: string) => {
    setFavoriteWords((prevFavorites) => {
      if (prevFavorites.includes(WordId)) {
        return prevFavorites.filter((id) => id !== WordId);
      } else {
        return [...prevFavorites, WordId];
      }
    });
  };

  const removeFromFavorites = async (
    favoriteWordIDsCollectionRef: CollectionReference,
    WordId: string,
    actualWord: string
  ) => {
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
  };

  const addToFavorites = async (
    favoriteWordIDsCollectionRef: CollectionReference,
    WordId: string,
    actualWord: string
  ) => {
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
  };

  const handleFavoriteClick = async (WordId: string, actualWord: string) => {
    try {
      const userDocRef = doc(db, "users", userID ?? "");
      const favoriteWordIDsCollectionRef = collection(
        userDocRef,
        "favoriteWordIDs"
      );

      updateLocalState(WordId);
      updateLocalStorage(WordId);

      if (favoriteWords.includes(WordId)) {
        await removeFromFavorites(
          favoriteWordIDsCollectionRef,
          WordId,
          actualWord
        );
      } else {
        addToFavorites(favoriteWordIDsCollectionRef, WordId, actualWord);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const readFavoritesFromLocalStorage = (
    setFavoriteWords: (words: string[]) => void
  ) => {
    const storedFavorites = localStorage.getItem("favoriteWords");
    if (storedFavorites) {
      setFavoriteWords(JSON.parse(storedFavorites));
    }
  };

  const clearFavoritesFromLocalStorage = (
    prevUserID: string | null,
    userID: string | null
  ) => {
    if (prevUserID !== userID) {
      localStorage.removeItem("favoriteWords");
    }
  };

  const fetchFavoriteWords = async (
    userID: string,
    setFavoriteWords: (words: string[]) => void
  ) => {
    try {
      const userDocRef = doc(db, "users", userID ?? "");
      const favoriteWordIDsCollectionRef = collection(
        userDocRef,
        "favoriteWordIDs"
      );

      const querySnapshot = await getDocs(favoriteWordIDsCollectionRef);
      const favoriteWords = querySnapshot.docs.map((doc) => doc.data().WordId);
      setFavoriteWords(favoriteWords);

      // Store fetched words in localStorage
      localStorage.setItem("favoriteWords", JSON.stringify(favoriteWords));
    } catch (e) {
      console.error("Error fetching favorite words: ", e);
    }
  };

  useEffect(() => {
    if (!userID) {
      return;
    }

    clearFavoritesFromLocalStorage(prevUserID, userID);
    readFavoritesFromLocalStorage(setFavoriteWords);

    const storedFavorites = localStorage.getItem("favoriteWords");

    if (!storedFavorites) {
      fetchFavoriteWords(userID, setFavoriteWords);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

  return (
    <>
      <div className="p-4">
        <WordListContainer
          words={words}
          favoriteWords={favoriteWords}
          handleFavoriteClick={handleFavoriteClick}
          handleInfoClick={handleInfoClick}
          highlightedWordId={highlightedWordId}
        ></WordListContainer>
      </div>

      {selectedTranslation && (
        <WordDetails
          ref={dialogRef}
          selectedWord={selectedTranslation}
          closeDialog={closeDialog}
        />
      )}
      <ToastContainer closeOnClick autoClose={2000} />
    </>
  );
};

export default WordList;
