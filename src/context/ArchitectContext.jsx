import React, { createContext, useContext, useState, useEffect } from "react";

const ArchitectContext = createContext();

export const ArchitectProvider = ({ children }) => {
  const [isArchitectMode, setIsArchitectMode] = useState(false);

  useEffect(() => {
    if (isArchitectMode) {
      document.body.classList.add("architect-mode");
    } else {
      document.body.classList.remove("architect-mode");
    }
  }, [isArchitectMode]);

  return (
    <ArchitectContext.Provider value={{ isArchitectMode, setIsArchitectMode }}>
      {children}
    </ArchitectContext.Provider>
  );
};

export const useArchitect = () => useContext(ArchitectContext);
