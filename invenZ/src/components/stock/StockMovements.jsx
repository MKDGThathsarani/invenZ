import React, { useState } from 'react';
import './StockMovements.css';

const StockMovements = ({ movements = [] }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMovements = movements.filter(m => {
    const matchesFilter = filter === 'all' || m.type === filter;
    const matchesSearch = m.product?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         m.reference?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getTypeBadge = (type) => {
    const types = {
      in: { label: 'IN', className: 'type-in' },
      out: { label: 'OUT', className: 'type-out' },
      adjustment: { label: 'ADJ', className: 'type-adj' }
    };
    return types[type] || types.in;
  };

  return (
    <div className="stock-movements">
      <div className="movements-header">
        <h3>📊 Stock Movements</h3>
        <div className="movements-filters">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="in">IN</option>
            <option value="out">OUT</option>
            <option value="adjustment">Adjustment</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        {filteredMovements.length === 0 ? (
          <div className="empty-state">📭 No movements found</div>
        ) : (
          <table className="movements-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Product</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Reference</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovements.map((movement, index) => {
                const badge = getTypeBadge(movement.type);
                return (
                  <tr key={index}>
                    <td>{new Date(movement.date).toLocaleDateString()}</td>
                    <td className="product-name">{movement.product}</td>
                    <td><span className={`type-badge ${badge.className}`}>{badge.label}</span></td>
                    <td className={`quantity ${movement.type === 'out' ? 'negative' : 'positive'}`}>
                      {movement.type === 'out' ? '-' : '+'}{movement.quantity}
                    </td>
                    <td>{movement.reference || '-'}</td>
                    <td>{movement.user || '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StockMovements;