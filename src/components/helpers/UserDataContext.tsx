import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
interface UserData {
  email: string | null;
  nickname: string | null;
  name: string | null;
  learningLanguage: string | null;
  languageLevel: string | null;
  roles: string[] | null;
  id: string | null;
  growthPoints: number | null;
}

interface UserDataContextProps extends UserData {
  setUserData: (userData: UserData) => void; // KNOW
}

const UserDataContext = createContext<UserDataContextProps | undefined>(
  undefined
);

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>({
    email: null,
    nickname: null,
    name: null,
    learningLanguage: null,
    languageLevel: null,
    roles: null,
    id: null,
    growthPoints: null,
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const userDocRef = doc(db, "users", user.uid);

          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserData({
              email: userData.email,
              nickname: userData.nickname,
              name: userData.name,
              learningLanguage: userData.learningLanguage,
              languageLevel: userData.languageLevel,
              roles: userData.roles,
              id: user.uid,
              growthPoints: userData.growthPoints,
            });
          } else {
            console.error("No such document");
          }
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserDataContext.Provider value={{ ...userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};
