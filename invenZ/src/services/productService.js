// src/services/productService.js
import api from './api';

// Mock data for testing (remove when backend is ready)
const MOCK_PRODUCTS = [
  { id: 1, name: 'Premium Rice', sku: 'RICE-001', category: 'Food', supplier: 'Food Supply Co.', currentStock: 45, minStock: 10, maxStock: 100, purchasePrice: 120, sellingPrice: 150, unit: 'kg', status: 'good' },
  { id: 2, name: 'Sugar', sku: 'SUGAR-001', category: 'Food', supplier: 'Food Supply Co.', currentStock: 8, minStock: 10, maxStock: 50, purchasePrice: 80, sellingPrice: 100, unit: 'kg', status: 'low' },
  { id: 3, name: 'Laptop', sku: 'LAP-001', category: 'Electronics', supplier: 'Tech Distributors', currentStock: 2, minStock: 5, maxStock: 20, purchasePrice: 45000, sellingPrice: 55000, unit: 'pcs', status: 'critical' },
  { id: 4, name: 'Wheat Flour', sku: 'FLOUR-001', category: 'Food', supplier: 'Food Supply Co.', currentStock: 45, minStock: 15, maxStock: 80, purchasePrice: 90, sellingPrice: 120, unit: 'kg', status: 'good' },
];

export const productService = {
  // Get all products
  getAll: async (params = {}) => {
    try {
      // For now, return mock data
      // Replace with: return await api.get('/products', { params });
      return { data: MOCK_PRODUCTS, total: MOCK_PRODUCTS.length };
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch products' };
    }
  },
  
  // Get product by ID
  getById: async (id) => {
    try {
      // Mock: find product by id
      const product = MOCK_PRODUCTS.find(p => p.id === parseInt(id));
      return { data: product };
      // Replace with: return await api.get(`/products/${id}`);
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch product' };
    }
  },
  
  // Create new product
  create: async (data) => {
    try {
      // Mock: create new product
      const newProduct = { ...data, id: MOCK_PRODUCTS.length + 1 };
      MOCK_PRODUCTS.push(newProduct);
      return { data: newProduct };
      // Replace with: return await api.post('/products', data);
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create product' };
    }
  },
  
  // Update product
  update: async (id, data) => {
    try {
      // Mock: update product
      const index = MOCK_PRODUCTS.findIndex(p => p.id === parseInt(id));
      if (index !== -1) {
        MOCK_PRODUCTS[index] = { ...MOCK_PRODUCTS[index], ...data };
        return { data: MOCK_PRODUCTS[index] };
      }
      throw new Error('Product not found');
      // Replace with: return await api.put(`/products/${id}`, data);
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update product' };
    }
  },
  
  // Delete product
  delete: async (id) => {
    try {
      // Mock: delete product
      const index = MOCK_PRODUCTS.findIndex(p => p.id === parseInt(id));
      if (index !== -1) {
        MOCK_PRODUCTS.splice(index, 1);
        return { data: { success: true } };
      }
      throw new Error('Product not found');
      // Replace with: return await api.delete(`/products/${id}`);
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete product' };
    }
  },
  
  // Get low stock products
  getLowStock: async () => {
    try {
      const lowStock = MOCK_PRODUCTS.filter(p => p.currentStock <= p.minStock);
      return { data: lowStock };
      // Replace with: return await api.get('/products/low-stock');
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch low stock products' };
    }
  },
  
  // Search products
  search: async (query) => {
    try {
      const results = MOCK_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.sku.toLowerCase().includes(query.toLowerCase())
      );
      return { data: results };
      // Replace with: return await api.get(`/products/search?q=${query}`);
    } catch (error) {
      throw error.response?.data || { message: 'Failed to search products' };
    }
  },

  // Get categories
  getCategories: async () => {
    try {
      const categories = [...new Set(MOCK_PRODUCTS.map(p => p.category))];
      return { data: categories.map(c => ({ id: c, name: c })) };
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch categories' };
    }
  }
};