import api from './api';

export const orderService = {
  // ============================================
  // PURCHASE ORDERS
  // ============================================

  // Get all purchase orders
  getPurchaseOrders: async (params = {}) => {
    try {
      const response = await api.get('/orders/purchase', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch purchase orders' };
    }
  },

  // Get purchase order by ID
  getPurchaseOrderById: async (id) => {
    try {
      const response = await api.get(`/orders/purchase/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch purchase order' };
    }
  },

  // Create purchase order
  createPurchaseOrder: async (orderData) => {
    try {
      const response = await api.post('/orders/purchase', orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create purchase order' };
    }
  },

  // Update purchase order
  updatePurchaseOrder: async (id, orderData) => {
    try {
      const response = await api.put(`/orders/purchase/${id}`, orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update purchase order' };
    }
  },

  // Delete purchase order
  deletePurchaseOrder: async (id) => {
    try {
      const response = await api.delete(`/orders/purchase/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete purchase order' };
    }
  },

  // Update purchase order status
  updatePurchaseOrderStatus: async (id, status) => {
    try {
      const response = await api.patch(`/orders/purchase/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update order status' };
    }
  },

  // ============================================
  // SALES ORDERS
  // ============================================

  // Get all sales orders
  getSalesOrders: async (params = {}) => {
    try {
      const response = await api.get('/orders/sales', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch sales orders' };
    }
  },

  // Get sales order by ID
  getSalesOrderById: async (id) => {
    try {
      const response = await api.get(`/orders/sales/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch sales order' };
    }
  },

  // Create sales order
  createSalesOrder: async (orderData) => {
    try {
      const response = await api.post('/orders/sales', orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create sales order' };
    }
  },

  // Update sales order
  updateSalesOrder: async (id, orderData) => {
    try {
      const response = await api.put(`/orders/sales/${id}`, orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update sales order' };
    }
  },

  // Delete sales order
  deleteSalesOrder: async (id) => {
    try {
      const response = await api.delete(`/orders/sales/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete sales order' };
    }
  },

  // Update sales order status
  updateSalesOrderStatus: async (id, status) => {
    try {
      const response = await api.patch(`/orders/sales/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update order status' };
    }
  },

  // ============================================
  // ORDER STATISTICS
  // ============================================

  // Get order statistics
  getOrderStats: async () => {
    try {
      const response = await api.get('/orders/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch order statistics' };
    }
  },

  // Get recent orders
  getRecentOrders: async (limit = 10) => {
    try {
      const response = await api.get('/orders/recent', { params: { limit } });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch recent orders' };
    }
  }
};