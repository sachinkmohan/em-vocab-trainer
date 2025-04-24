import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import QuizLearnedWords from "../../quizzes/LearnWords/QuizLearnedWords";
import LearnWordsScoreCard from "./LearnWordsScoreCard";

const LearnWords = () => {
  const [userID, setUserID] = useState<string | null>(null);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);
  const [notEnoughWordsLearned, setNotEnoughWordsLearned] =
    useState<boolean>(false);
  const [userMessage, setUserMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/start-words-game");
  };

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    setUserID(storedUserID);
  }, [userID]);

  useEffect(() => {
    const storedLearnedWords = localStorage.getItem("learnedWordsID");
    if (storedLearnedWords === null) {
      setNotEnoughWordsLearned(true);
    }
    if (storedLearnedWords) {
      const parsedLearnedWords = JSON.parse(storedLearnedWords);
      if (parsedLearnedWords.length < 5) {
        setNotEnoughWordsLearned(true);
      }
    }
  }, []);

  const handleQuizComplete = (message: string) => {
    setIsQuizComplete(true);
    setUserMessage(message);
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-b from-[#f8e8a6] via-[#fceabb] to-[#fdf6e3]">
      <div className="w-full max-w-md px-4 py-6">
        <div className="text-center">
          <h1 className="text-4xl">Word Quest</h1>
          <p className="text-sm text-slate-500 pt-4">
            Boost your vocab daily with Word Quest. Learn, challenge, and grow
            your word power! Note, to learn new words, you must score a 60% in
            the quiz.
          </p>
        </div>

        <QuizLearnedWords onQuizComplete={handleQuizComplete} />

        {isQuizComplete && !notEnoughWordsLearned && (
          <LearnWordsScoreCard userMessage={userMessage} />
        )}
      </div>

      {notEnoughWordsLearned || isQuizComplete ? (
        <div>
          <button
            className={`bg-white py-2 px-4 rounded-full border-solid border-2 ${
              notEnoughWordsLearned || isQuizComplete
                ? "shadow-lg border-lime-300"
                : "opacity-50"
            }`}
            onClick={handleButtonClick}
          >
            Let's Learn!
          </button>
        </div>
      ) : (
        <p className="animate-pulse mt-2">
          Button will be back once you score 60%
        </p>
      )}
    </div>
  );
};

export default LearnWords;
