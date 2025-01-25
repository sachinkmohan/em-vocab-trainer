import { useState, useRef, useEffect } from "react";
import WordDetails from "../words/WordDetails";
import { ToastContainer } from "react-toastify";
import wordsDataMalayalam from "../../../wordsMalayalam.json";
import wordsDataKannada from "../../../wordsKannada.json";

import { useUserData } from "../helpers/UserDataContext";
import WordListContainer from "../words/WordListContainer";

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

const MasterWordList = () => {
  const { learningLanguage } = useUserData();
  const [words, setWords] = useState<Word[]>([]);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [selectedTranslation, setSelectedTranslation] = useState<Word | null>(
    null
  );

  const [highlightedWordId, setHighlightedWordId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (selectedTranslation) {
      dialogRef.current?.showModal();
    }
  }, [selectedTranslation]);

  useEffect(() => {
    if (learningLanguage === "kannada") {
      setWords(wordsDataKannada.wordsKannada);
    } else if (learningLanguage === "malayalam") {
      setWords(wordsDataMalayalam.wordsMalayalam);
    } else {
      setWords([]);
    }
  }, [learningLanguage]);

  const handleInfoClick = (word: Word) => {
    setSelectedTranslation(word);
    setHighlightedWordId(word.id);
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    setSelectedTranslation(null);
    setHighlightedWordId(null);
  };

  return (
    <>
      <div className="p-4">
        <WordListContainer
          words={words}
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

export default MasterWordList;
