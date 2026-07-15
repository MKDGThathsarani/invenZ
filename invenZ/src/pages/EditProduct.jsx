import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import { useNotification } from '../context/NotificationContext';
import ProductForm from '../components/products/ProductForm';
import './EditProduct.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProduct, updateProduct, loading: contextLoading } = useProduct();
  const { success, error } = useNotification();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'cat1', name: 'Electronics' },
    { id: 'cat2', name: 'Food' },
    { id: 'cat3', name: 'Clothing' }
  ];

  const suppliers = [
    { id: 'sup1', name: 'Tech Distributors' },
    { id: 'sup2', name: 'Food Supply Co.' }
  ];

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (err) {
        error('Failed to load product');
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      await updateProduct(id, data);
      success('Product updated successfully!');
      navigate('/products');
    } catch (err) {
      error(err.message || 'Failed to update product');
    }
  };

  if (loading || contextLoading) {
    return <div className="loader-container">Loading...</div>;
  }

  return (
    <div className="edit-product-page">
      <div className="page-header">
        <h1>✏️ Edit Product</h1>
        <p>Update product details</p>
      </div>

      <ProductForm
        initialData={product}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/products')}
        categories={categories}
        suppliers={suppliers}
      />
    </div>
  );
};

export default EditProduct;