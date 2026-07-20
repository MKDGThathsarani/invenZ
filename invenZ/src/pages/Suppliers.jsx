import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupplier } from '../context/SupplierContext';
import { useNotification } from '../context/NotificationContext';
import SupplierList from '../components/suppliers/SupplierList';
import './Suppliers.css';

const Suppliers = () => {
  const navigate = useNavigate();
  const { suppliers, loading, loadSuppliers, deleteSupplier } = useSupplier();
  const { success, error } = useNotification();

  useEffect(() => {
    loadSuppliers();
  }, []);

  const handleDelete = async (supplier) => {
    if (!window.confirm(`Are you sure you want to delete "${supplier.name}"?`)) return;
    try {
      await deleteSupplier(supplier.id);
      success('Supplier deleted successfully!');
    } catch (err) {
      error('Failed to delete supplier');
    }
  };

  const handleAdd = () => navigate('/suppliers/add');
  const handleEdit = (supplier) => navigate(`/suppliers/edit/${supplier.id}`);
  const handleView = (supplier) => navigate(`/suppliers/${supplier.id}`);

  return (
    <div className="suppliers-page">
      <div className="page-header">
        <h1>🏢 Suppliers</h1>
        <p>Manage your supplier relationships</p>
      </div>

      <SupplierList
        suppliers={suppliers || []}
        loading={loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />
    </div>
  );
};

export default Suppliers;