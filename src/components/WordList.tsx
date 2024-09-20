import { db } from "../utils/firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import WordDetails from "./words/WordDetails";
import { toast, ToastContainer } from "react-toastify";
import wordsDataMalayalam from "../../wordsMalayalam.json";
import wordsDataKannada from "../../wordsKannada.json";
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

interface Word {
  id: string;
  word: string;
  translation: string;
  figureOfSpeech: string;
  exampleSentence?: string;
}

const WordList = () => {
  const { name, learningLanguage } = useUserData();
  const [words, setWords] = useState<Word[]>([]);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [selectedTranslation, setSelectedTranslation] = useState("");
  const [userID, setUserID] = useState<string | null>(null);
  const [prevUserID, setPrevUserID] = useState<string | null>(null);

  const [favoriteWords, setFavoriteWords] = useState<string[]>([]);
  const [favoriteWordsCount, setFavoriteWordsCount] = useState<number>(0);

  useEffect(() => {
    ReactGA.initialize("G-K25K213J7F");
  }, []);

  useEffect(() => {
    setFavoriteWordsCount(favoriteWords.length);
  }, [favoriteWords]);

  useEffect(() => {
    if (learningLanguage === "kannada") {
      setWords(wordsDataKannada.wordsKannada);
    } else if (learningLanguage === "malayalam") {
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

  const handleIconClick = (meaning: string) => {
    setSelectedTranslation(meaning);
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    setSelectedTranslation("");
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
        console.log("Favorite words fetched: ", favoriteWords);
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
        <h1> Name: {name}</h1>
        <h1> Learning Language: {learningLanguage}</h1>
        <h1 className="text-xl font-bold text-center text-white mt-8 bg-green-600 rounded-lg shadow-lg mx-2">
          🫵 have learned{" "}
          <span className="text-blue-600 text-2xl rounded-full bg-white px-2 py-0">
            {favoriteWordsCount}
          </span>{" "}
          words so far 🥳
        </h1>
      </div>
      <div className="p-4">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {words
            //@ts-expect-error - TS doesn't know about toSorted even after adding to tsconfig.json
            .toSorted((a: Word, b: Word) => {
              const aFavorited = favoriteWords.includes(a.id);
              const bFavorited = favoriteWords.includes(b.id);
              if (aFavorited && !bFavorited) return 1;
              if (!aFavorited && bFavorited) return -1;
              return 0;
            })
            .map((word: Word) => {
              return (
                <li
                  key={word.id}
                  className="flex justify-between items-center border border-blue-300"
                >
                  {" "}
                  {word.word}{" "}
                  <div className="flex justify-around gap-6 pr-4">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className={
                        favoriteWords.includes(word.id)
                          ? "text-red-500"
                          : "text-gray-500"
                      }
                      onClick={() => handleFavoriteClick(word.id, word.word)}
                    />
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="text-blue-500"
                      onClick={() => handleIconClick(word.translation)}
                    />
                  </div>
                </li>
              );
            })}
        </ul>
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
