import React from 'react';
import './Card.css';

const Card = ({ 
  children, 
  title, 
  icon, 
  className = '',
  borderColor = 'primary'
}) => {
  const colors = {
    primary: '#1B5E20',
    success: '#43A047',
    warning: '#FF9800',
    danger: '#F44336',
    info: '#2196F3'
  };

  return (
    <div 
      className={`card ${className}`}
      style={{ borderLeftColor: colors[borderColor] }}
    >
      {title && (
        <div className="card-header">
          {icon && <span className="card-icon">{icon}</span>}
          <h3 className="card-title">{title}</h3>
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;