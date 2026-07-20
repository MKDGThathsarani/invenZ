// src/components/products/ProductDetails.jsx
import React from 'react';
import './ProductDetails.css';

const ProductDetails = ({ product, onClose, onEdit }) => {
  if (!product) return null;

  const getStockStatus = (current, min) => {
    const ratio = current / min;
    if (current <= 0) return { label: 'Out of Stock', className: 'out-of-stock' };
    if (ratio <= 0.5) return { label: 'Critical', className: 'critical' };
    if (ratio <= 1) return { label: 'Low Stock', className: 'low-stock' };
    return { label: 'In Stock', className: 'in-stock' };
  };

  const stockStatus = getStockStatus(product.currentStock, product.minStock);

  return (
    <div className="product-details-overlay">
      <div className="product-details">
        <div className="details-header">
          <h2>📦 {product.name}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="details-body">
          <div className="details-grid">
            <div className="detail-item">
              <label>SKU</label>
              <span>{product.sku}</span>
            </div>
            <div className="detail-item">
              <label>Category</label>
              <span>{product.category}</span>
            </div>
            <div className="detail-item">
              <label>Supplier</label>
              <span>{product.supplier || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <label>Unit</label>
              <span>{product.unit}</span>
            </div>
          </div>

          {product.description && (
            <div className="detail-description">
              <h4>Description</h4>
              <p>{product.description}</p>
            </div>
          )}

          <div className="pricing-section">
            <div className="price-card">
              <label>Purchase Price</label>
              <span>Rs. {product.purchasePrice?.toLocaleString() || '0'}</span>
            </div>
            <div className="price-card">
              <label>Selling Price</label>
              <span className="selling">Rs. {product.sellingPrice?.toLocaleString() || '0'}</span>
            </div>
            <div className="price-card profit">
              <label>Profit Margin</label>
              <span>
                {product.sellingPrice - product.purchasePrice > 0 ? '+' : ''}
                Rs. {(product.sellingPrice - product.purchasePrice)?.toLocaleString() || '0'}
              </span>
            </div>
          </div>

          <div className="stock-section">
            <h4>Stock Status</h4>
            <div className="stock-details">
              <div className="stock-info">
                <label>Current Stock</label>
                <span className={`stock-value ${stockStatus.className}`}>
                  {product.currentStock}
                </span>
              </div>
              <div className="stock-info">
                <label>Min Stock</label>
                <span>{product.minStock}</span>
              </div>
              <div className="stock-info">
                <label>Max Stock</label>
                <span>{product.maxStock}</span>
              </div>
            </div>
            <div className="stock-bar">
              <div 
                className={`stock-fill ${stockStatus.className}`}
                style={{ width: `${(product.currentStock / product.maxStock) * 100}%` }}
              />
            </div>
            <div className="stock-status-label">
              <span className={`status-badge ${stockStatus.className}`}>
                {stockStatus.label}
              </span>
            </div>
          </div>
        </div>

        <div className="details-footer">
          <button className="btn-edit" onClick={onEdit}>✏️ Edit Product</button>
          <button className="btn-close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;