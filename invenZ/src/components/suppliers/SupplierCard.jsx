import React from 'react';
import './SupplierCard.css';

const SupplierCard = ({ supplier, onEdit, onDelete, onView }) => {
  const getRatingStars = (rating) => {
    return '⭐'.repeat(Math.round(rating || 0)) + '☆'.repeat(5 - Math.round(rating || 0));
  };

  return (
    <div className="supplier-card">
      <div className="supplier-header">
        <div className="supplier-avatar">
          {supplier.name?.charAt(0)}
        </div>
        <div className="supplier-info">
          <h4>{supplier.name}</h4>
          <div className="rating">{getRatingStars(supplier.rating)}</div>
        </div>
      </div>

      <div className="supplier-details">
        <p className="contact-person">👤 {supplier.contactPerson || 'N/A'}</p>
        <p className="email">📧 {supplier.email || 'N/A'}</p>
        <p className="phone">📞 {supplier.phone || 'N/A'}</p>
        <p className="address">📍 {supplier.address || 'N/A'}</p>
      </div>

      <div className="supplier-actions">
        <button className="btn-view" onClick={() => onView?.(supplier)}>👁️</button>
        <button className="btn-edit" onClick={() => onEdit?.(supplier)}>✏️</button>
        <button className="btn-delete" onClick={() => onDelete?.(supplier)}>🗑️</button>
      </div>
    </div>
  );
};

export default SupplierCard;