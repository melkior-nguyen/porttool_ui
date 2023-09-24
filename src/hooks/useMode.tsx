import { useCallback, useEffect, useState } from "react";

type ThemeInput = string | null;
type CallbackType = (input: ThemeInput) => void;

function useDarkMode(themeInput: ThemeInput) {
  const [mode, setMode] = useState<ThemeInput>(themeInput);

  useEffect(() => {
    (async () => {
      try {
        const theme = localStorage.getItem("theme");
        if (
          theme === "dark" ||
          (!("theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
          document.documentElement.classList.add("dark");
          setMode("dark");
        } else {
          document.documentElement.classList.remove("dark");
          setMode("light");
        }
      } catch (err) {
        console.log(err);
      }
    })();
  });

  const handleSetMode = useCallback<CallbackType>(async (modeInput) => {
    switch (modeInput) {
      case "light": {
        localStorage.setItem("theme", modeInput);
        setMode("light");
        break;
      }
      case "dark": {
        localStorage.setItem("theme", modeInput);
        setMode("dark");
        break;
      }
      default: {
        localStorage.removeItem("theme");
        setMode(null);
      }
    }
  }, []);

  return [mode, handleSetMode] as const;
}

export default useDarkMode;
