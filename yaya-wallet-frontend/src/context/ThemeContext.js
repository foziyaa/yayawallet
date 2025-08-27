import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Create the context
const ThemeContext = createContext();

// 2. Create the Provider component
export const ThemeProvider = ({ children }) => {
  // State to hold the current theme, defaulting to 'light'
  const [theme, setTheme] = useState('light');

  // Function to toggle between light and dark
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // 3. Effect to update the <body> tag's data-theme attribute
  // This is what our CSS will use to switch styles
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 4. Create a custom hook for easy access to the context
export const useTheme = () => useContext(ThemeContext);