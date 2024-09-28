import { db } from "../../utils/firebaseConfig";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useUserData } from "../helpers/UserDataContext";

interface userData {
  userID: string;
  userGrowthPoints: number;
  name: string;
}

const AdminDashboard = () => {
  const [usersData, setUsersData] = useState<userData[]>([]);
  const { learningLanguage } = useUserData();

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const usersCollectionRef = collection(db, "users");
        // Create a query to filter users by the current user's learningLanguage
        const usersQuery = query(
          usersCollectionRef,
          where("learningLanguage", "==", learningLanguage)
        );
        const usersSnapshot = await getDocs(usersQuery);
        const userData = await Promise.all(
          usersSnapshot.docs.map(async (userDoc) => {
            const userData = userDoc.data();

            return {
              userID: userDoc.id,
              userGrowthPoints: userData.growthPoints || 0,
              name: userData.name,
            };
          })
        );
        const sortedUserData = userData.sort(
          (a, b) => b.userGrowthPoints - a.userGrowthPoints
        );
        setUsersData(sortedUserData);
      } catch (error) {
        console.error("Error fetching users data: ", error);
      }
    };
    fetchUsersData();
  }, [learningLanguage]);
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md m-4">
      <h1>GP Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th className="py-2 px-4 border-b"> Name</th>
            <th className="py-2 px-4 border-b"> Growth Points(GP)</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user) => (
            <tr key={user.userID}>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.userGrowthPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
