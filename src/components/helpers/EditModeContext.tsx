import {
  createContext,
  useState,
  useContext,
  useMemo,
  useCallback,
  ReactNode,
} from "react";

const EditModeContext = createContext({
  isEditMode: false,
  toggleEditMode: () => {},
});

export const EditModeProvider = ({ children }: { children: ReactNode }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = useCallback(() => {
    setIsEditMode((prevMode) => !prevMode);
  }, []);

  const value = useMemo(
    () => ({ isEditMode, toggleEditMode }),
    [isEditMode, toggleEditMode]
  );

  return (
    <EditModeContext.Provider value={value}>
      {children}
    </EditModeContext.Provider>
  );
};

export const useEditMode = () => useContext(EditModeContext);
