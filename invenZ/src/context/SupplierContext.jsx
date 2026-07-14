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
      const response = await supplierService.getAll(params);
      setSuppliers(response.data || []);
      setTotalCount(response.total || response.data?.length || 0);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to load suppliers');
      showError('Failed to load suppliers');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showError]);

  // Get supplier by ID
  const getSupplier = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await supplierService.getById(id);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to get supplier');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create supplier
  const createSupplier = useCallback(async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await supplierService.create(data);
      setSuppliers(prev => [response.data, ...prev]);
      setTotalCount(prev => prev + 1);
      success('Supplier added successfully!');
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to create supplier');
      showError('Failed to create supplier');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [success, showError]);

  // Update supplier
  const updateSupplier = useCallback(async (id, data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await supplierService.update(id, data);
      setSuppliers(prev => 
        prev.map(s => s.id === id ? { ...s, ...response.data } : s)
      );
      success('Supplier updated successfully!');
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to update supplier');
      showError('Failed to update supplier');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [success, showError]);

  // Delete supplier
  const deleteSupplier = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await supplierService.delete(id);
      setSuppliers(prev => prev.filter(s => s.id !== id));
      setTotalCount(prev => prev - 1);
      success('Supplier deleted successfully!');
      return true;
    } catch (err) {
      setError(err.message || 'Failed to delete supplier');
      showError('Failed to delete supplier');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [success, showError]);

  // Load top rated suppliers
  const loadTopRated = useCallback(async () => {
    try {
      const response = await supplierService.getTopRated();
      setTopRated(response.data || []);
      return response.data;
    } catch (err) {
      console.error('Failed to load top rated:', err);
      return [];
    }
  }, []);

  // Search suppliers
  const searchSuppliers = useCallback(async (query) => {
    try {
      setLoading(true);
      const response = await supplierService.search(query);
      return response.data || [];
    } catch (err) {
      console.error('Search failed:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize data
  useEffect(() => {
    loadSuppliers();
    loadTopRated();
  }, [loadSuppliers, loadTopRated]);

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