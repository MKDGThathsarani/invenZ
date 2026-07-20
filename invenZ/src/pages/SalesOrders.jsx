import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import { useNotification } from '../context/NotificationContext';
import { SalesOrderList } from '../components/orders';
import './SalesOrders.css';

const SalesOrders = () => {
  const navigate = useNavigate();
  const { salesOrders, loadSalesOrders, deleteSalesOrder } = useOrder();
  const { success, error } = useNotification();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await loadSalesOrders();
      setLoading(false);
    };
    loadData();
  }, []);

  const handleDelete = async (order) => {
    if (!window.confirm(`Are you sure you want to delete order ${order.orderNumber}?`)) return;
    try {
      await deleteSalesOrder(order.id);
      success('Order deleted successfully!');
    } catch (err) {
      error('Failed to delete order');
    }
  };

  if (loading) {
    return <div className="loader-container">Loading...</div>;
  }

  return (
    <div className="sales-orders-page">
      <div className="page-header">
        <h1>💰 Sales Orders</h1>
        <p>Manage your sales orders</p>
        <button className="btn-primary" onClick={() => navigate('/orders/sales/add')}>
          + New Sales Order
        </button>
      </div>

      <SalesOrderList
        orders={salesOrders || []}
        onDelete={handleDelete}
        onView={(order) => navigate(`/orders/sales/${order.id}`)}
        onEdit={(order) => navigate(`/orders/sales/edit/${order.id}`)}
      />
    </div>
  );
};

export default SalesOrders;