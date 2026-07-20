import api from './api';

export const reportService = {
  // ============================================
  // SALES REPORTS
  // ============================================

  // Get sales report
  getSalesReport: async (params = {}) => {
    try {
      const response = await api.get('/reports/sales', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch sales report' };
    }
  },

  // Get sales by category
  getSalesByCategory: async (params = {}) => {
    try {
      const response = await api.get('/reports/sales/category', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch sales by category' };
    }
  },

  // Get daily sales
  getDailySales: async (date) => {
    try {
      const response = await api.get('/reports/sales/daily', { params: { date } });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch daily sales' };
    }
  },

  // Get monthly sales
  getMonthlySales: async (month, year) => {
    try {
      const response = await api.get('/reports/sales/monthly', { params: { month, year } });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch monthly sales' };
    }
  },

  // ============================================
  // STOCK REPORTS
  // ============================================

  // Get stock report
  getStockReport: async (params = {}) => {
    try {
      const response = await api.get('/reports/stock', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch stock report' };
    }
  },

  // Get stock by category
  getStockByCategory: async () => {
    try {
      const response = await api.get('/reports/stock/category');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch stock by category' };
    }
  },

  // Get low stock report
  getLowStockReport: async () => {
    try {
      const response = await api.get('/reports/stock/low');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch low stock report' };
    }
  },

  // Get stock movements report
  getStockMovementsReport: async (params = {}) => {
    try {
      const response = await api.get('/reports/stock/movements', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch stock movements report' };
    }
  },

  // Get stock valuation
  getStockValuation: async () => {
    try {
      const response = await api.get('/reports/stock/valuation');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch stock valuation' };
    }
  },

  // ============================================
  // SUPPLIER REPORTS
  // ============================================

  // Get supplier report
  getSupplierReport: async (params = {}) => {
    try {
      const response = await api.get('/reports/suppliers', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch supplier report' };
    }
  },

  // Get supplier performance
  getSupplierPerformance: async (supplierId) => {
    try {
      const response = await api.get(`/reports/suppliers/${supplierId}/performance`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch supplier performance' };
    }
  },

  // ============================================
  // PROFIT REPORTS
  // ============================================

  // Get profit report
  getProfitReport: async (params = {}) => {
    try {
      const response = await api.get('/reports/profit', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch profit report' };
    }
  },

  // Get profit by product
  getProfitByProduct: async (params = {}) => {
    try {
      const response = await api.get('/reports/profit/product', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch profit by product' };
    }
  },

  // Get profit by category
  getProfitByCategory: async (params = {}) => {
    try {
      const response = await api.get('/reports/profit/category', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch profit by category' };
    }
  },

  // ============================================
  // EXPORT REPORTS
  // ============================================

  // Export report as PDF
  exportPDF: async (type, params = {}) => {
    try {
      const response = await api.get(`/reports/export/pdf/${type}`, {
        params,
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to export PDF' };
    }
  },

  // Export report as Excel
  exportExcel: async (type, params = {}) => {
    try {
      const response = await api.get(`/reports/export/excel/${type}`, {
        params,
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to export Excel' };
    }
  },

  // Export report as CSV
  exportCSV: async (type, params = {}) => {
    try {
      const response = await api.get(`/reports/export/csv/${type}`, {
        params,
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to export CSV' };
    }
  },

  // ============================================
  // DASHBOARD REPORTS
  // ============================================

  // Get dashboard summary
  getDashboardSummary: async () => {
    try {
      const response = await api.get('/reports/dashboard/summary');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch dashboard summary' };
    }
  },

  // Get dashboard charts data
  getDashboardCharts: async () => {
    try {
      const response = await api.get('/reports/dashboard/charts');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch dashboard charts' };
    }
  }
};