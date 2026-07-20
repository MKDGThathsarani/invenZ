import React from 'react';
import './Sidebar.css';

const Sidebar = ({ menuItems = [], activeItem, onItemClick }) => {
  const defaultItems = [
    { icon: '📊', label: 'Dashboard', path: '/' },
    { icon: '📦', label: 'Products', path: '/products' },
    { icon: '🏷️', label: 'Categories', path: '/categories' },
    { icon: '🏢', label: 'Suppliers', path: '/suppliers' },
    { icon: '📈', label: 'Stock', path: '/stock' },
    { icon: '🛒', label: 'Orders', path: '/orders' },
    { icon: '📋', label: 'Reports', path: '/reports' },
    { icon: '⚙️', label: 'Settings', path: '/settings' },
  ];

  const items = menuItems.length > 0 ? menuItems : defaultItems;

  return (
    <aside className="sidebar-ui">
      <nav className="sidebar-nav">
        {items.map((item, index) => (
          <a
            key={index}
            href={item.path}
            className={`sidebar-link ${activeItem === item.label ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              onItemClick?.(item);
            }}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
            {item.badge && <span className="sidebar-badge">{item.badge}</span>}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;