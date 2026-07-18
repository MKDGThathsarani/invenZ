// src/pages/Products.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import { useNotification } from '../context/NotificationContext';
import ProductList from '../components/products/ProductList';
import ProductForm from '../components/products/ProductForm';
import ProductDetails from '../components/products/ProductDetails';
import './Products.css';

const Products = () => {
  const navigate = useNavigate();
  const { 
    products, 
    categories, 
    loading, 
    loadProducts, 
    loadCategories,
    deleteProduct,
    createProduct,
    updateProduct,
    getProduct
  } = useProduct();
  
  const { success, error } = useNotification();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const handleAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleView = async (product) => {
    try {
      const data = await getProduct(product.id);
      setViewingProduct(data);
    } catch (err) {
      error('Failed to load product details');
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Are you sure you want to delete "${product.name}"?`)) return;
    try {
      await deleteProduct(product.id);
      success('Product deleted successfully!');
    } catch (err) {
      error('Failed to delete product');
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      setFormLoading(true);
      if (editingProduct) {
        await updateProduct(editingProduct.id, data);
        success('Product updated successfully!');
      } else {
        await createProduct(data);
        success('Product added successfully!');
      }
      setShowForm(false);
      setEditingProduct(null);
      await loadProducts();
    } catch (err) {
      error(err.message || 'Failed to save product');
    } finally {
      setFormLoading(false);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  if (viewingProduct) {
    return (
      <ProductDetails
        product={viewingProduct}
        onClose={() => setViewingProduct(null)}
        onEdit={() => {
          setViewingProduct(null);
          handleEdit(viewingProduct);
        }}
      />
    );
  }

  if (showForm) {
    return (
      <div className="products-page">
        <div className="page-header">
          <h1>{editingProduct ? '✏️ Edit Product' : '📦 Add New Product'}</h1>
          <p>{editingProduct ? 'Update product details' : 'Fill in the details to add a new product'}</p>
        </div>
        <ProductForm
          initialData={editingProduct}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          categories={categories}
          loading={formLoading}
        />
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="page-header">
        <div>
          <h1>📦 Products</h1>
          <p>Manage your product inventory</p>
        </div>
        <button className="btn-primary" onClick={handleAdd}>
          + Add Product
        </button>
      </div>

      <ProductList
        products={products || []}
        loading={loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        categories={categories}
      />
    </div>
  );
};

export default Products;