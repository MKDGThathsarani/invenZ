import React, { useEffect, useState } from 'react';
import { useProduct } from '../context/ProductContext';
import { useSupplier } from '../context/SupplierContext';
import { useStock } from '../context/StockContext';
import { useOrder } from '../context/OrderContext';
import StatCard from '../components/dashboard/StatCard';
import Card from '../components/common/Card';
import './Dashboard.css';

const Dashboard = () => {
  const { products, totalCount, loadProducts } = useProduct();
  const { suppliers, loadSuppliers } = useSupplier();
  const { stockOverview, loadStockOverview, lowStockItems } = useStock();
  const { orderStats, loadOrderStats } = useOrder();
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
      label: 'Low Stock', 
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
        <Card title="📈 Recent Sales" icon="📈">
          <div className="chart-placeholder">
            <p>📊 Sales chart will appear here</p>
          </div>
        </Card>

        <Card title="⚠️ Low Stock Alerts" icon="⚠️" borderColor="warning">
          <div className="low-stock-list">
            {lowStockItemsList.length === 0 ? (
              <div className="no-alerts">✅ All items are well-stocked</div>
            ) : (
              lowStockItemsList.map((item, index) => (
                <div key={index} className={`stock-item ${item.status || 'danger'}`}>
                  <span className="stock-name">{item.name}</span>
                  <span className="stock-quantity">{item.currentStock} left</span>
                  <button className="stock-action">Order</button>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;