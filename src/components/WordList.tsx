import { useState, useEffect } from "react";
import { db } from "../utils/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  limit,
  orderBy,
  startAfter,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const WordList = () => {
  const [words, setWords] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWords = async (lastVisible) => {
    setLoading(true);
    try {
      let q;
      if (lastVisible) {
        q = query(
          collection(db, "mainWords"),
          orderBy("id"),
          startAfter(lastVisible),
          limit(10)
        );
      } else {
        q = query(
          collection(db, "mainWords"),
          orderBy("figureOfSpeech"),
          limit(10)
        );
      }
      const querySnapshot = await getDocs(q);
      console.log("QUERY SNAPSHOT", querySnapshot.docs);
    } catch (e) {
      console.log("ERROR fetching documents", e);
    }
  };

  return (
    <>
      <div className="p-4">
        {/* <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {{words : [ id: "blah", ]}.map((word) => {
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
          })} */}
        {/* </ul> */}
        <p>Dummy Words</p>
        <button
          onClick={() => fetchWords(lastVisible)}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {" "}
          lol
        </button>
      </div>
    </>
  );
};

export default WordList;
