// src/components/layout/Header.jsx - COMPLETE WITH NOTIFICATIONS & USER DROPDOWN
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // ✅ Notifications Data
  const notifications = [
    { 
      id: 1, 
      icon: '📦', 
      message: 'New product added: Premium Rice', 
      time: '5 min ago', 
      read: false,
      path: '/products'
    },
    { 
      id: 2, 
      icon: '⚠️', 
      message: 'Low stock alert: Sugar (8 left)', 
      time: '1 hour ago', 
      read: false,
      path: '/stock'
    },
    { 
      id: 3, 
      icon: '📊', 
      message: 'Monthly report is ready', 
      time: '2 hours ago', 
      read: false,
      path: '/reports'
    },
    { 
      id: 4, 
      icon: '✅', 
      message: 'Order #PO-2026-001 delivered', 
      time: '1 day ago', 
      read: true,
      path: '/orders'
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

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

  const handleNotificationClick = (notification) => {
    // Mark as read
    const updatedNotifications = notifications.map(n => 
      n.id === notification.id ? { ...n, read: true } : n
    );
    console.log('Notification clicked:', notification.message);
    
    // Close dropdown
    setShowNotifications(false);
    
    // Navigate to the path
    if (notification.path) {
      navigate(notification.path);
    }
  };

  const markAllAsRead = () => {
    notifications.forEach(n => n.read = true);
    console.log('All notifications marked as read');
  };

  return (
    <header className="header-modern">
      <div className="header-container-modern">
        {/* ========== BRAND ========== */}
        <div className="header-brand-modern" onClick={() => navigate('/')}>
          <span className="brand-icon-modern">🌿</span>
          <span className="brand-name-modern">Inven<span>Z</span></span>
          <span className="brand-tagline-modern">Smart Inventory</span>
        </div>

        {/* ========== SEARCH ========== */}
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

        {/* ========== ACTIONS ========== */}
        <div className="header-actions-modern">
          
          {/* ===== NOTIFICATIONS ===== */}
          <div className="notification-wrapper">
            <button 
              className="notification-btn-modern"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
            >
              <span className="notification-icon">🔔</span>
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
            </button>

            {showNotifications && (
              <div className="notification-dropdown">
                <div className="dropdown-header">
                  <h4>Notifications</h4>
                  {unreadCount > 0 && (
                    <button className="mark-all-btn" onClick={markAllAsRead}>
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="dropdown-body">
                  {notifications.length === 0 ? (
                    <div className="empty-notifications">
                      <span>🔕</span>
                      <p>No notifications</p>
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`notification-item ${notif.read ? 'read' : 'unread'}`}
                        onClick={() => handleNotificationClick(notif)}
                      >
                        <span className="notif-icon">{notif.icon}</span>
                        <div className="notif-content">
                          <p className="notif-message">{notif.message}</p>
                          <span className="notif-time">{notif.time}</span>
                        </div>
                        {!notif.read && <span className="notif-dot"></span>}
                        <span className="notif-arrow">→</span>
                      </div>
                    ))
                  )}
                </div>
                <div className="dropdown-footer">
                  <button 
                    className="view-all-btn"
                    onClick={() => {
                      setShowNotifications(false);
                      navigate('/notifications');
                    }}
                  >
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ===== USER PROFILE / LOGIN ===== */}
          {isAuthenticated ? (
            <div className="user-profile-wrapper">
              <div 
                className="user-profile-modern"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${user?.name || 'Admin'}&background=1B5E20&color=fff&bold=true&size=40`}
                  alt="User"
                  className="user-avatar-modern"
                />
                <div className="user-info-modern">
                  <span className="user-name-modern">{user?.name || 'Admin'}</span>
                  <span className="user-role-modern">{user?.role || 'Administrator'}</span>
                </div>
                <span className="dropdown-arrow">▼</span>
              </div>

              {/* ✅ User Dropdown - Profile, Settings, Logout */}
              {showUserMenu && (
                <div className="user-dropdown">
                  <button onClick={() => navigate('/settings/profile')}>
                    <span>👤</span> Profile
                  </button>
                  <button onClick={() => navigate('/settings')}>
                    <span>⚙️</span> Settings
                  </button>
                  <hr />
                  <button onClick={handleLogout} className="logout-btn">
                    <span>🚪</span> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
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