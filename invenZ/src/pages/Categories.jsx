// src/pages/Categories.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import './Categories.css';

const Categories = () => {
  const navigate = useNavigate();
  const { success, error } = useNotification();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '📦',
    color: '#1B5E20'
  });

  // Load categories
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    // Mock data - replace with API call
    const mockCategories = [
      { id: 1, name: 'Electronics', description: 'Electronic items and gadgets', icon: '💻', color: '#1B5E20', count: 15 },
      { id: 2, name: 'Food & Beverage', description: 'Food products and drinks', icon: '🍔', color: '#FF9800', count: 23 },
      { id: 3, name: 'Clothing', description: 'Apparel and fashion', icon: '👕', color: '#4CAF50', count: 8 },
      { id: 4, name: 'Books', description: 'Books and publications', icon: '📚', color: '#2196F3', count: 12 },
      { id: 5, name: 'Home & Garden', description: 'Home and garden items', icon: '🏠', color: '#9C27B0', count: 6 },
    ];
    setCategories(mockCategories);
    setLoading(false);
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({ name: '', description: '', icon: '📦', color: '#1B5E20' });
    setShowForm(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      icon: category.icon || '📦',
      color: category.color || '#1B5E20'
    });
    setShowForm(true);
  };

  const handleDelete = async (category) => {
    if (!window.confirm(`Are you sure you want to delete "${category.name}"?`)) return;
    try {
      setCategories(categories.filter(c => c.id !== category.id));
      success('Category deleted successfully!');
    } catch (err) {
      error('Failed to delete category');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      error('Category name is required');
      return;
    }

    const newCategory = {
      id: editingCategory ? editingCategory.id : Date.now(),
      ...formData,
      count: editingCategory ? editingCategory.count : 0
    };

    if (editingCategory) {
      setCategories(categories.map(c => c.id === editingCategory.id ? newCategory : c));
      success('Category updated successfully!');
    } else {
      setCategories([...categories, newCategory]);
      success('Category added successfully!');
    }

    setShowForm(false);
    setEditingCategory(null);
  };

  const icons = ['📦', '💻', '🍔', '👕', '📚', '🏠', '⚡', '🎮', '📱', '🎨', '🏢', '🛒', '📊', '⚙️', '🎯'];
  const colors = ['#1B5E20', '#FF9800', '#4CAF50', '#2196F3', '#9C27B0', '#F44336', '#E91E63', '#00BCD4', '#795548'];

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader-spinner"></div>
        <p>Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="categories-page-modern">
      {/* Page Header */}
      <div className="page-header-modern">
        <div>
          <h1>🏷️ Categories</h1>
          <p>Manage your product categories</p>
        </div>
        <button className="btn-add-modern" onClick={handleAdd}>
          <span>➕</span> Add Category
        </button>
      </div>

      {/* Stats Bar */}
      <div className="stats-bar-modern">
        <div className="stat-item">
          <span className="stat-number">{categories.length}</span>
          <span className="stat-label">Total Categories</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{categories.reduce((sum, c) => sum + (c.count || 0), 0)}</span>
          <span className="stat-label">Total Products</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{categories.filter(c => (c.count || 0) > 0).length}</span>
          <span className="stat-label">Active Categories</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{categories.filter(c => (c.count || 0) === 0).length}</span>
          <span className="stat-label">Empty Categories</span>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="form-overlay">
          <div className="form-card">
            <div className="form-header">
              <h3>{editingCategory ? '✏️ Edit Category' : '➕ Add New Category'}</h3>
              <button className="close-btn" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Category Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter category name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter category description"
                  rows="2"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Icon</label>
                  <div className="icon-picker">
                    {icons.map((icon) => (
                      <button
                        key={icon}
                        type="button"
                        className={`icon-option ${formData.icon === icon ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, icon })}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>Color</label>
                  <div className="color-picker">
                    {colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`color-option ${formData.color === color ? 'active' : ''}`}
                        style={{ background: color }}
                        onClick={() => setFormData({ ...formData, color })}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn-submit">
                  {editingCategory ? 'Update Category' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <div className="empty-state-modern">
          <span className="empty-icon">🏷️</span>
          <h3>No categories yet</h3>
          <p>Create your first category to organize your products</p>
          <button className="btn-add-modern" onClick={handleAdd}>+ Add Category</button>
        </div>
      ) : (
        <div className="categories-grid">
          {categories.map((category) => (
            <div key={category.id} className="category-card" style={{ borderColor: category.color }}>
              <div className="category-icon" style={{ background: category.color + '15', color: category.color }}>
                {category.icon || '📦'}
              </div>
              <div className="category-info">
                <h4>{category.name}</h4>
                <p>{category.description || 'No description'}</p>
                <span className="category-count">{category.count || 0} products</span>
              </div>
              <div className="category-actions">
                <button className="btn-edit" onClick={() => handleEdit(category)}>✏️</button>
                <button className="btn-delete" onClick={() => handleDelete(category)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;