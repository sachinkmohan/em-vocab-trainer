import { useState, useEffect } from "react";
import { db } from "../utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const WordList = () => {
  const wordsDummy = {
    words: [
      {
        id: 1,
        word: "parippu",
        meaning: "dal",
      },
      {
        id: 2,
        word: "thakkali",
        meaning: "tomato",
      },
      {
        id: 3,
        word: "pachadi",
        meaning: "pickle",
      },
    ],
  };
  // const [words, setWords] = useState([]);

  // useEffect(() => {
  //   const fetchWords = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(db, "mainWords"));
  //       const wordsList = querySnapshot.docs.map((doc) => doc.data());
  //       setWords(wordsList);
  //       console.log(wordsList);
  //     } catch (e) {
  //       console.error("Error fetching documents: ", e);
  //     }
  //   };
  //   fetchWords();
  // }, []);

  return (
    <>
      <div className="p-4">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wordsDummy.words.map((word) => {
            return (
              <li
                key={word.id}
                className="flex justify-between items-center border border-blue-300"
              >
                {" "}
                {word.meaning}{" "}
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className="text-blue-500"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default WordList;
