import React from 'react';
import './Navbar.css';

const Navbar = ({ title = 'InvenZ', user = null }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">🌿</span>
        <span className="brand-name">{title}</span>
      </div>

      <div className="navbar-search">
        <input type="text" placeholder="Search..." className="search-input" />
        <button className="search-btn">🔍</button>
      </div>

      <div className="navbar-actions">
        <button className="icon-btn">🔔</button>
        {user ? (
          <div className="user-profile">
            <img 
              src={`https://ui-avatars.com/api/?name=${user.name}&background=1B5E20&color=fff`}
              alt={user.name}
              className="user-avatar"
            />
            <span className="user-name">{user.name}</span>
          </div>
        ) : (
          <button className="login-btn">Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;