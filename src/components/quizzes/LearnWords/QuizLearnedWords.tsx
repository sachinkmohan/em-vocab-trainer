import { useEffect, useState } from "react";
import wordsMalayalam from "../../../../wordsMalayalam.json";
import QuizModal from "./QuizModal";

const QuizLearnedWords = ({
  onQuizComplete,
}: {
  onQuizComplete: () => void;
}) => {
  const [learnedWords, setLearnedWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (selectedOption) {
      validateAnswer();
    }
  }, [selectedOption]);

  const validateAnswer = () => {
    const currentWord = wordsMalayalam.wordsMalayalam.find(
      (word) => word.id === learnedWords[currentWordIndex]
    );
    if (currentWord && selectedOption === currentWord.meaning) {
      setCorrectAnswers(correctAnswers + 1);
      if (correctAnswers + 1 >= 3) {
        onQuizComplete();
      }
    } else {
      setWrongAnswers(wrongAnswers + 1);
      if (wrongAnswers + 1 >= 3) {
        setShowModal(true);
      }
    }
    if (currentWordIndex < 4) {
      setCurrentWordIndex(currentWordIndex + 1);
    }
    setSelectedOption("");
  };

  const resetQuiz = () => {
    setCurrentWordIndex(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setShowModal(false);
  };

  useEffect(() => {
    const storedLearnedWords = localStorage.getItem("learnedWordsID");
    if (storedLearnedWords) {
      const parsedLearnedWords = JSON.parse(storedLearnedWords);
      const shuffledLearnedWords = parsedLearnedWords.sort(
        () => 0.5 - Math.random()
      );
      setLearnedWords(shuffledLearnedWords.slice(0, 5));
    }
  }, []);

  useEffect(() => {
    if (learnedWords.length > 0) {
      const currentWord = wordsMalayalam.wordsMalayalam.find(
        (word) => word.id === learnedWords[currentWordIndex]
      );
      if (currentWord) {
        const shuffledOptions = shuffleOptions(currentWord.meaning);
        setOptions(shuffledOptions);
      }
    }
  }, [learnedWords, currentWordIndex]);

  const shuffleOptions = (correctOption: string) => {
    const allMeanings = wordsMalayalam.wordsMalayalam.map(
      (word) => word.meaning
    );
    const incorrectOptions = allMeanings.filter(
      (meaning) => meaning !== correctOption
    );
    const shuffledOptions = [
      correctOption,
      ...incorrectOptions.toSorted(() => 0.5 - Math.random()).slice(0, 3),
    ];
    return shuffledOptions.sort(() => 0.5 - Math.random());
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const calculateProgress = () => {
    return (correctAnswers / learnedWords.length) * 100;
  };

  const calculateQuizProgress = () => {
    return (currentWordIndex / learnedWords.length) * 100;
  };

  return (
    <div className="mt-4">
      <QuizModal show={showModal} onClose={resetQuiz}>
        <h2> You lost! Try again.</h2>
      </QuizModal>
      {learnedWords.length >= 5 && (
        <div className="border-2 border-indigo-50 p-4">
          <h1>
            What's the meaning of the word{" "}
            {
              wordsMalayalam.wordsMalayalam.find(
                (word) => word.id === learnedWords[currentWordIndex]
              )?.word.inTranslit
            }
            ?
          </h1>
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`option -${index}`}
                name="quiz-option"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
                className="m-2"
              />
              <label htmlFor={`option-${index}`}>{option}</label>
            </div>
          ))}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${calculateQuizProgress()}%` }}
              ></div>
            </div>
            <p className="text-center mt-2">
              {correctAnswers} out of {learnedWords.length} correct (
              {calculateProgress().toFixed(2)}%)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizLearnedWords;
