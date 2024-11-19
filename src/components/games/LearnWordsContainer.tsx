import { useNavigate } from "react-router-dom";

const LearnWords = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/start-words-game");
  };
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
