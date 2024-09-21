import { db } from "../../utils/firebaseConfig";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

interface userData {
  userID: string;
  userPrimaryLanguage: string;
  name: string;
  favoriteWordsCount: number;
}

const AdminDashboard = () => {
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
            const favoriteWordsCount = favoriteWordsSnapshot.size;
            return {
              userID: userDoc.id,
              userPrimaryLanguage: userData.learningLanguage,
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
    <div className="p-6 bg-gray-100 rounded-lg shadow-md m-4">
      <h1>Admin Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th className="py-2 px-4 border-b"> Name</th>
            <th className="py-2 px-4 border-b"> Primary Language</th>
            <th className="py-2 px-4 border-b"> Fav Count</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user) => (
            <tr key={user.userID}>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.userPrimaryLanguage}</td>
              <td className="py-2 px-4 border-b">{user.favoriteWordsCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
