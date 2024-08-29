import { createContext, useState, useEffect, useContext } from "react";
import { db } from "../../utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const WordsContext = createContext([]);

export const WordsProvider = ({ children }) => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "mainWords"));
        const wordsList = querySnapshot.docs.map((doc) => doc.data());
        setWords(wordsList);
      } catch (e) {
        console.log("ERROR fetching documents", e);
      }
    };
    fetchWords();
  }, []);

  return (
    <WordsContext.Provider value={words}>{children}</WordsContext.Provider>
  );
};

export const useWords = () => useContext(WordsContext);
