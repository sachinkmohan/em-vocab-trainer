import { useState } from "react";
import wordsDataMalayalam from "../../../wordsMalayalam.json";

const words = wordsDataMalayalam.wordsMalayalam.slice(0, 3);
const LearnWordsGame = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const handleButtonClick = () => {
    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  const selectedWord = words[currentWordIndex];
  return (
    <div className="bg-blue-800 min-h-screen flex flex-col items-center justify-center">
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
              onClick={handleButtonClick}
            >
              No
            </button>

            <button
              className="bg-green-500 m-2 p-2 px-12 rounded-xl"
              onClick={handleButtonClick}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnWordsGame;
