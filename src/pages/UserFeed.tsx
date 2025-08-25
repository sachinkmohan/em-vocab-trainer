// import { FaCheckCircle } from "react-icons/fa"; // Importing necessary icons
// import { formatDistanceToNow, compareDesc, parse } from "date-fns";
import { db } from "../utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface UserFeed {
  id: string;
  date: string;
  message: string;
}

// interface TimelineItem {
//   date: string;
//   user: string;
// }
const UserFeed = () => {
  const [userFeedData, setUserFeedData] = useState<UserFeed[]>([]);

  //   const parseDate = (date: string) => {
  //     return parse(date, "dd-MM-yyyy", new Date());
  //   };

  //   const timelineData: TimelineItem[] = [
  //     {
  //       date: "06-02-2025",
  //       user: "John Doe",
  //     },
  //     {
  //       date: "01-01-2025",
  //       user: "Susan Smith",
  //     },
  //     // generate 10 more random dates
  //     {
  //       date: "15-03-2025",
  //       user: "Alice Johnson",
  //     },
  //     {
  //       date: "20-04-2025",
  //       user: "Bob Brown",
  //     },
  //     {
  //       date: "25-05-2025",
  //       user: "Charlie Davis",
  //     },
  //     {
  //       date: "30-06-2025",
  //       user: "Diana Evans",
  //     },
  //     {
  //       date: "05-07-2025",
  //       user: "Ethan Foster",
  //     },
  //     {
  //       date: "10-08-2025",
  //       user: "Fiona Green",
  //     },
  //     {
  //       date: "15-09-2025",
  //       user: "George Harris",
  //     },
  //     {
  //       date: "20-10-2025",
  //       user: "Hannah Ives",
  //     },
  //     {
  //       date: "25-11-2025",
  //       user: "Ian Johnson",
  //     },
  //     {
  //       date: "30-12-2025",
  //       user: "Jack King",
  //     },
  //   ].sort((a, b) => {
  //     // Sorting by date in DD-MM-YYYY format
  //     const dateA = parseDate(a.date);
  //     const dateB = parseDate(b.date);
  //     return compareDesc(dateA, dateB);
  //   });

  //   const formatRelativeTime = (date: string) => {
  //     const parsedDate = parseDate(date);
  //     return formatDistanceToNow(parsedDate, { addSuffix: true });
  //   };

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
    return userFeedData.map((ufData) => (
      <p key={ufData.id}>{ufData.message}</p>
    ));
  };

  return (
    <div className="max-w-2xl mx-auto px-8">
      <div className="py-2">
        <h2 className="text-xl font-bold py-2">Scrolls</h2>
      </div>
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
        {renderUserFeedData()}
      </div>
    </div>
  );
};

export default UserFeed;
