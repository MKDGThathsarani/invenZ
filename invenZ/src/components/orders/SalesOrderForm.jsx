import React, { useState } from 'react';
import './PurchaseOrderForm.css';

const PurchaseOrderForm = ({ 
  initialData = null, 
  onSubmit, 
  onCancel,
  suppliers = [],
  products = []
}) => {
  const [formData, setFormData] = useState({
    supplierId: initialData?.supplierId || '',
    orderDate: initialData?.orderDate || new Date().toISOString().split('T')[0],
    expectedDelivery: initialData?.expectedDelivery || '',
    items: initialData?.items || [{ productId: '', quantity: 1, unitPrice: 0 }],
    notes: initialData?.notes || '',
    status: initialData?.status || 'pending'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    
    // Auto-calculate total
    if (field === 'quantity' || field === 'unitPrice') {
      updatedItems[index].total = (updatedItems[index].quantity || 0) * (updatedItems[index].unitPrice || 0);
    }
    
    setFormData(prev => ({ ...prev, items: updatedItems }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { productId: '', quantity: 1, unitPrice: 0, total: 0 }]
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length <= 1) return;
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, items: updatedItems }));
  };

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => sum + (item.total || 0), 0);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.supplierId) newErrors.supplierId = 'Supplier is required';
    if (!formData.orderDate) newErrors.orderDate = 'Order date is required';
    formData.items.forEach((item, index) => {
      if (!item.productId) newErrors[`item_${index}_product`] = 'Product is required';
      if (!item.quantity || item.quantity < 1) newErrors[`item_${index}_quantity`] = 'Quantity must be at least 1';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        totalAmount: calculateTotal()
      });
    }
  };

  return (
    <form className="purchase-order-form" onSubmit={handleSubmit}>
      <h3>{initialData ? 'Edit Purchase Order' : 'New Purchase Order'}</h3>

      <div className="form-grid">
        <div className="form-group">
          <label>Supplier *</label>
          <select
            name="supplierId"
            value={formData.supplierId}
            onChange={handleChange}
            className={errors.supplierId ? 'error' : ''}
          >
            <option value="">Select Supplier</option>
            {suppliers.map(supplier => (
              <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
            ))}
          </select>
          {errors.supplierId && <span className="error-text">{errors.supplierId}</span>}
        </div>

        <div className="form-group">
          <label>Order Date *</label>
          <input
            type="date"
            name="orderDate"
            value={formData.orderDate}
            onChange={handleChange}
            className={errors.orderDate ? 'error' : ''}
          />
          {errors.orderDate && <span className="error-text">{errors.orderDate}</span>}
        </div>

        <div className="form-group">
          <label>Expected Delivery</label>
          <input
            type="date"
            name="expectedDelivery"
            value={formData.expectedDelivery}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="shipped">Shipped</option>
            <option value="received">Received</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="items-section">
        <div className="items-header">
          <h4>Order Items</h4>
          <button type="button" className="btn-add-item" onClick={addItem}>+ Add Item</button>
        </div>

        {formData.items.map((item, index) => (
          <div key={index} className="item-row">
            <div className="item-fields">
              <div className="form-group">
                <label>Product *</label>
                <select
                  value={item.productId}
                  onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                  className={errors[`item_${index}_product`] ? 'error' : ''}
                >
                  <option value="">Select Product</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>{product.name}</option>
                  ))}
                </select>
                {errors[`item_${index}_product`] && <span className="error-text">{errors[`item_${index}_product`]}</span>}
              </div>

              <div className="form-group">
                <label>Quantity *</label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                  className={errors[`item_${index}_quantity`] ? 'error' : ''}
                />
                {errors[`item_${index}_quantity`] && <span className="error-text">{errors[`item_${index}_quantity`]}</span>}
              </div>

              <div className="form-group">
                <label>Unit Price</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                />
              </div>

              <div className="item-total">
                <label>Total</label>
                <span>Rs. {(item.total || 0).toLocaleString()}</span>
              </div>

              <button 
                type="button" 
                className="btn-remove-item"
                onClick={() => removeItem(index)}
                disabled={formData.items.length <= 1}
              >
                ✕
              </button>
            </div>
          </div>
        ))}

        <div className="order-total">
          <span>Order Total:</span>
          <span className="total-amount">Rs. {calculateTotal().toLocaleString()}</span>
        </div>
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="3"
          placeholder="Additional notes..."
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-submit">
          {initialData ? 'Update Order' : 'Create Order'}
        </button>
      </div>
    </form>
  );
};

export default PurchaseOrderForm;