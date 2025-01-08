import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import QuizLearnedWords from "../../quizzes/LearnWords/QuizLearnedWords";

const LearnWords = () => {
  const [userID, setUserID] = useState<string | null>(null);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);
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
    if (storedLearnedWords) {
      const parsedLearnedWords = JSON.parse(storedLearnedWords);
      if (parsedLearnedWords.length < 5) {
        setIsQuizComplete(true); // not to confuse, just using this variable to enable the button
      }
    }
  }, []);

  const handleQuizComplete = () => {
    setIsQuizComplete(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl">Word Quest</h1>
        <p className="text-lg">
          Boost your vocab daily with Word Quest. Learn, challenge, and grow
          your word power!
        </p>
      </div>
      <div className="flex flex-col flex-grow justify-center items-center">
        <button
          className={`bg-white py-2 px-4 rounded-full ${
            isQuizComplete ? "opacity-100" : "opacity-50 cursor-not-allowed"
          }`}
          onClick={handleButtonClick}
          disabled={!isQuizComplete}
        >
          Let's Learn!
        </button>
        <div>
          <QuizLearnedWords onQuizComplete={handleQuizComplete} />
        </div>
      </div>
    </div>
  );
};

export default LearnWords;
