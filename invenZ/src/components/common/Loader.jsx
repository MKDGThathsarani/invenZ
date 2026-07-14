import React from 'react';
import './Loader.css';

const Loader = ({ 
  size = 'medium',
  color = 'primary',
  text = '',
  fullScreen = false 
}) => {
  const sizes = {
    small: 'loader-sm',
    medium: 'loader-md',
    large: 'loader-lg'
  };

  const colors = {
    primary: '#1B5E20',
    success: '#43A047',
    warning: '#FF9800',
    danger: '#F44336',
    white: '#FFFFFF'
  };

  if (fullScreen) {
    return (
      <div className="loader-fullscreen">
        <div className="loader-container">
          <div 
            className={`loader ${sizes[size]}`}
            style={{ borderTopColor: colors[color] }}
          />
          {text && <p className="loader-text">{text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="loader-container">
      <div 
        className={`loader ${sizes[size]}`}
        style={{ borderTopColor: colors[color] }}
      />
      {text && <p className="loader-text">{text}</p>}
    </div>
  );
};

export default Loader;