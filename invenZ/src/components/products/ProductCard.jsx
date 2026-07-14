import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onEdit, onDelete, onView }) => {
  const getStockStatus = (current, min) => {
    if (current <= 0) return { label: 'Out of Stock', className: 'out-of-stock' };
    if (current <= min) return { label: 'Low Stock', className: 'low-stock' };
    return { label: 'In Stock', className: 'in-stock' };
  };

  const stockStatus = getStockStatus(product.currentStock, product.minStock);

  return (
    <div className="product-card">
      <div className="product-image">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <div className="product-placeholder">📦</div>
        )}
        <span className={`stock-badge ${stockStatus.className}`}>
          {stockStatus.label}
        </span>
      </div>

      <div className="product-info">
        <h4 className="product-name">{product.name}</h4>
        <p className="product-sku">SKU: {product.sku}</p>
        <p className="product-category">{product.category}</p>
        
        <div className="product-pricing">
          <span className="selling-price">Rs. {product.sellingPrice?.toLocaleString()}</span>
          <span className="purchase-price">Cost: Rs. {product.purchasePrice?.toLocaleString()}</span>
        </div>

        <div className="product-stock">
          <div className="stock-bar">
            <div 
              className={`stock-fill ${stockStatus.className}`}
              style={{ 
                width: `${Math.min((product.currentStock / product.maxStock) * 100, 100)}%` 
              }}
            />
          </div>
          <span className="stock-count">
            {product.currentStock} / {product.maxStock}
          </span>
        </div>
      </div>

      <div className="product-actions">
        <button className="btn-view" onClick={() => onView?.(product)}>👁️</button>
        <button className="btn-edit" onClick={() => onEdit?.(product)}>✏️</button>
        <button className="btn-delete" onClick={() => onDelete?.(product)}>🗑️</button>
      </div>
    </div>
  );
};

export default ProductCard;