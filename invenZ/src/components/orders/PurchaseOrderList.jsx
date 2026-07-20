import React, { useState } from 'react';
import './PurchaseOrderList.css';

const PurchaseOrderList = ({ orders = [], onView, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const statusColors = {
    pending: 'warning',
    approved: 'info',
    shipped: 'primary',
    received: 'success',
    cancelled: 'danger'
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.supplier?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    return <span className={`status-badge ${statusColors[status] || 'default'}`}>{status}</span>;
  };

  return (
    <div className="purchase-order-list">
      <div className="list-header">
        <h3>📦 Purchase Orders</h3>
        <button className="btn-add">+ New Order</button>
      </div>

      <div className="list-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        <select 
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="shipped">Shipped</option>
          <option value="received">Received</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="table-container">
        {filteredOrders.length === 0 ? (
          <div className="empty-state">
            <p>📭 No purchase orders found</p>
          </div>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Supplier</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="order-number">{order.orderNumber}</td>
                  <td>{order.supplier}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className="total-amount">Rs. {order.totalAmount?.toLocaleString()}</td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-view" onClick={() => onView?.(order)}>👁️</button>
                      <button className="btn-edit" onClick={() => onEdit?.(order)}>✏️</button>
                      <button className="btn-delete" onClick={() => onDelete?.(order)}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PurchaseOrderList;