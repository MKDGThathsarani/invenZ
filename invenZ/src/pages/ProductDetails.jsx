import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import { useNotification } from '../context/NotificationContext';
import ProductDetailsComponent from '../components/products/ProductDetails';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProduct } = useProduct();
  const { error } = useNotification();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleEdit = () => {
    navigate(`/products/edit/${id}`);
  };

  if (loading) {
    return <div className="loader-container">Loading...</div>;
  }

  return (
    <div className="product-details-page">
      <ProductDetailsComponent
        product={product}
        onEdit={handleEdit}
        onClose={() => navigate('/products')}
      />
    </div>
  );
};

export default ProductDetails;