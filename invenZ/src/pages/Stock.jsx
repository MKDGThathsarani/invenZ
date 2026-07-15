import React, { useState, useEffect } from 'react';
import { useStock } from '../context/StockContext';
import { useNotification } from '../context/NotificationContext';
import StockOverview from '../components/stock/StockOverview';
import StockMovements from '../components/stock/StockMovements';
import LowStockList from '../components/stock/LowStockList';
import './Stock.css';

const Stock = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { 
    stockOverview, 
    movements, 
    lowStockItems,
    loadStockOverview, 
    loadMovements,
    loadLowStock
  } = useStock();
  const { error } = useNotification();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          loadStockOverview(),
          loadMovements(),
          loadLowStock()
        ]);
      } catch (err) {
        error('Failed to load stock data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const tabs = [
    { id: 'overview', label: '📊 Overview' },
    { id: 'movements', label: '📋 Movements' },
    { id: 'low-stock', label: '⚠️ Low Stock' }
  ];

  if (loading) {
    return <div className="loader-container">Loading...</div>;
  }

  return (
    <div className="stock-page">
      <div className="page-header">
        <h1>📈 Stock Management</h1>
        <p>Monitor and manage your inventory levels</p>
      </div>

      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && (
          <StockOverview
            totalItems={stockOverview?.totalItems || 0}
            lowStockItems={lowStockItems?.length || 0}
            outOfStockItems={stockOverview?.outOfStock || 0}
            totalValue={stockOverview?.totalValue || 0}
            recentMovements={movements?.slice(0, 5) || []}
          />
        )}

        {activeTab === 'movements' && (
          <StockMovements movements={movements || []} />
        )}

        {activeTab === 'low-stock' && (
          <LowStockList 
            items={lowStockItems || []}
            onOrderClick={(item) => console.log('Order', item)}
          />
        )}
      </div>
    </div>
  );
};

export default Stock;