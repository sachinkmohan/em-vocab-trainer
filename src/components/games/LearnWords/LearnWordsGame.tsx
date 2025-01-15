import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import wordsDataMalayalam from "../../../../wordsMalayalam.json";
import { Word } from "../../../interfaces/Word";
import { db } from "../../../utils/firebaseConfig";
import { doc, collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";

const LearnWordsGame = () => {
  const [userID, setUserID] = useState<string | null>(null);
  const navigate = useNavigate();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [words, setWords] = useState<Word[]>([]);
  const [learnedWords, setLearnedWords] = useState<string[]>([]);

  useEffect(() => {
    const fetchLearnedWords = JSON.parse(
      localStorage.getItem("learnedWordsID") ?? "[]"
    );
    setLearnedWords(fetchLearnedWords);
  }, []);

  useEffect(() => {
    const filteredWords = wordsDataMalayalam.wordsMalayalam
      .filter((word) => !learnedWords.includes(word.id))
      .slice(0, 3);
    setWords(filteredWords);
  }, [learnedWords]);

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    setUserID(storedUserID);
  }, []);

  const handleYesClick = (): void => {
    toast.success("Saved for eternal brilliance!", {
      position: "top-right",
    });
    if (!userID) {
      console.error("User ID not available");
      return;
    }

    if (currentWordIndex === words.length - 1) {
      navigate("/learn-words-end-screen");
      addLearnedWordsToDB(selectedWord.id);
    } else {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      addLearnedWordsToDB(selectedWord.id);
    }
  };

  const handleNoClick = (): void => {
    toast.success("Taking a pass? You’re still winning!", {
      position: "top-right",
    });
    if (currentWordIndex === words.length - 1) {
      navigate("/learn-words-end-screen");
    } else {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }
  };

  const addLearnedWordsToDB = async (WordId: string): Promise<void> => {
    try {
      const userDocRef = doc(db, "users", userID ?? "");
      const learnedA1WordsCollectionRef = collection(
        userDocRef,
        "learnedWords",
        "A1",
        "words"
      );

      await addDoc(learnedA1WordsCollectionRef, {
        WordId,
        learnedOn: new Date().toISOString(),
      });
      console.log("Added to fireDB");
      addToLocalStorage(WordId);
    } catch (e) {
      console.error("Error adding learned words", e);
    }
  };

  const addToLocalStorage = (WordId: string): void => {
    const learnedWords = JSON.parse(
      localStorage.getItem("learnedWordsID") ?? "[]"
    );
    learnedWords.push(WordId);
    localStorage.setItem("learnedWordsID", JSON.stringify(learnedWords));
  };

  const selectedWord = words[currentWordIndex];

  if (!selectedWord) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" min-h-screen flex flex-col items-center justify-center">
      <div className="text-center w-full max-w-md">
        <h1 className="text-4xl text-white m-4 p-4 border-2 border-blue-300 bg-blue-500 rounded-xl">
          {selectedWord.word.inTranslit}
        </h1>

        <div className="text-white py-2 m-4 p-4 border-2 border-blue-300 bg-blue-500 rounded-xl">
          <div className="flex flex-col items-start pl-3">
            <div className="flex flex-row text-2xl pt-5">
              <h2 className="pr-2 font-bold">Word:</h2>
              <h2>{selectedWord.word.inTranslit}</h2>
              <h2>
                (
                {selectedWord.word.inNativeScript ? (
                  selectedWord.word.inNativeScript
                ) : (
                  <span className="text-sm">No data available</span>
                )}
                )
              </h2>
            </div>
            <h5 className="pl-16 text-sm">
              {selectedWord.figureOfSpeech
                ? selectedWord.figureOfSpeech
                : "Unknown"}
            </h5>

            <div className="flex text-xl">
              <h2 className="pr-2 font-semibold ">Translation:</h2>
              <h2>{selectedWord.meaning}</h2>
            </div>

            <div className="flex text-lg mt-4">
              <h2 className="pr-2 font-semibold ">Eg(T).:</h2>
              <h2>
                {selectedWord.examples[0].inTranslit
                  ? selectedWord.examples[0].inTranslit
                  : "No data available"}
              </h2>
            </div>
            <div className="flex text-lg">
              <h2 className="pr-2 font-semibold">Eg(N).:</h2>
              <h2>
                {selectedWord.examples[0].inNativeScript
                  ? selectedWord.examples[0].inNativeScript
                  : "No data available"}
              </h2>
            </div>
            <div className="flex text-lg">
              <h2 className="pr-2 font-semibold">Transl.:</h2>
              <h2>
                {selectedWord.examples[0].translation
                  ? selectedWord.examples[0].translation
                  : "No data available"}
              </h2>
            </div>
          </div>
        </div>

        <div className="flex flex-col border-2 m-4 p-4 border-blue-300 bg-blue-500 rounded-xl">
          <div className="text-white py-2 ">Did you learn this word?</div>
          <div className="flex justify-center space-x-5">
            <button
              className="bg-red-400 m-2 p-2 px-12 rounded-xl"
              onClick={handleNoClick}
            >
              No
            </button>

            <button
              className="bg-green-500 m-2 p-2 px-12 rounded-xl"
              onClick={handleYesClick}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LearnWordsGame;
