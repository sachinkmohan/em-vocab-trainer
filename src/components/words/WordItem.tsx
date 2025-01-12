import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

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

interface WordItemProps {
  word: Word;
  highlightedWordId: string | null;
  favoriteWords: string[];
  handleFavoriteClick: (wordId: string, actualWord: string) => void;
  handleInfoClick: (word: Word) => void;
}

const WordItem: React.FC<WordItemProps> = ({
  word,
  highlightedWordId,
  // favoriteWords,
  // handleFavoriteClick,
  handleInfoClick,
}) => {
  return (
    <li
      key={word.id}
      className={`flex justify-between items-center border border-blue-300 rounded-lg ${
        highlightedWordId === word.id
          ? "bg-yellow-100"
          : "bg-gradient-to-r from-blue-200 to-blue-100"
      }`}
    >
      <span className=" p-2 pl-4">{word.word.inTranslit}</span>
      <div className="flex justify-around gap-6 pr-4">
        {/* <FontAwesomeIcon
          icon={faHeart}
          className={
            favoriteWords.includes(word.id) ? "text-red-500" : "text-gray-500"
          }
          onClick={() => handleFavoriteClick(word.id, word.word.inTranslit)}
        /> */}
        <FontAwesomeIcon
          icon={faInfoCircle}
          className="text-blue-500 mr-2"
          onClick={() => handleInfoClick(word)}
        />
      </div>
    </li>
  );
};

export default WordItem;
