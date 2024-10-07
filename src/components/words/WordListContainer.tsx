import WordItem from "./WordItem";

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
  favoriteWords: string[];
  handleFavoriteClick: (wordId: string, actualWord: string) => void;
  handleInfoClick: (word: Word) => void;
}

const WordListContainer: React.FC<WordListContainerProps> = ({
  words,
  highlightedWordId,
  favoriteWords,
  handleFavoriteClick,
  handleInfoClick,
}) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {words.map((word: Word) => {
        return (
          <WordItem
            key={word.id}
            word={word}
            highlightedWordId={highlightedWordId}
            favoriteWords={favoriteWords}
            handleFavoriteClick={handleFavoriteClick}
            handleInfoClick={handleInfoClick}
          />
        );
      })}
    </ul>
  );
};

export default WordListContainer;
