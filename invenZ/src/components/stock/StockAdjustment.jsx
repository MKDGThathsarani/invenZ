import React, { useState } from 'react';
import './StockAdjustment.css';

const StockAdjustment = ({ 
  products = [], 
  onAdjust,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    productId: '',
    type: 'in',
    quantity: 1,
    reason: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.productId) newErrors.productId = 'Product is required';
    if (!formData.quantity || formData.quantity < 1) newErrors.quantity = 'Quantity must be at least 1';
    if (!formData.reason) newErrors.reason = 'Reason is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const selectedProduct = products.find(p => p.id === formData.productId);
      onAdjust({
        ...formData,
        productName: selectedProduct?.name || '',
        currentStock: selectedProduct?.currentStock || 0,
        newStock: formData.type === 'in' 
          ? (selectedProduct?.currentStock || 0) + parseInt(formData.quantity)
          : (selectedProduct?.currentStock || 0) - parseInt(formData.quantity)
      });
    }
  };

  const selectedProduct = products.find(p => p.id === formData.productId);

  return (
    <div className="stock-adjustment">
      <h3>⚖️ Stock Adjustment</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product *</label>
          <select
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            className={errors.productId ? 'error' : ''}
          >
            <option value="">Select Product</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name} (Stock: {product.currentStock})
              </option>
            ))}
          </select>
          {errors.productId && <span className="error-text">{errors.productId}</span>}
        </div>

        {selectedProduct && (
          <div className="current-stock-info">
            <span>Current Stock: <strong>{selectedProduct.currentStock}</strong></span>
            <span>Min Level: {selectedProduct.minStock}</span>
            <span>Max Level: {selectedProduct.maxStock}</span>
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label>Adjustment Type *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="in">📥 Add Stock (IN)</option>
              <option value="out">📤 Remove Stock (OUT)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Quantity *</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              className={errors.quantity ? 'error' : ''}
            />
            {errors.quantity && <span className="error-text">{errors.quantity}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Reason *</label>
          <select
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className={errors.reason ? 'error' : ''}
          >
            <option value="">Select Reason</option>
            <option value="stock_count">Stock Count</option>
            <option value="damage">Damaged Items</option>
            <option value="return">Return</option>
            <option value="expiry">Expired Items</option>
            <option value="other">Other</option>
          </select>
          {errors.reason && <span className="error-text">{errors.reason}</span>}
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="2"
            placeholder="Additional notes..."
          />
        </div>

        {selectedProduct && formData.quantity && (
          <div className="adjustment-preview">
            <div className="preview-item">
              <span>Current Stock:</span>
              <span>{selectedProduct.currentStock}</span>
            </div>
            <div className="preview-item">
              <span>Adjustment:</span>
              <span className={formData.type === 'in' ? 'positive' : 'negative'}>
                {formData.type === 'in' ? '+' : '-'}{formData.quantity}
              </span>
            </div>
            <div className="preview-item total">
              <span>New Stock:</span>
              <span>
                {formData.type === 'in' 
                  ? selectedProduct.currentStock + parseInt(formData.quantity)
                  : selectedProduct.currentStock - parseInt(formData.quantity)}
              </span>
            </div>
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn-submit">Apply Adjustment</button>
        </div>
      </form>
    </div>
  );
};

export default StockAdjustment;