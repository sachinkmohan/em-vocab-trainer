import { useState, useEffect } from "react";
import { db } from "../utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const WordList = () => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "mainWords"));
        const wordsList = querySnapshot.docs.map((doc) => doc.data());
        setWords(wordsList);
        console.log(wordsList);
      } catch (e) {
        console.error("Error fetching documents: ", e);
      }
    };
    fetchWords();
  }, []);

  return <div>WordList</div>;
};

export default WordList;
