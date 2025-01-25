import { useState } from "react";
import WordItem from "./WordItem";
import { useEditMode } from "../helpers/EditModeContext";
import EditWordsDialog from "./EditWordsDialog";

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

interface WordListContainerProps {
  words: Word[];
  highlightedWordId: string | null;
  favoriteWords?: string[];
  handleFavoriteClick?: (wordId: string, actualWord: string) => void;
  handleInfoClick: (word: Word) => void;
}

const WordListContainer: React.FC<WordListContainerProps> = ({
  words,
  highlightedWordId,
  favoriteWords,
  handleFavoriteClick,
  handleInfoClick,
}) => {
  const { isEditMode } = useEditMode();
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);

  const handleEditClick = (word: Word) => {
    setSelectedWord(word);
  };

  const handleDialogClose = () => {
    setSelectedWord(null);
  };

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {words.map((word: Word) => {
          return (
            <div key={word.id}>
              <WordItem
                word={word}
                highlightedWordId={highlightedWordId}
                favoriteWords={favoriteWords || []} // Provide a default empty array if favoriteWords is undefined
                handleFavoriteClick={handleFavoriteClick || (() => {})} // need to handle favoriteWords differently
                handleInfoClick={handleInfoClick}
              />
              {isEditMode && (
                <button onClick={() => handleEditClick(word)}>Edit</button>
              )}
            </div>
          );
        })}
      </ul>
      {selectedWord && (
        <EditWordsDialog word={selectedWord} onClose={handleDialogClose} />
      )}
    </>
  );
};

export default WordListContainer;
