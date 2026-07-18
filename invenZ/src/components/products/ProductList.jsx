// src/components/products/ProductList.jsx
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';
import './ProductList.css';

const ProductList = ({ 
  products = [], 
  loading = false,
  onAdd, 
  onEdit, 
  onDelete, 
  onView,
  categories = []
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name?.localeCompare(b.name);
        case 'price': return (a.sellingPrice || 0) - (b.sellingPrice || 0);
        case 'stock': return (a.currentStock || 0) - (b.currentStock || 0);
        default: return 0;
      }
    });

  if (loading) {
    return <div className="loader-container">Loading products...</div>;
  }

  return (
    <div className="product-list">
      <ProductFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        categories={categories}
      />

      <div className="product-stats">
        <span>Showing {filteredProducts.length} of {products.length} products</span>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>No products found</p>
          <p className="empty-hint">Try adjusting your filters or add a new product</p>
          <button className="btn-add" onClick={onAdd}>+ Add Product</button>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
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

export default ProductList;