import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isBlueMode, setIsBlueMode] = useState(true);
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const toggleTheme = () => {
    setIsBlueMode(!isBlueMode);
  };

  useEffect(() => {
    if (!isBlueMode) {
      document.documentElement.classList.add("theme-light");
    } else {
      document.documentElement.classList.remove("theme-light");
    }
  }, [isBlueMode]);

  return (
    <ThemeContext.Provider
      value={{
        isBlueMode,
        toggleTheme,
        isCommandPaletteOpen,
        setCommandPaletteOpen,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
