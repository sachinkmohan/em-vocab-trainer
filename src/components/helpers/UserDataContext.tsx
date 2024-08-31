import { createContext, useState, useContext, ReactNode } from "react";

interface UserDataContextProps {
  email: string | null;
  setEmail: (email: string | null) => void;
}

const UserDataContext = createContext<UserDataContextProps | undefined>(
  undefined
);

export const UserDataPovider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState<string | null>(null);

  return (
    <UserDataContext.Provider value={{ email, setEmail }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};