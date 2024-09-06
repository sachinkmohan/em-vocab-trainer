import { db } from "../utils/firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import WordDetails from "./words/WordDetails";
import { toast, ToastContainer } from "react-toastify";

import {
  doc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

interface Word {
  id: string;
  word: string;
  meaning: string;
  figureOfSpeech: string;
  exampleSentence: string;
}

const WordList = () => {
  const [words, setWords] = useState<Word[]>([]);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [selectedTranslation, setSelectedTranslation] = useState("");
  const [email, setEmail] = useState<string | null>(null);

  const [favoriteWords, setFavoriteWords] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5174/words");
        const data = await response.json();
        setWords(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    setEmail(storedEmail);
  }, []);

  const handleIconClick = (meaning: string) => {
    setSelectedTranslation(meaning);
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    setSelectedTranslation("");
  };

  const handleFavoriteClick = async (WordId: string) => {
    try {
      const userDocRef = doc(db, "users", email ?? "");
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
        });
      } else {
        await addDoc(favoriteWordIDsCollectionRef, { WordId });
        toast.success("Word added to favorites");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const fetchFavoriteWords = async () => {
    if (!email) {
      return;
    }
    try {
      const userDocRef = doc(db, "users", email ?? "");
      const favoriteWordIDsCollectionRef = collection(
        userDocRef,
        "favoriteWordIDs"
      );

      const querySnapshot = await getDocs(favoriteWordIDsCollectionRef);
      const favoriteWords = querySnapshot.docs.map((doc) => doc.data().WordId);
      setFavoriteWords(favoriteWords);

      // Store fetched words in localStorage
      localStorage.setItem("favoriteWords", JSON.stringify(favoriteWords));
      console.log("Favorite words fetched: ", favoriteWords);
    } catch (e) {
      console.error("Error fetching favorite words: ", e);
    }
  };

  useEffect(() => {
    // Read from localStorage on component mount
    const storedFavorites = localStorage.getItem("favoriteWords");
    if (storedFavorites) {
      setFavoriteWords(JSON.parse(storedFavorites));
    } else {
      fetchFavoriteWords();
    }
  }, [email]);

  return (
    <>
      <div className="p-4">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {words.map((word) => {
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
                    onClick={() => handleFavoriteClick(word.id)}
                  />
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="text-blue-500"
                    onClick={() => handleIconClick(word.meaning)}
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
      <ToastContainer />
    </>
  );
};

export default WordList;
