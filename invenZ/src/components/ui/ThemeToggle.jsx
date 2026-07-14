import React from 'react';
import './ThemeToggle.css';

const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <button 
      className={`theme-toggle ${isDark ? 'dark' : 'light'}`}
      onClick={onToggle}
      aria-label="Toggle theme"
    >
      <span className="toggle-icon">
        {isDark ? '🌙' : '☀️'}
      </span>
      <span className="toggle-label">
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  );
};

export default ThemeToggle;