import React, { useState } from 'react';
import './ProductForm.css';

const ProductForm = ({
  initialData = null,
  onSubmit,
  onCancel,
  categories = [],
  suppliers = []
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    sku: initialData?.sku || '',
    categoryId: initialData?.categoryId || '',
    supplierId: initialData?.supplierId || '',
    description: initialData?.description || '',
    purchasePrice: initialData?.purchasePrice || '',
    sellingPrice: initialData?.sellingPrice || '',
    currentStock: initialData?.currentStock || 0,
    minStock: initialData?.minStock || 5,
    maxStock: initialData?.maxStock || 100,
    unit: initialData?.unit || 'pcs'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.sku.trim()) newErrors.sku = 'SKU is required';
    if (!formData.categoryId) newErrors.categoryId = 'Category is required';
    if (!formData.supplierId) newErrors.supplierId = 'Supplier is required';
    if (formData.purchasePrice < 0) newErrors.purchasePrice = 'Price cannot be negative';
    if (formData.sellingPrice < 0) newErrors.sellingPrice = 'Price cannot be negative';
    if (formData.minStock < 0) newErrors.minStock = 'Min stock cannot be negative';
    if (formData.maxStock < formData.minStock) newErrors.maxStock = 'Max stock must be greater than min stock';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        purchasePrice: parseFloat(formData.purchasePrice) || 0,
        sellingPrice: parseFloat(formData.sellingPrice) || 0,
        currentStock: parseInt(formData.currentStock) || 0,
        minStock: parseInt(formData.minStock) || 0,
        maxStock: parseInt(formData.maxStock) || 0
      });
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h3>{initialData ? 'Edit Product' : 'Add New Product'}</h3>

      <div className="form-grid">
        <div className="form-group">
          <label>Product Name *</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            placeholder="Enter product name"
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>SKU *</label>
          <input
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            className={errors.sku ? 'error' : ''}
            placeholder="Enter SKU"
          />
          {errors.sku && <span className="error-text">{errors.sku}</span>}
        </div>

        <div className="form-group">
          <label>Category *</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className={errors.categoryId ? 'error' : ''}
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          {errors.categoryId && <span className="error-text">{errors.categoryId}</span>}
        </div>

        <div className="form-group">
          <label>Supplier *</label>
          <select
            name="supplierId"
            value={formData.supplierId}
            onChange={handleChange}
            className={errors.supplierId ? 'error' : ''}
          >
            <option value="">Select Supplier</option>
            {suppliers.map(sup => (
              <option key={sup.id} value={sup.id}>{sup.name}</option>
            ))}
          </select>
          {errors.supplierId && <span className="error-text">{errors.supplierId}</span>}
        </div>
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          placeholder="Product description..."
        />
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Purchase Price (Rs.)</label>
          <input
            type="number"
            name="purchasePrice"
            value={formData.purchasePrice}
            onChange={handleChange}
            min="0"
            step="0.01"
            className={errors.purchasePrice ? 'error' : ''}
          />
          {errors.purchasePrice && <span className="error-text">{errors.purchasePrice}</span>}
        </div>

        <div className="form-group">
          <label>Selling Price (Rs.)</label>
          <input
            type="number"
            name="sellingPrice"
            value={formData.sellingPrice}
            onChange={handleChange}
            min="0"
            step="0.01"
            className={errors.sellingPrice ? 'error' : ''}
          />
          {errors.sellingPrice && <span className="error-text">{errors.sellingPrice}</span>}
        </div>

        <div className="form-group">
          <label>Current Stock</label>
          <input
            type="number"
            name="currentStock"
            value={formData.currentStock}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Unit</label>
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
          >
            <option value="pcs">Pieces (pcs)</option>
            <option value="kg">Kilogram (kg)</option>
            <option value="g">Gram (g)</option>
            <option value="l">Liter (l)</option>
            <option value="ml">Milliliter (ml)</option>
            <option value="box">Box</option>
            <option value="pack">Pack</option>
          </select>
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Min Stock Level</label>
          <input
            type="number"
            name="minStock"
            value={formData.minStock}
            onChange={handleChange}
            min="0"
            className={errors.minStock ? 'error' : ''}
          />
          {errors.minStock && <span className="error-text">{errors.minStock}</span>}
        </div>

        <div className="form-group">
          <label>Max Stock Level</label>
          <input
            type="number"
            name="maxStock"
            value={formData.maxStock}
            onChange={handleChange}
            min="0"
            className={errors.maxStock ? 'error' : ''}
          />
          {errors.maxStock && <span className="error-text">{errors.maxStock}</span>}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-submit">
          {initialData ? 'Update Product' : 'Add Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;