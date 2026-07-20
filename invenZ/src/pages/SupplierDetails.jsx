import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSupplier } from '../context/SupplierContext';
import { useNotification } from '../context/NotificationContext';
import SupplierDetailsComponent from '../components/suppliers/SupplierDetails';
import './SupplierDetails.css';

const SupplierDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSupplier } = useSupplier();
  const { error } = useNotification();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSupplier = async () => {
      try {
        const data = await getSupplier(id);
        setSupplier(data);
      } catch (err) {
        error('Failed to load supplier');
        navigate('/suppliers');
      } finally {
        setLoading(false);
      }
    };
    loadSupplier();
  }, [id]);

  const handleEdit = () => {
    navigate(`/suppliers/edit/${id}`);
  };

  if (loading) {
    return <div className="loader-container">Loading...</div>;
  }

  return (
    <div className="supplier-details-page">
      <SupplierDetailsComponent
        supplier={supplier}
        onEdit={handleEdit}
        onClose={() => navigate('/suppliers')}
      />
    </div>
  );
};

export default SupplierDetails;