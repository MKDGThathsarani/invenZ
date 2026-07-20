// src/components/layout/Header.jsx - WITH LOGIN/LOGOUT
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header-modern">
      <div className="header-container-modern">
        {/* Brand */}
        <div className="header-brand-modern" onClick={() => navigate('/')}>
          <span className="brand-icon-modern">🌿</span>
          <span className="brand-name-modern">Inven<span>Z</span></span>
          <span className="brand-tagline-modern">Smart Inventory</span>
        </div>

        {/* Search */}
        <form className="header-search-modern" onSubmit={handleSearch}>
          <span className="search-icon-modern">🔍</span>
          <input
            type="text"
            placeholder="Search products, suppliers..."
            className="search-input-modern"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn-modern">Search</button>
        </form>

        {/* Actions */}
        <div className="header-actions-modern">
          <button 
            className="notification-btn-modern"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <span className="notification-icon">🔔</span>
            <span className="notification-badge">3</span>
          </button>

          {isAuthenticated ? (
            // Logged In - Show User Profile
            <div className="user-profile-modern">
              <img
                src={`https://ui-avatars.com/api/?name=${user?.name || 'Admin'}&background=1B5E20&color=fff&bold=true&size=40`}
                alt="User"
                className="user-avatar-modern"
              />
              <div className="user-info-modern">
                <span className="user-name-modern">{user?.name || 'Admin'}</span>
                <span className="user-role-modern">{user?.role || 'Administrator'}</span>
              </div>
              <button className="logout-btn-modern" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            // Not Logged In - Show Login Button
            <button 
              className="login-btn-modern" 
              onClick={() => navigate('/login')}
            >
              🔐 Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;