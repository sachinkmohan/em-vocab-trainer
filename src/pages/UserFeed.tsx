import { formatDistanceToNow, compareDesc, parse } from "date-fns";
import { db } from "../utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";

interface UserFeed {
  id: string;
  date: string;
  message: string;
}

const UserFeed = () => {
  const [userFeedData, setUserFeedData] = useState<UserFeed[]>([]);

  const parseDate = (date: string) => {
    return parse(date, "dd-MM-yyyy", new Date());
  };

  useEffect(() => {
    const fetchUserFeed = async () => {
      try {
        const querySnapShot = await getDocs(collection(db, "userFeed"));
        querySnapShot.forEach((doc) => {
          console.log(doc.id, " =>", doc.data());
        });
        setUserFeedData(
          querySnapShot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as UserFeed)
          )
        );
      } catch (error) {
        console.error("Error fetching user feed:", error);
      }
    };

    fetchUserFeed();
  }, []);

  const renderUserFeedData = () => {
    const sortedUserFeedDataWithDate = [...userFeedData].sort(
      (a: UserFeed, b: UserFeed) => {
        if (a.date !== "" && b.date !== "") {
          return compareDesc(parseDate(a.date), parseDate(b.date));
        }
        if (a.date === "" && b.date === "") return 0;
        return a.date === "" ? 1 : -1;
      }
    );
    return sortedUserFeedDataWithDate.map((ufData) => (
      <div key={ufData.id} className="flex items-center gap-2">
        <IoPersonCircleOutline className="text-6xl" />
        <div>
          <p>{ufData.message}</p>
          {/* <p>{ufData.date}</p> */}
          {ufData.date && (
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(
                parse(ufData.date, "dd-MM-yyyy", new Date()),
                { addSuffix: true }
              )}
            </p>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="max-w-2xl mx-auto px-8 pb-16">
      <div className="py-2">
        <h2 className="text-xl font-bold py-2">Scrolls</h2>
      </div>
      {userFeedData.length === 0 && (
        <div>
          <img
            src="/src/assets/empty-screen-feed-quiz-new.png"
            alt="illustration of a man and a woman sitting on giant books looking on their phones with a text saying - Time to take a quiz"
          />
          <p>
            Once you've completed a quiz, you'll see updates from the community
            here.
          </p>
          <Link
            className="w-full block text-center bg-blue-200  rounded-md py-2 my-2"
            to="/learn-new-words"
          >
            Take a Quiz
          </Link>
        </div>
      )}
      <div>{renderUserFeedData()}</div>
    </div>
  );
};

export default UserFeed;
