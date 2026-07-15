import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import { useNotification } from '../context/NotificationContext';
import ProductList from '../components/products/ProductList';
import './Products.css';

const Products = () => {
  const navigate = useNavigate();
  const { products, loading, loadProducts, deleteProduct } = useProduct();
  const { success, error } = useNotification();

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (product) => {
    if (!window.confirm(`Are you sure you want to delete "${product.name}"?`)) return;
    try {
      await deleteProduct(product.id);
      success('Product deleted successfully!');
    } catch (err) {
      error('Failed to delete product');
    }
  };

  const handleAdd = () => navigate('/products/add');
  const handleEdit = (product) => navigate(`/products/edit/${product.id}`);
  const handleView = (product) => navigate(`/products/${product.id}`);

  return (
    <div className="products-page">
      <div className="page-header">
        <h1>📦 Products</h1>
        <p>Manage your product inventory</p>
      </div>

      <ProductList
        products={products || []}
        loading={loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />
    </div>
  );
};

export default Products;