// interface UserWelcomeScreenProps {
//   nickname: string | null;
//   userGrowthPoints: number;
//   favoriteWordsCount: number;
// }

import { useUserData } from "../helpers/UserDataContext";
import useUserGrowthPoints from "../hooks/useUserGrowthPoints";
import { useState, useEffect } from "react";

const UserWelcomeScreen = () => {
  const { nickname } = useUserData();
  const [userID, setUserID] = useState<string | null>("");
  const { userGrowthPoints } = useUserGrowthPoints(userID);

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    setUserID(storedUserID);
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-600 ml-2 mb-4">
        {" "}
        Welcome {nickname}!
      </h1>
      <span className="flex items-center space-x-2 rounded-lg mx-2 px-4 py-1 bg-gray-800 text-white shadow-lg">
        <span>Total GP - </span>
        <span className="rounded-full bg-yellow-300 text-gray-800 px-2">
          {userGrowthPoints}
        </span>
      </span>
      {/* <h1 className="text-xl font-bold text-center text-white mt-4 bg-green-600 rounded-lg shadow-lg mx-2">
        🫵 have learned{" "}
        <span className="text-blue-600 text-2xl rounded-full bg-white px-2 py-0">
          {favoriteWordsCount}
        </span>{" "}
        words so far 🥳
      </h1> */}
    </div>
  );
};

export default UserWelcomeScreen;
