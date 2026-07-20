import React from 'react';
import './SupplierDetails.css';

const SupplierDetails = ({ supplier, onClose, onEdit }) => {
  if (!supplier) return null;

  return (
    <div className="supplier-details-overlay">
      <div className="supplier-details">
        <div className="details-header">
          <h2>🏢 {supplier.name}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="details-body">
          <div className="details-grid">
            <div className="detail-item">
              <label>Contact Person</label>
              <span>{supplier.contactPerson || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <label>Email</label>
              <span>{supplier.email || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <label>Phone</label>
              <span>{supplier.phone || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <label>Website</label>
              <span>{supplier.website || 'N/A'}</span>
            </div>
          </div>

          <div className="detail-item full">
            <label>Address</label>
            <span>{supplier.address || 'N/A'}</span>
          </div>

          <div className="detail-item">
            <label>Tax Number</label>
            <span>{supplier.taxNumber || 'N/A'}</span>
          </div>

          <div className="detail-item">
            <label>Rating</label>
            <span className="rating">⭐ {supplier.rating || 0}/5</span>
          </div>

          {supplier.products && supplier.products.length > 0 && (
            <div className="supplier-products">
              <h4>Supplied Products</h4>
              <div className="product-tags">
                {supplier.products.map((product, index) => (
                  <span key={index} className="product-tag">{product}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="details-footer">
          <button className="btn-edit" onClick={() => onEdit?.(supplier)}>✏️ Edit</button>
          <button className="btn-close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetails;