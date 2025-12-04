import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isBlueMode, setIsBlueMode] = useState(false);

  const toggleTheme = () => {
    setIsBlueMode(!isBlueMode);
  };

  useEffect(() => {
    if (isBlueMode) {
      document.documentElement.classList.add("theme-blue");
    } else {
      document.documentElement.classList.remove("theme-blue");
    }
  }, [isBlueMode]);

  return (
    <ThemeContext.Provider value={{ isBlueMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
