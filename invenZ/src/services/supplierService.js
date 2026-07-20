import api from './api';

export const supplierService = {
  // ============================================
  // SUPPLIER CRUD
  // ============================================

  // Get all suppliers
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/suppliers', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch suppliers' };
    }
  },

  // Get supplier by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/suppliers/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch supplier' };
    }
  },

  // Create supplier
  create: async (supplierData) => {
    try {
      const response = await api.post('/suppliers', supplierData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create supplier' };
    }
  },

  // Update supplier
  update: async (id, supplierData) => {
    try {
      const response = await api.put(`/suppliers/${id}`, supplierData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update supplier' };
    }
  },

  // Delete supplier
  delete: async (id) => {
    try {
      const response = await api.delete(`/suppliers/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete supplier' };
    }
  },

  // ============================================
  // SUPPLIER SEARCH & FILTER
  // ============================================

  // Search suppliers
  search: async (query) => {
    try {
      const response = await api.get('/suppliers/search', { params: { q: query } });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to search suppliers' };
    }
  },

  // Get suppliers by category
  getByCategory: async (categoryId) => {
    try {
      const response = await api.get(`/suppliers/category/${categoryId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch suppliers by category' };
    }
  },

  // Get top rated suppliers
  getTopRated: async (limit = 10) => {
    try {
      const response = await api.get('/suppliers/top-rated', { params: { limit } });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch top rated suppliers' };
    }
  },

  // ============================================
  // SUPPLIER PRODUCTS
  // ============================================

  // Get supplier products
  getSupplierProducts: async (supplierId) => {
    try {
      const response = await api.get(`/suppliers/${supplierId}/products`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch supplier products' };
    }
  },

  // Get supplier purchase orders
  getSupplierOrders: async (supplierId, params = {}) => {
    try {
      const response = await api.get(`/suppliers/${supplierId}/orders`, { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch supplier orders' };
    }
  },

  // ============================================
  // SUPPLIER RATING
  // ============================================

  // Rate supplier
  rateSupplier: async (supplierId, rating, review) => {
    try {
      const response = await api.post(`/suppliers/${supplierId}/rate`, { rating, review });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to rate supplier' };
    }
  },

  // Get supplier ratings
  getSupplierRatings: async (supplierId) => {
    try {
      const response = await api.get(`/suppliers/${supplierId}/ratings`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch supplier ratings' };
    }
  },

  // ============================================
  // SUPPLIER STATISTICS
  // ============================================

  // Get supplier statistics
  getSupplierStats: async () => {
    try {
      const response = await api.get('/suppliers/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch supplier statistics' };
    }
  },

  // Get supplier performance
  getSupplierPerformance: async (supplierId) => {
    try {
      const response = await api.get(`/suppliers/${supplierId}/performance`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch supplier performance' };
    }
  },

  // ============================================
  // BULK OPERATIONS
  // ============================================

  // Bulk create suppliers
  bulkCreate: async (suppliers) => {
    try {
      const response = await api.post('/suppliers/bulk', { suppliers });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to bulk create suppliers' };
    }
  },

  // Bulk delete suppliers
  bulkDelete: async (ids) => {
    try {
      const response = await api.delete('/suppliers/bulk', { data: { ids } });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to bulk delete suppliers' };
    }
  }
};