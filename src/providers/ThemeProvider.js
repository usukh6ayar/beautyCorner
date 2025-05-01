// src/providers/ThemeProvider.js
import React, { createContext, useContext, useState } from "react";
import { Theme } from "../constants/theme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = {
    ...Theme,
    colors: {
      ...(isDarkMode ? Theme.colors.dark : Theme.colors.light),
      common: Theme.colors.common,
    },
    mode: isDarkMode ? "dark" : "light",
    toggleTheme: () => setIsDarkMode(!isDarkMode),
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
