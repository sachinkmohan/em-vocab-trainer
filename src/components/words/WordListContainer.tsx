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
      {words
        //@ts-expect-error - TS doesn't know about toSorted even after adding to tsconfig.json
        .toSorted((a: Word, b: Word) => {
          const aFavorited = favoriteWords.includes(a.id);
          const bFavorited = favoriteWords.includes(b.id);
          if (aFavorited && !bFavorited) return 1;
          if (!aFavorited && bFavorited) return -1;
          return 0;
        })
        .map((word: Word) => {
          return (
            <WordItem
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
