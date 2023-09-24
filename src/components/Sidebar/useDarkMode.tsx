import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { useDarkMode as useHooksDarkMode } from "use-hooks";

type ContextProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

type ProviderProps = {};

const DarkModeContext = createContext<ContextProps>({
  darkMode: false,
  toggleDarkMode: () => {},
});

export function DarkModeProvider({
  children,
}: PropsWithChildren<ProviderProps>) {
  const [darkMode, setDarkMode] = useHooksDarkMode(
    "dark",
    document.documentElement
  );

  const toggleDarkMode = useCallback(() => {
    setDarkMode(!darkMode);
  }, [darkMode]);

  const value = useMemo(
    () => ({ darkMode, toggleDarkMode }),
    [darkMode, toggleDarkMode]
  );

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
}

export const useDarkMode = () => useContext(DarkModeContext);
