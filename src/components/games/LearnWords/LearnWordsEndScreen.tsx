import { useNavigate } from "react-router-dom";
const LearnWordsEndScreen = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/learn-new-words");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100 overflow-hidden">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
        <h1 className="font-semibold text-gray-800">
          New Words Learned Successfully! 🥳
        </h1>
        <button
          onClick={handleNavigation}
          className="bg-blue-500 text-white py-2 px-4 rounded-full mt-4"
        >
          Start Quiz Again
        </button>
      </div>
    </div>
  );
};

export default LearnWordsEndScreen;
