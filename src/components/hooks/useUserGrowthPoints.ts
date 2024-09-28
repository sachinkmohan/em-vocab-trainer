import { useEffect, useState } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";

const useUserGrowthPoints = (userID: string | null) => {
  const [userGrowthPoints, setUserGrowthPoints] = useState<number>(0);

  useEffect(() => {
    if (!userID) {
      console.error("userID is null");
      return;
    }

    const userDocRef = doc(db, "users", userID);

    const unsubscribe = onSnapshot(
      userDocRef,
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setUserGrowthPoints(data.growthPoints ?? 0);
        } else {
          console.error("No such document");
        }
      },
      (error) => {
        console.error("Error fetching user growth points: ", error);
      }
    );

    return () => unsubscribe();
  }, [userID]);

  const addGPToFirebase = async (pointsToAdd: number) => {
    if (!userID) {
      console.error("userID is null");
      return;
    }
    const userDocRef = doc(db, "users", userID);
    try {
      const fetchedGrowthPoints = userGrowthPoints ?? 0;
      await updateDoc(userDocRef, {
        growthPoints: fetchedGrowthPoints + pointsToAdd,
      });
    } catch (error) {
      console.error("Error setting growthPoints: ", error);
    }
  };

  const removeGPFromFirebase = async (pointsToRemove: number) => {
    if (!userID) {
      console.error("userID is null");
      return;
    }
    const userDocRef = doc(db, "users", userID);
    try {
      const fetchedGrowthPoints = userGrowthPoints ?? 0;
      await updateDoc(userDocRef, {
        growthPoints: Math.max(fetchedGrowthPoints - pointsToRemove, 0),
      });
    } catch (error) {
      console.error("Error removing growthPoints: ", error);
    }
  };

  return { userGrowthPoints, addGPToFirebase, removeGPFromFirebase };
};

export default useUserGrowthPoints;
