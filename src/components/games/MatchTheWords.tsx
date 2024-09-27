import { useState } from "react";
import wordsDataKannada from "../../../wordsKannada.json";

interface Word {
  id: string;
  word: string;
  translation: string;
  figureOfSpeech: string;
  exampleSentence?: string;
}

const MatchTheWords = () => {
  const words: Word[] = wordsDataKannada.wordsKannada;
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedTranslation, setSelectedTranslation] = useState<string | null>(
    null
  );
  const [matchedPairs, setMatchedPairs] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleWordClick = (word: string) => {
    setSelectedWord(word);
    if (selectedTranslation) {
      checkMatch(word, selectedTranslation);
    }
  };

  const handleTranslationClick = (translation: string) => {
    setSelectedTranslation(translation);
    if (selectedWord) {
      checkMatch(selectedWord, translation);
    }
  };

  const checkMatch = (word: string, translation: string) => {
    console.log("Word - Translation", word, translation);
    const matchedWord = words.find(
      (w) => w.word === word && w.translation === translation
    );
    if (matchedWord) {
      setMatchedPairs((prev) => ({ ...prev, [matchedWord.id]: true }));
    }
    console.log("MatchedWord", matchedWord);
  };
  return (
    <div>
      <h1>Match Words</h1>
      <div className="flex flex-wrap">
        {words.map((word) => (
          <button
            key={word.id}
            className={`m-2 p-2 border rounded ${
              matchedPairs[word.id] ? "bg-green-500" : "bg-white"
            }`}
            onClick={() => handleWordClick(word.word)}
          >
            {word.word}
          </button>
        ))}
      </div>
      <div>
        {words.map((word) => (
          <button
            key={word.id + "-translation"}
            className={`m-2 p-2 border rounded ${
              matchedPairs[word.id] ? "bg-green-500" : "bg-white"
            }`}
            onClick={() => handleTranslationClick(word.translation)}
          >
            {word.translation}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MatchTheWords;
