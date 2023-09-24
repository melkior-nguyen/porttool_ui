import { useCallback } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useDarkMode } from "./useDarkMode";

const Toggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  const toggleTheme = useCallback(() => {
    toggleDarkMode();
  }, [toggleDarkMode]);

  return (
    <div className="transition ease-in-out duration-500 rounded-full p-2">
      {darkMode ? (
        <FaSun
          onClick={toggleTheme}
          className="text-gray-500 text-2xl dark:text-gray-400 cursor-pointer"
        />
      ) : (
        <FaMoon
          onClick={toggleTheme}
          className="text-gray-500 text-2xl dark:text-gray-400 cursor-pointer"
        />
      )}
    </div>
  );
};

export default Toggle;
