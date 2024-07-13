import { useState } from "react";

const HomePage = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const addWordsToMainWordsDB = () => {
    const words = inputValue.split("\n");
    // add words to array of objects in the format {word: "word", translation: "translation", figureOfSpeech: "figureOfSpeech"}
    const wordsArray = words.map((w) => {
      const [word, translation, figureOfSpeech] = w.split(",");
      return {
        word,
        translation,
        figureOfSpeech,
      };
    });
    console.log(wordsArray);
  };
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-lg space-y-4" data-testid="home-page">
        <textarea
          className="w-full border  border-gray-300 rounded-md "
          rows={10}
          placeholder="Enter words"
          onChange={handleInputChange}
        />
        <div className="flex justify-center">
          <button
            type="button"
            className=" bg-blue-500 hover:bg-blue-700 text-white rounded-md px-4 py-2 ml-4"
            onClick={addWordsToMainWordsDB}
          >
            Add Words
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
