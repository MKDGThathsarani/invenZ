import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupplier } from '../context/SupplierContext';
import { useNotification } from '../context/NotificationContext';
import SupplierForm from '../components/suppliers/SupplierForm';
import './AddSupplier.css';

const AddSupplier = () => {
  const navigate = useNavigate();
  const { createSupplier } = useSupplier();
  const { success, error } = useNotification();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      await createSupplier(data);
      success('Supplier added successfully!');
      navigate('/suppliers');
    } catch (err) {
      error(err.message || 'Failed to add supplier');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-supplier-page">
      <div className="page-header">
        <h1>🏢 Add New Supplier</h1>
        <p>Fill in the details to add a new supplier</p>
      </div>

      <SupplierForm
        onSubmit={handleSubmit}
        onCancel={() => navigate('/suppliers')}
        loading={loading}
      />
    </div>
  );
};

export default AddSupplier;