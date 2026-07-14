import React from 'react';
import './LowStockList.css';

const LowStockList = ({ items = [], onOrderClick }) => {
  const getLevel = (current, min) => {
    const ratio = current / min;
    if (ratio <= 0.3) return 'critical';
    if (ratio <= 0.7) return 'low';
    if (ratio <= 1) return 'medium';
    return 'good';
  };

  const sortedItems = [...items].sort((a, b) => {
    const levelA = getLevel(a.currentStock, a.minStock);
    const levelB = getLevel(b.currentStock, b.minStock);
    const order = { critical: 0, low: 1, medium: 2, good: 3 };
    return order[levelA] - order[levelB];
  });

  return (
    <div className="low-stock-list">
      <div className="list-header">
        <h3>⚠️ Low Stock Items</h3>
        <span className="item-count">{items.filter(i => getLevel(i.currentStock, i.minStock) !== 'good').length} items</span>
      </div>

      {sortedItems.length === 0 ? (
        <div className="empty-state">✅ All items are well-stocked</div>
      ) : (
        <div className="items-container">
          {sortedItems.map((item, index) => {
            const level = getLevel(item.currentStock, item.minStock);
            const isLow = level === 'critical' || level === 'low';

            return (
              <div key={index} className={`stock-item ${level}`}>
                <div className="item-info">
                  <div className="item-name">
                    <span className={`status-dot ${level}`} />
                    {item.name}
                    <span className="item-sku">#{item.sku}</span>
                  </div>
                  <div className="stock-level">
                    <span className="stock-value">{item.currentStock}</span>
                    <span className="stock-min">/ {item.minStock}</span>
                  </div>
                </div>
                <div className="item-actions">
                  <span className="status-label">{level.toUpperCase()}</span>
                  {isLow && (
                    <button 
                      className="order-btn"
                      onClick={() => onOrderClick?.(item)}
                    >
                      🛒 Order
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LowStockList;