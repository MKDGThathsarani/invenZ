import React, { useState } from 'react';
import './LowStockAlert.css';

const LowStockAlert = ({ items = [], onOrderClick }) => {
  const [expanded, setExpanded] = useState(false);

  const getStockLevel = (current, min) => {
    const ratio = current / min;
    if (ratio <= 0.5) return 'critical';
    if (ratio <= 1) return 'low';
    if (ratio <= 2) return 'medium';
    return 'good';
  };

  const getStockStatusText = (level) => {
    const status = {
      critical: '🔴 Critical - Order Now!',
      low: '🟡 Low Stock',
      medium: '🟠 Getting Low',
      good: '🟢 In Stock'
    };
    return status[level] || level;
  };

  const criticalItems = items.filter(item => getStockLevel(item.current, item.min) === 'critical');
  const lowItems = items.filter(item => getStockLevel(item.current, item.min) === 'low');
  const otherItems = items.filter(item => !['critical', 'low'].includes(getStockLevel(item.current, item.min)));

  // Sort: critical first, then low, then others
  const sortedItems = [...criticalItems, ...lowItems, ...otherItems];

  if (!items || items.length === 0) {
    return (
      <div className="low-stock-alert success">
        <div className="alert-icon">✅</div>
        <div className="alert-content">
          <h4>All items are well-stocked!</h4>
          <p>No low stock items at the moment.</p>
        </div>
      </div>
    );
  }

  const hasLowStock = criticalItems.length > 0 || lowItems.length > 0;

  return (
    <div className="low-stock-alert-container">
      <div className={`low-stock-header ${hasLowStock ? 'has-alerts' : 'no-alerts'}`}>
        <div className="header-left">
          <span className="header-icon">⚠️</span>
          <div>
            <h4>Low Stock Alerts</h4>
            <p className="header-subtitle">
              {hasLowStock 
                ? `${criticalItems.length + lowItems.length} items need attention`
                : 'All items are well-stocked'}
            </p>
          </div>
        </div>
        {items.length > 3 && (
          <button 
            className="expand-btn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Show Less' : `Show All (${items.length})`}
          </button>
        )}
      </div>

      <div className={`stock-items ${expanded ? 'expanded' : 'collapsed'}`}>
        {sortedItems.slice(0, expanded ? items.length : 3).map((item, index) => {
          const level = getStockLevel(item.current, item.min);
          const isDanger = level === 'critical' || level === 'low';

          return (
            <div key={index} className={`stock-item ${level}`}>
              <div className="item-info">
                <div className="item-name">
                  <span className={`status-dot ${level}`} />
                  {item.name}
                  {item.sku && <span className="item-sku">#{item.sku}</span>}
                </div>
                <div className="item-stock">
                  <span className="stock-count">{item.current}</span>
                  <span className="stock-min">/ {item.min} min</span>
                </div>
              </div>
              <div className="item-actions">
                <span className="stock-status-text">{getStockStatusText(level)}</span>
                {isDanger && (
                  <button 
                    className="order-btn"
                    onClick={() => onOrderClick && onOrderClick(item)}
                  >
                    🛒 Order Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {!hasLowStock && (
        <div className="no-alerts-message">
          ✅ All products are within stock limits
        </div>
      )}
    </div>
  );
};

export default LowStockAlert;