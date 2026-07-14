import React from 'react';
import './StockOverview.css';

const StockOverview = ({ 
  totalItems = 0, 
  lowStockItems = 0, 
  outOfStockItems = 0,
  totalValue = 0,
  recentMovements = []
}) => {
  const stats = [
    { icon: '📦', value: totalItems, label: 'Total Items', color: 'primary' },
    { icon: '⚠️', value: lowStockItems, label: 'Low Stock', color: 'warning' },
    { icon: '🚫', value: outOfStockItems, label: 'Out of Stock', color: 'danger' },
    { icon: '💰', value: `Rs. ${totalValue.toLocaleString()}`, label: 'Total Value', color: 'success' }
  ];

  return (
    <div className="stock-overview">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {recentMovements.length > 0 && (
        <div className="recent-movements">
          <h4>📋 Recent Stock Movements</h4>
          <div className="movements-list">
            {recentMovements.slice(0, 5).map((movement, index) => (
              <div key={index} className={`movement-item ${movement.type}`}>
                <span className="movement-icon">
                  {movement.type === 'in' ? '📥' : '📤'}
                </span>
                <span className="movement-product">{movement.product}</span>
                <span className="movement-quantity">
                  {movement.type === 'in' ? '+' : '-'}{movement.quantity}
                </span>
                <span className="movement-time">{movement.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StockOverview;