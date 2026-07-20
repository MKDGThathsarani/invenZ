// src/context/OrderContext.jsx
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { orderService } from '../services';
import { useNotification } from './NotificationContext';

// Create Order Context
const OrderContext = createContext(null);

// Order Provider
export const OrderProvider = ({ children }) => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [salesOrders, setSalesOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderStats, setOrderStats] = useState(null);

  const { success, error: showError } = useNotification();

  // ============================================
  // PURCHASE ORDERS
  // ============================================

  const loadPurchaseOrders = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderService.getPurchaseOrders(params);
      setPurchaseOrders(response.data || []);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to load purchase orders');
      showError('Failed to load purchase orders');
      setLoading(false);
      throw err;
    }
  }, [showError]);

  const createPurchaseOrder = useCallback(async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderService.createPurchaseOrder(data);
      setPurchaseOrders(prev => [response.data, ...prev]);
      success('Purchase order created successfully!');
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to create purchase order');
      showError('Failed to create purchase order');
      setLoading(false);
      throw err;
    }
  }, [success, showError]);

  const updatePurchaseOrder = useCallback(async (id, data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderService.updatePurchaseOrder(id, data);
      setPurchaseOrders(prev => 
        prev.map(o => o.id === id ? { ...o, ...response.data } : o)
      );
      success('Purchase order updated successfully!');
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to update purchase order');
      showError('Failed to update purchase order');
      setLoading(false);
      throw err;
    }
  }, [success, showError]);

  const deletePurchaseOrder = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await orderService.deletePurchaseOrder(id);
      setPurchaseOrders(prev => prev.filter(o => o.id !== id));
      success('Purchase order deleted successfully!');
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message || 'Failed to delete purchase order');
      showError('Failed to delete purchase order');
      setLoading(false);
      throw err;
    }
  }, [success, showError]);

  const updatePurchaseOrderStatus = useCallback(async (id, status) => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderService.updatePurchaseOrderStatus(id, status);
      setPurchaseOrders(prev => 
        prev.map(o => o.id === id ? { ...o, status: response.data.status } : o)
      );
      success(`Order status updated to ${status}`);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to update order status');
      showError('Failed to update order status');
      setLoading(false);
      throw err;
    }
  }, [success, showError]);

  // ============================================
  // SALES ORDERS
  // ============================================

  const loadSalesOrders = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderService.getSalesOrders(params);
      setSalesOrders(response.data || []);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to load sales orders');
      showError('Failed to load sales orders');
      setLoading(false);
      throw err;
    }
  }, [showError]);

  const createSalesOrder = useCallback(async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderService.createSalesOrder(data);
      setSalesOrders(prev => [response.data, ...prev]);
      success('Sales order created successfully!');
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to create sales order');
      showError('Failed to create sales order');
      setLoading(false);
      throw err;
    }
  }, [success, showError]);

  const updateSalesOrder = useCallback(async (id, data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderService.updateSalesOrder(id, data);
      setSalesOrders(prev => 
        prev.map(o => o.id === id ? { ...o, ...response.data } : o)
      );
      success('Sales order updated successfully!');
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to update sales order');
      showError('Failed to update sales order');
      setLoading(false);
      throw err;
    }
  }, [success, showError]);

  const deleteSalesOrder = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await orderService.deleteSalesOrder(id);
      setSalesOrders(prev => prev.filter(o => o.id !== id));
      success('Sales order deleted successfully!');
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message || 'Failed to delete sales order');
      showError('Failed to delete sales order');
      setLoading(false);
      throw err;
    }
  }, [success, showError]);

  const updateSalesOrderStatus = useCallback(async (id, status) => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderService.updateSalesOrderStatus(id, status);
      setSalesOrders(prev => 
        prev.map(o => o.id === id ? { ...o, status: response.data.status } : o)
      );
      success(`Order status updated to ${status}`);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to update order status');
      showError('Failed to update order status');
      setLoading(false);
      throw err;
    }
  }, [success, showError]);

  // ============================================
  // ORDER STATISTICS
  // ============================================

  const loadOrderStats = useCallback(async () => {
    try {
      const response = await orderService.getOrderStats();
      setOrderStats(response.data);
      return response.data;
    } catch (err) {
      console.error('Failed to load order stats:', err);
      return null;
    }
  }, []);

  // Initialize data
  useEffect(() => {
    loadPurchaseOrders();
    loadSalesOrders();
    loadOrderStats();
  }, []);

  const value = {
    purchaseOrders,
    salesOrders,
    loading,
    error,
    orderStats,
    loadPurchaseOrders,
    createPurchaseOrder,
    updatePurchaseOrder,
    deletePurchaseOrder,
    updatePurchaseOrderStatus,
    loadSalesOrders,
    createSalesOrder,
    updateSalesOrder,
    deleteSalesOrder,
    updateSalesOrderStatus,
    loadOrderStats
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook to use order context
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

export default OrderContext;