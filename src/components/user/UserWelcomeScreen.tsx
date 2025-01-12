// interface UserWelcomeScreenProps {
//   nickname: string | null;
//   userGrowthPoints: number;
//   favoriteWordsCount: number;
// }

import { useUserData } from "../helpers/UserDataContext";
import useUserGrowthPoints from "../hooks/useUserGrowthPoints";
import { useState, useEffect } from "react";
import useSyncLocalLearnedWordsWithFirebase from "../hooks/useSyncLocalLearnedWordsWithFirebase";
import { toast } from "react-toastify";
import wordsDataMalayalam from "../../../wordsMalayalam.json";
import ProgressBar from "../progress-bar/ProgressBar";

const UserWelcomeScreen = () => {
  const { nickname } = useUserData();
  const [userID, setUserID] = useState<string | null>("");
  const { userGrowthPoints } = useUserGrowthPoints(userID);
  const [currentWords, setCurrentWords] = useState<number>(0);

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    setUserID(storedUserID);

    const storedLearnedWords = localStorage.getItem("learnedWordsID");
    if (storedLearnedWords) {
      const parsedLearnedWords = JSON.parse(storedLearnedWords);
      setCurrentWords(parsedLearnedWords.length);
    }
  }, []);

  const handleSyncComplete = () => {
    toast.success("Words synced successfully");
  };

  useSyncLocalLearnedWordsWithFirebase(handleSyncComplete);

  const totalWordsMalayalam = wordsDataMalayalam.wordsMalayalam.length;

  return (
    <div
      className="flex flex-col justify-center items-center"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      <div className="w-screen md:w-1/3">
        <div>
          <h1 className="text-xl font-semibold text-gray-600 ml-2 mb-4">
            {" "}
            Welcome {nickname}!
          </h1>
          <span className="flex items-center justify-center space-x-2 rounded-full mx-2 px-4 py-1 bg-gray-800 text-white shadow-lg">
            <span>Total GP - </span>
            <span className="rounded-full bg-yellow-300 text-gray-800 px-2">
              {userGrowthPoints}
            </span>
          </span>
        </div>

        <div className="px-4 mt-4">
          <ProgressBar current={currentWords} total={totalWordsMalayalam} />
        </div>
      </div>
    </div>
  );
};

export default UserWelcomeScreen;
