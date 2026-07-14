import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <span className="brand-icon">🌿</span>
          <span className="brand-name">Inven<span>Z</span></span>
          <span className="brand-tagline">Smart Inventory</span>
        </div>

        <div className="header-search">
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn">🔍</button>
        </div>

        <div className="header-actions">
          <button className="notification-btn">
            🔔
            <span className="badge">3</span>
          </button>
          <div className="user-profile">
            <img
              src="https://ui-avatars.com/api/?name=Admin&background=1B5E20&color=fff"
              alt="User"
              className="user-avatar"
            />
            <span className="user-name">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;