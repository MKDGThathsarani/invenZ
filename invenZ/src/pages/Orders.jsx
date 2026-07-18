import React, { useState, useEffect } from 'react';
import { useOrder } from '../context/OrderContext';
import { useNotification } from '../context/NotificationContext';
import { PurchaseOrderList, SalesOrderList } from '../components/orders';
import './Orders.css';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('purchase');
  const { 
    purchaseOrders, 
    salesOrders, 
    loadPurchaseOrders, 
    loadSalesOrders,
    deletePurchaseOrder,
    deleteSalesOrder,
    updatePurchaseOrderStatus,
    updateSalesOrderStatus
  } = useOrder();
  const { success, error } = useNotification();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          loadPurchaseOrders(),
          loadSalesOrders()
        ]);
      } catch (err) {
        error('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleDelete = async (order, type) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      if (type === 'purchase') {
        await deletePurchaseOrder(order.id);
      } else {
        await deleteSalesOrder(order.id);
      }
      success('Order deleted successfully!');
    } catch (err) {
      error('Failed to delete order');
    }
  };

  const handleStatusChange = async (id, status, type) => {
    try {
      if (type === 'purchase') {
        await updatePurchaseOrderStatus(id, status);
      } else {
        await updateSalesOrderStatus(id, status);
      }
      success(`Order status updated to ${status}`);
    } catch (err) {
      error('Failed to update order status');
    }
  };

  if (loading) {
    return <div className="loader-container">Loading...</div>;
  }

  return (
    <div className="orders-page">
      <div className="page-header">
        <h1>🛒 Orders</h1>
        <p>Manage your purchase and sales orders</p>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'purchase' ? 'active' : ''}`}
          onClick={() => setActiveTab('purchase')}
        >
          📦 Purchase Orders ({purchaseOrders?.length || 0})
        </button>
        <button 
          className={`tab ${activeTab === 'sales' ? 'active' : ''}`}
          onClick={() => setActiveTab('sales')}
        >
          💰 Sales Orders ({salesOrders?.length || 0})
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'purchase' ? (
          <PurchaseOrderList
            orders={purchaseOrders || []}
            onDelete={(order) => handleDelete(order, 'purchase')}
            onStatusChange={(id, status) => handleStatusChange(id, status, 'purchase')}
          />
        ) : (
          <SalesOrderList
            orders={salesOrders || []}
            onDelete={(order) => handleDelete(order, 'sales')}
            onStatusChange={(id, status) => handleStatusChange(id, status, 'sales')}
          />
        )}
      </div>
    </div>
  );
};

export default Orders;