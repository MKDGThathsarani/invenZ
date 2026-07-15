// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import { useSupplier } from '../context/SupplierContext';
import { useStock } from '../context/StockContext';
import { useOrder } from '../context/OrderContext';
import { useNotification } from '../context/NotificationContext';
import StatCard from '../components/dashboard/StatCard';
import Card from '../components/common/Card';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { products, totalCount, loadProducts } = useProduct();
  const { suppliers, loadSuppliers } = useSupplier();
  const { stockOverview, loadStockOverview, lowStockItems } = useStock();
  const { orderStats, loadOrderStats } = useOrder();
  const { success, error } = useNotification();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        loadProducts(),
        loadSuppliers(),
        loadStockOverview(),
        loadOrderStats()
      ]);
      setLoading(false);
    };
    loadData();
  }, []);

  // ============================================
  // ACTION HANDLERS
  // ============================================

  const handleAddProduct = () => {
    navigate('/products/add');
  };

  const handleImportData = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv,.xlsx,.xls';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        console.log('Importing file:', file.name);
        success(`Importing ${file.name}...`);
      }
    };
    fileInput.click();
  };

  const handleExportReport = () => {
    navigate('/reports');
  };

  const handleLowStockAlert = () => {
    navigate('/stock');
  };

  const handleOrderNow = (product) => {
    navigate(`/orders/purchase/add?product=${product.id}`);
    console.log('Ordering product:', product);
  };

  // ============================================
  // FEATURE CLICK HANDLERS
  // ============================================

  const handleFeatureClick = (feature) => {
    switch(feature) {
      case 'dashboard':
        navigate('/');
        break;
      case 'products':
        navigate('/products');
        break;
      case 'suppliers':
        navigate('/suppliers');
        break;
      case 'stock':
        navigate('/stock');
        break;
      case 'orders':
        navigate('/orders');
        break;
      case 'reports':
        navigate('/reports');
        break;
      default:
        console.log('Feature:', feature);
    }
  };

  const stats = [
    { 
      icon: '📦', 
      value: totalCount || 0, 
      label: 'Total Products', 
      change: '+12%', 
      color: 'primary' 
    },
    { 
      icon: '⚠️', 
      value: lowStockItems?.length || 0, 
      label: 'Low Stock Items', 
      change: '+5%', 
      color: 'warning' 
    },
    { 
      icon: '🏢', 
      value: suppliers?.length || 0, 
      label: 'Suppliers', 
      change: '+2', 
      color: 'success' 
    },
    { 
      icon: '💰', 
      value: `Rs. ${stockOverview?.totalValue?.toLocaleString() || '0'}`, 
      label: 'Total Value', 
      change: '+8%', 
      color: 'info' 
    }
  ];

  const lowStockItemsList = lowStockItems?.slice(0, 3) || [];

  // Features data
  const features = [
    { 
      id: 'dashboard',
      icon: '📊', 
      title: 'Dashboard', 
      description: 'Real-time insights & analytics',
      color: '#1B5E20'
    },
    { 
      id: 'products',
      icon: '📦', 
      title: 'Products', 
      description: 'Complete product management',
      color: '#4CAF50'
    },
    { 
      id: 'suppliers',
      icon: '🏢', 
      title: 'Suppliers', 
      description: 'Manage supplier relationships',
      color: '#FF9800'
    },
    { 
      id: 'stock',
      icon: '📈', 
      title: 'Stock', 
      description: 'Real-time stock tracking',
      color: '#F44336'
    },
    { 
      id: 'orders',
      icon: '🛒', 
      title: 'Orders', 
      description: 'Purchase & sales orders',
      color: '#2196F3'
    },
    { 
      id: 'reports',
      icon: '📋', 
      title: 'Reports', 
      description: 'PDF & Excel reports',
      color: '#9C27B0'
    }
  ];

  if (loading) {
    return <div className="loader-container">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>📊 Dashboard</h1>
        <p>Welcome back! Here's what's happening with your inventory.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="welcome-card">
          <h2>👋 Welcome to InvenZ!</h2>
          <p>
            Your all-in-one inventory management solution. 
            Track products, manage suppliers, and monitor stock levels in real-time.
          </p>
          
          <div className="quick-actions">
            <h3>⚡ Quick Actions</h3>
            <div className="action-grid">
              <button 
                className="action-btn primary"
                onClick={handleAddProduct}
              >
                <span>➕</span> Add Product
              </button>
              <button 
                className="action-btn success"
                onClick={handleImportData}
              >
                <span>📥</span> Import Data
              </button>
              <button 
                className="action-btn warning"
                onClick={handleExportReport}
              >
                <span>📤</span> Export Report
              </button>
              <button 
                className="action-btn danger"
                onClick={handleLowStockAlert}
              >
                <span>⚠️</span> Low Stock Alert
              </button>
            </div>
          </div>
        </div>

        <Card title="⚠️ Low Stock Alerts" icon="⚠️" borderColor="warning">
          <div className="low-stock-list">
            {lowStockItemsList.length === 0 ? (
              <div className="no-alerts">✅ All items are well-stocked</div>
            ) : (
              lowStockItemsList.map((item, index) => (
                <div key={index} className={`stock-item ${item.status || 'danger'}`}>
                  <span className="stock-name">{item.name}</span>
                  <span className="stock-quantity">{item.currentStock} left</span>
                  <button 
                    className="stock-action"
                    onClick={() => handleOrderNow(item)}
                  >
                    Order
                  </button>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* ============================================
          FEATURES SECTION - CLICKABLE
          ============================================ */}
      <div className="features-section">
        <h3>✨ Key Features</h3>
        <div className="features-grid">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className="feature-item clickable"
              onClick={() => handleFeatureClick(feature.id)}
              style={{ cursor: 'pointer' }}
            >
              <span className="feature-icon">{feature.icon}</span>
              <h4 style={{ color: feature.color }}>{feature.title}</h4>
              <p>{feature.description}</p>
              <div className="feature-hover-effect">
                <span>Click to explore →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;