import { useEffect, useState } from "react";
import wordsMalayalam from "../../../../wordsMalayalam.json";
import QuizModal from "./QuizModal";
import { useUserData } from "../../helpers/UserDataContext";
import { db } from "../../../utils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const QuizLearnedWords = ({
  onQuizComplete,
}: {
  onQuizComplete: (message: string) => void;
}) => {
  const [learnedWords, setLearnedWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { name } = useUserData();

  useEffect(() => {
    if (selectedOption) {
      validateAnswer();
    }
  }, [selectedOption]);

  const addQuizPassNotificationToDB = async () => {
    const docRef = await addDoc(collection(db, "userFeed"), {
      message: `${name} passed the Quiz! `,
    });
    console.log("User passed the quiz with the ID", docRef.id, name);
  };

  const validateAnswer = () => {
    const currentWord = wordsMalayalam.wordsMalayalam.find(
      (word) => word.id === learnedWords[currentWordIndex]
    );
    if (currentWord && selectedOption === currentWord.meaning) {
      setCorrectAnswers(correctAnswers + 1);
      if (correctAnswers + 1 === 3) {
        onQuizComplete("Hurrah, you did it! Quiz is now enabled!");
        addQuizPassNotificationToDB();
      } else if (correctAnswers + 1 === 4) {
        onQuizComplete("You are irresistable! Can you get a 💯?");
      } else if (correctAnswers + 1 === 5) {
        onQuizComplete("OMG! That's a 💯! You need a pat on your back!");
      }
    } else {
      setWrongAnswers(wrongAnswers + 1);
      if (wrongAnswers + 1 >= 3) {
        setShowModal(true);
      }
    }
    if (currentWordIndex < 5) {
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore no fix yet for this new feature
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
    <div className="mt-4 bg-white rounded-2xl">
      <QuizModal show={showModal} onClose={resetQuiz}>
        <h2 className="text-fuchsia-600 text-lg"> You lost!😢 Try again. 💪</h2>
      </QuizModal>
      {learnedWords.length >= 5 ? (
        <div className="p-4">
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
                disabled={currentWordIndex === 5}
              />
              <label htmlFor={`option-${index}`}>{option}</label>
            </div>
          ))}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-6 relative">
              <p className="text-center absolute inset-0 flex items-center justify-center">
                {correctAnswers} out of {learnedWords.length} correct (
                {calculateProgress()}%)
              </p>
              <div
                className="bg-blue-300 h-6 rounded-full"
                style={{ width: `${calculateQuizProgress()}%` }}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <p className="border-2 border-indigo-200 text-center rounded-md">
          {" "}
          📣 Learn atleast 5 words to see a quiz! 📣
        </p>
      )}
    </div>
  );
};

export default QuizLearnedWords;
