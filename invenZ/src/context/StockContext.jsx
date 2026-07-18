// src/context/StockContext.jsx
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { stockService } from '../services';
import { useNotification } from './NotificationContext';

// Create Stock Context
const StockContext = createContext(null);

// Stock Provider
export const StockProvider = ({ children }) => {
  const [stockOverview, setStockOverview] = useState(null);
  const [movements, setMovements] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [outOfStockItems, setOutOfStockItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { success, error: showError } = useNotification();

  // Load stock overview
  const loadStockOverview = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await stockService.getStockOverview();
      setStockOverview(response.data);
      setLoading(false); // ✅ FIXED: Success වුනාම loading false වෙන්න ඕන!
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to load stock overview');
      showError('Failed to load stock overview');
      setLoading(false);
      throw err;
    }
  }, [showError]);

  // Load stock movements
  const loadMovements = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await stockService.getStockMovements(params);
      setMovements(response.data || []);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to load movements');
      showError('Failed to load movements');
      setLoading(false);
      throw err;
    }
  }, [showError]);

  // Load low stock items
  const loadLowStock = useCallback(async () => {
    try {
      const response = await stockService.getLowStock();
      setLowStockItems(response.data || []);
      return response.data;
    } catch (err) {
      console.error('Failed to load low stock:', err);
      return [];
    }
  }, []);

  // Load out of stock items
  const loadOutOfStock = useCallback(async () => {
    try {
      const response = await stockService.getOutOfStock();
      setOutOfStockItems(response.data || []);
      return response.data;
    } catch (err) {
      console.error('Failed to load out of stock:', err);
      return [];
    }
  }, []);

  // Add stock
  const addStock = useCallback(async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await stockService.addStock(data);
      success('Stock added successfully!');
      await loadStockOverview();
      await loadLowStock();
      await loadOutOfStock();
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to add stock');
      showError('Failed to add stock');
      setLoading(false);
      throw err;
    }
  }, [success, showError, loadStockOverview, loadLowStock, loadOutOfStock]);

  // Remove stock
  const removeStock = useCallback(async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await stockService.removeStock(data);
      success('Stock removed successfully!');
      await loadStockOverview();
      await loadLowStock();
      await loadOutOfStock();
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to remove stock');
      showError('Failed to remove stock');
      setLoading(false);
      throw err;
    }
  }, [success, showError, loadStockOverview, loadLowStock, loadOutOfStock]);

  // Adjust stock
  const adjustStock = useCallback(async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await stockService.adjustStock(data);
      success('Stock adjusted successfully!');
      await loadStockOverview();
      await loadLowStock();
      await loadOutOfStock();
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to adjust stock');
      showError('Failed to adjust stock');
      setLoading(false);
      throw err;
    }
  }, [success, showError, loadStockOverview, loadLowStock, loadOutOfStock]);

  // Initialize data
  useEffect(() => {
    loadStockOverview();
    loadMovements();
    loadLowStock();
    loadOutOfStock();
  }, []);

  const value = {
    stockOverview,
    movements,
    lowStockItems,
    outOfStockItems,
    loading,
    error,
    loadStockOverview,
    loadMovements,
    loadLowStock,
    loadOutOfStock,
    addStock,
    removeStock,
    adjustStock
  };

  return (
    <StockContext.Provider value={value}>
      {children}
    </StockContext.Provider>
  );
};

// Custom hook to use stock context
export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStock must be used within a StockProvider');
  }
  return context;
};

export default StockContext;