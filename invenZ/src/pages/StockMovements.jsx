import React, { useState, useEffect } from 'react';
import { useStock } from '../context/StockContext';
import StockMovementsComponent from '../components/stock/StockMovements';
import './StockMovements.css';

const StockMovements = () => {
  const { movements, loadMovements } = useStock();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await loadMovements();
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return <div className="loader-container">Loading...</div>;
  }

  return (
    <div className="stock-movements-page">
      <div className="page-header">
        <h1>📋 Stock Movements</h1>
        <p>View all stock movement history</p>
      </div>

      <StockMovementsComponent movements={movements || []} />
    </div>
  );
};

export default StockMovements;