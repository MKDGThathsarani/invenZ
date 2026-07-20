import React from 'react';
import './OrderDetails.css';

const OrderDetails = ({ order, onClose, onStatusChange }) => {
  if (!order) return null;

  const statusColors = {
    pending: 'warning',
    approved: 'info',
    shipped: 'primary',
    delivered: 'success',
    cancelled: 'danger'
  };

  const getStatusBadge = (status) => {
    return <span className={`status-badge ${statusColors[status] || 'default'}`}>{status}</span>;
  };

  return (
    <div className="order-details-overlay">
      <div className="order-details">
        <div className="order-details-header">
          <h2>Order #{order.orderNumber}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="order-details-body">
          <div className="order-info-grid">
            <div className="info-item">
              <label>Order Date</label>
              <span>{new Date(order.orderDate).toLocaleDateString()}</span>
            </div>
            <div className="info-item">
              <label>Status</label>
              {getStatusBadge(order.status)}
            </div>
            <div className="info-item">
              <label>Total Amount</label>
              <span className="total-amount">Rs. {order.totalAmount?.toLocaleString()}</span>
            </div>
            <div className="info-item">
              <label>Supplier</label>
              <span>{order.supplier}</span>
            </div>
          </div>

          <div className="order-items">
            <h4>Order Items</h4>
            <table className="items-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product}</td>
                    <td>{item.quantity}</td>
                    <td>Rs. {item.unitPrice?.toLocaleString()}</td>
                    <td>Rs. {item.total?.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {order.notes && (
            <div className="order-notes">
              <h4>Notes</h4>
              <p>{order.notes}</p>
            </div>
          )}
        </div>

        <div className="order-details-footer">
          {onStatusChange && (
            <div className="status-actions">
              <select 
                className="status-select"
                value={order.status}
                onChange={(e) => onStatusChange(order.id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          )}
          <button className="btn-print" onClick={() => window.print()}>🖨️ Print</button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;