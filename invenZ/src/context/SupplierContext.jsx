// src/context/SupplierContext.jsx
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { supplierService } from '../services';
import { useNotification } from './NotificationContext';

// Create Supplier Context
const SupplierContext = createContext(null);

// Supplier Provider
export const SupplierProvider = ({ children }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [topRated, setTopRated] = useState([]);

  const { success, error: showError } = useNotification();

  // Load all suppliers
  const loadSuppliers = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const suppliers = await supplierService.getSuppliers(params);
      setSuppliers(suppliers || []);
      setTotalCount(suppliers?.length || 0);
      setLoading(false); // ✅ FIXED: Success වුනාම loading false වෙන්න ඕන!
      return suppliers;
    } catch (err) {
      setError(err.message || 'Failed to load suppliers');
      showError('Failed to load suppliers');
      setLoading(false);
      throw err;
    }
  }, [showError]);

  // Get supplier by ID
  const getSupplier = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const supplier = await supplierService.getSupplierById(id);
      setLoading(false);
      return supplier;
    } catch (err) {
      setError(err.message || 'Failed to get supplier');
      setLoading(false);
      throw err;
    }
  }, []);

  // Create supplier
  const createSupplier = useCallback(async (data) => {
    try {
      setLoading(true);
      setError(null);
      const supplier = await supplierService.addSupplier(data);
      setSuppliers(prev => [supplier, ...prev]);
      setTotalCount(prev => prev + 1);
      success('Supplier added successfully!');
      setLoading(false);
      return supplier;
    } catch (err) {
      setError(err.message || 'Failed to create supplier');
      showError('Failed to create supplier');
      setLoading(false);
      throw err;
    }
  }, [success, showError]);

  // Update supplier
  const updateSupplier = useCallback(async (id, data) => {
    try {
      setLoading(true);
      setError(null);
      const supplier = await supplierService.updateSupplier(id, data);
      setSuppliers(prev => 
        prev.map(s => s.id === id ? { ...s, ...supplier } : s)
      );
      success('Supplier updated successfully!');
      setLoading(false);
      return supplier;
    } catch (err) {
      setError(err.message || 'Failed to update supplier');
      showError('Failed to update supplier');
      setLoading(false);
      throw err;
    }
  }, [success, showError]);

  // Delete supplier
  const deleteSupplier = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await supplierService.deleteSupplier(id);
      setSuppliers(prev => prev.filter(s => s.id !== id));
      setTotalCount(prev => prev - 1);
      success('Supplier deleted successfully!');
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message || 'Failed to delete supplier');
      showError('Failed to delete supplier');
      setLoading(false);
      throw err;
    }
  }, [success, showError]);

  // Load top rated suppliers
  const loadTopRated = useCallback(async () => {
    try {
      const topRatedList = await supplierService.getTopRatedSuppliers();
      setTopRated(topRatedList || []);
      return topRatedList;
    } catch (err) {
      console.error('Failed to load top rated:', err);
      return [];
    }
  }, []);

  // Search suppliers
  const searchSuppliers = useCallback(async (query) => {
    try {
      setLoading(true);
      const results = await supplierService.getSuppliers({ search: query });
      setLoading(false);
      return results || [];
    } catch (err) {
      console.error('Search failed:', err);
      setLoading(false);
      return [];
    }
  }, []);

  // Initialize data
  useEffect(() => {
    loadSuppliers();
    loadTopRated();
  }, []);

  const value = {
    suppliers,
    loading,
    error,
    totalCount,
    topRated,
    loadSuppliers,
    getSupplier,
    createSupplier,
    updateSupplier,
    deleteSupplier,
    loadTopRated,
    searchSuppliers
  };

  return (
    <SupplierContext.Provider value={value}>
      {children}
    </SupplierContext.Provider>
  );
};

// Custom hook to use supplier context
export const useSupplier = () => {
  const context = useContext(SupplierContext);
  if (!context) {
    throw new Error('useSupplier must be used within a SupplierProvider');
  }
  return context;
};

export default SupplierContext;