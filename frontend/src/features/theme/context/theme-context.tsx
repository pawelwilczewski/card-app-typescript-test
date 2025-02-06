import { Theme } from "@/features/theme/types/theme";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
} | null>(null);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(localStorage.theme ?? "auto");

  useEffect(() => {
    localStorage.theme = theme;

    const preferenceMedia = window.matchMedia("(prefers-color-scheme: dark)");
    preferenceMedia.removeEventListener("change", updatePreferenceBodyClass);

    switch (theme) {
      case "light": {
        document.documentElement.classList.remove("dark");
        break;
      }
      case "dark": {
        document.documentElement.classList.add("dark");
        break;
      }
      case "auto": {
        updatePreferenceBodyClass();
        preferenceMedia.addEventListener("change", updatePreferenceBodyClass);
        break;
      }
    }

    function updatePreferenceBodyClass(): void {
      if (preferenceMedia.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
