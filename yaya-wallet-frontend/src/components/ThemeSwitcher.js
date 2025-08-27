import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-switcher">
      <i className="fa fa-sun-o"></i>
      <label className="switch">
        <input 
          type="checkbox" 
          onChange={toggleTheme} 
          checked={theme === 'dark'}
        />
        <span className="slider round"></span>
      </label>
      <i className="fa fa-moon-o"></i>
    </div>
  );
};

export default ThemeSwitcher;