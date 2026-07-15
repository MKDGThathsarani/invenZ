import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import { useNotification } from '../context/NotificationContext';
import { PurchaseOrderList } from '../components/orders';
import './PurchaseOrders.css';

const PurchaseOrders = () => {
  const navigate = useNavigate();
  const { purchaseOrders, loadPurchaseOrders, deletePurchaseOrder } = useOrder();
  const { success, error } = useNotification();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await loadPurchaseOrders();
      setLoading(false);
    };
    loadData();
  }, []);

  const handleDelete = async (order) => {
    if (!window.confirm(`Are you sure you want to delete order ${order.orderNumber}?`)) return;
    try {
      await deletePurchaseOrder(order.id);
      success('Order deleted successfully!');
    } catch (err) {
      error('Failed to delete order');
    }
  };

  if (loading) {
    return <div className="loader-container">Loading...</div>;
  }

  return (
    <div className="purchase-orders-page">
      <div className="page-header">
        <h1>📦 Purchase Orders</h1>
        <p>Manage your purchase orders</p>
        <button className="btn-primary" onClick={() => navigate('/orders/purchase/add')}>
          + New Purchase Order
        </button>
      </div>

      <PurchaseOrderList
        orders={purchaseOrders || []}
        onDelete={handleDelete}
        onView={(order) => navigate(`/orders/purchase/${order.id}`)}
        onEdit={(order) => navigate(`/orders/purchase/edit/${order.id}`)}
      />
    </div>
  );
};

export default PurchaseOrders;