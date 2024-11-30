import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const LearnWords = () => {
  const [userID, setUserID] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/start-words-game");
  };

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    setUserID(storedUserID);
  }, [userID]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-800">
      <head>
        <title>Word Quest</title>
      </head>
      <div className="text-center">
        <h1 className="text-4xl">Word Quest</h1>
        <p className="text-lg">
          Boost your vocab daily with Word Quest. Learn, challenge, and grow
          your word power!
        </p>
      </div>
      <div className="flex flex-grow justify-center items-center">
        <button
          className="bg-white py-2 px-4 rounded-full"
          onClick={handleButtonClick}
        >
          Let's Learn!
        </button>
      </div>
    </div>
  );
};

export default LearnWords;
