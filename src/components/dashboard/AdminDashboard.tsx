import { db } from "../../utils/firebaseConfig";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

interface userData {
  userID: string;
  name: string;
  favoriteWordsCount: number;
}

const AdminDashboard = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [usersData, setUsersData] = useState<userData[]>([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const usersCollectionRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollectionRef);
        const userData = await Promise.all(
          usersSnapshot.docs.map(async (userDoc) => {
            const userData = userDoc.data();
            const favoriteWordIDsCollectionRef = collection(
              userDoc.ref,
              "favoriteWordIDs"
            );
            const favoriteWordsSnapshot = await getDocs(
              favoriteWordIDsCollectionRef
            );
            //console.log("usersSnapshot: ", userData);
            const favoriteWordsCount = favoriteWordsSnapshot.size;
            return {
              userID: userDoc.id,
              name: userData.name,
              favoriteWordsCount,
            };
          })
        );
        setUsersData(userData);
      } catch (error) {
        console.error("Error fetching users data: ", error);
      }
    };
    fetchUsersData();
  }, []);
  return (
    <div>
      <h1>Admin Dashboard</h1>
    </div>
  );
};

export default AdminDashboard;
