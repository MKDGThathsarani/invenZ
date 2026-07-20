import React from 'react';
import './StatCard.css';

const StatCard = ({ icon, value, label, change, color = 'primary' }) => {
  const colors = {
    primary: '#1B5E20',
    success: '#43A047',
    warning: '#FF9800',
    danger: '#F44336',
    info: '#2196F3'
  };

  return (
    <div className="stat-card" style={{ borderLeftColor: colors[color] }}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        {change && (
          <div className={`stat-change ${change.includes('+') ? 'positive' : 'negative'}`}>
            {change}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;