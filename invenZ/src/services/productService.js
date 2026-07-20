// src/services/productService.js - CONNECTED TO BACKEND
import api from './api';

export const productService = {
  // Get all products
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/products', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch products' };
    }
  },
  
  // Get product by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch product' };
    }
  },
  
  // Create new product
  create: async (data) => {
    try {
      const response = await api.post('/products', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create product' };
    }
  },
  
  // Update product
  update: async (id, data) => {
    try {
      const response = await api.put(`/products/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update product' };
    }
  },
  
  // Delete product
  delete: async (id) => {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete product' };
    }
  },
  
  // Get low stock products
  getLowStock: async () => {
    try {
      const response = await api.get('/products/low-stock');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch low stock products' };
    }
  },
  
  // Search products
  search: async (query) => {
    try {
      const response = await api.get(`/products/search?q=${query}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to search products' };
    }
  },

  // Get categories
  getCategories: async () => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch categories' };
    }
  }
};