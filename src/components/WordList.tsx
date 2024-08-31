// import { useWords } from "../components/helpers/WordsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import WordDetails from "./words/WordDetails";

interface Word {
  word: string;
  meaning: string;
  figureOfSpeech: string;
  exampleSentence: string;
}

const WordList = () => {
  // const words: Word[] = useWords() || [];
  const [words, setWords] = useState<Word[]>([]);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [selectedTranslation, setSelectedTranslation] = useState("");
  const [isFavorited, setIsFavorited] = useState(false);

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

  const handleIconClick = (translation: string) => {
    setSelectedTranslation(translation);
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    setSelectedTranslation("");
  };

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <>
      <div className="p-4">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {words.map((word, index) => {
            return (
              <li
                key={index}
                className="flex justify-between items-center border border-blue-300"
              >
                {" "}
                {word.word}{" "}
                <div className="flex justify-around gap-6 pr-4">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={isFavorited ? "text-red-500" : "text-gray-500"}
                    onClick={() => handleFavoriteClick()}
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
    </>
  );
};

export default WordList;
