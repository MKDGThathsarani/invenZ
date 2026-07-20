import api from './api';

export const stockService = {
  // ============================================
  // STOCK OVERVIEW
  // ============================================

  // Get stock overview
  getStockOverview: async () => {
    try {
      const response = await api.get('/stock/overview');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch stock overview' };
    }
  },

  // Get stock by product ID
  getStockByProduct: async (productId) => {
    try {
      const response = await api.get(`/stock/product/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch product stock' };
    }
  },

  // Get all stock items
  getAllStock: async (params = {}) => {
    try {
      const response = await api.get('/stock', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch stock' };
    }
  },

  // ============================================
  // STOCK MOVEMENTS
  // ============================================

  // Get stock movements
  getStockMovements: async (params = {}) => {
    try {
      const response = await api.get('/stock/movements', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch stock movements' };
    }
  },

  // Get stock movements by product
  getProductMovements: async (productId, params = {}) => {
    try {
      const response = await api.get(`/stock/movements/product/${productId}`, { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch product movements' };
    }
  },

  // Get recent stock movements
  getRecentMovements: async (limit = 10) => {
    try {
      const response = await api.get('/stock/movements/recent', { params: { limit } });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch recent movements' };
    }
  },

  // ============================================
  // STOCK ADJUSTMENTS
  // ============================================

  // Add stock (IN)
  addStock: async (data) => {
    try {
      const response = await api.post('/stock/add', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to add stock' };
    }
  },

  // Remove stock (OUT)
  removeStock: async (data) => {
    try {
      const response = await api.post('/stock/remove', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to remove stock' };
    }
  },

  // Adjust stock
  adjustStock: async (data) => {
    try {
      const response = await api.post('/stock/adjust', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to adjust stock' };
    }
  },

  // Bulk stock adjustment
  bulkAdjustStock: async (adjustments) => {
    try {
      const response = await api.post('/stock/bulk-adjust', { adjustments });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to bulk adjust stock' };
    }
  },

  // ============================================
  // LOW STOCK
  // ============================================

  // Get low stock items
  getLowStock: async () => {
    try {
      const response = await api.get('/stock/low-stock');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch low stock items' };
    }
  },

  // Get out of stock items
  getOutOfStock: async () => {
    try {
      const response = await api.get('/stock/out-of-stock');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch out of stock items' };
    }
  },

  // Get stock alerts
  getStockAlerts: async () => {
    try {
      const response = await api.get('/stock/alerts');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch stock alerts' };
    }
  },

  // ============================================
  // STOCK STATISTICS
  // ============================================

  // Get stock statistics
  getStockStats: async () => {
    try {
      const response = await api.get('/stock/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch stock statistics' };
    }
  },

  // Get stock by category
  getStockByCategory: async () => {
    try {
      const response = await api.get('/stock/by-category');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch stock by category' };
    }
  },

  // Get stock value
  getStockValue: async () => {
    try {
      const response = await api.get('/stock/value');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch stock value' };
    }
  },

  // ============================================
  // STOCK HISTORY
  // ============================================

  // Get stock history
  getStockHistory: async (productId, params = {}) => {
    try {
      const response = await api.get(`/stock/history/${productId}`, { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch stock history' };
    }
  },

  // Get stock summary by date range
  getStockSummary: async (startDate, endDate) => {
    try {
      const response = await api.get('/stock/summary', { params: { startDate, endDate } });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch stock summary' };
    }
  }
};