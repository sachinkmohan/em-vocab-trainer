import { useWords } from "../components/helpers/WordsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import WordDetails from "./words/WordDetails";

interface Word {
  word: string;
  translation: string;
}

const WordList = () => {
  const words: Word[] = useWords() || [];
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [selectedTranslation, setSelectedTranslation] = useState("");

  const handleIconClick = (translation: string) => {
    setSelectedTranslation(translation);
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    setSelectedTranslation("");
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
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className="text-blue-500"
                  onClick={() => handleIconClick(word.translation)}
                />
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
