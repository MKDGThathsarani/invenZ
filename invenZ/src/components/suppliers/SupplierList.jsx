import React, { useState } from 'react';
import SupplierCard from './SupplierCard';
import './SupplierList.css';

const SupplierList = ({ suppliers = [], onAdd, onEdit, onDelete, onView }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSuppliers = suppliers.filter(s =>
    s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="supplier-list">
      <div className="list-header">
        <h3>🏢 Suppliers</h3>
        <button className="btn-add" onClick={onAdd}>+ Add Supplier</button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search suppliers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="search-icon">🔍</span>
      </div>

      {filteredSuppliers.length === 0 ? (
        <div className="empty-state">
          <p>📭 No suppliers found</p>
        </div>
      ) : (
        <div className="suppliers-grid">
          {filteredSuppliers.map(supplier => (
            <SupplierCard
              key={supplier.id}
              supplier={supplier}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SupplierList;