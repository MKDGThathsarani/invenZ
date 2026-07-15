import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import { useNotification } from '../context/NotificationContext';
import ProductForm from '../components/products/ProductForm';
import './AddProduct.css';

const AddProduct = () => {
  const navigate = useNavigate();
  const { createProduct } = useProduct();
  const { success, error } = useNotification();
  const [loading, setLoading] = useState(false);

  // Mock data - replace with actual data from context
  const categories = [
    { id: 'cat1', name: 'Electronics' },
    { id: 'cat2', name: 'Food' },
    { id: 'cat3', name: 'Clothing' }
  ];

  const suppliers = [
    { id: 'sup1', name: 'Tech Distributors' },
    { id: 'sup2', name: 'Food Supply Co.' }
  ];

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      await createProduct(data);
      success('Product added successfully!');
      navigate('/products');
    } catch (err) {
      error(err.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page">
      <div className="page-header">
        <h1>📦 Add New Product</h1>
        <p>Fill in the details to add a new product to inventory</p>
      </div>

      <ProductForm
        onSubmit={handleSubmit}
        onCancel={() => navigate('/products')}
        categories={categories}
        suppliers={suppliers}
        loading={loading}
      />
    </div>
  );
};

export default AddProduct;