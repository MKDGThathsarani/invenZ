// src/App.jsx
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1>🌿 Inven<span>Z</span></h1>
          <p>Smart Inventory Management System</p>
          <p className="subtitle">Built for Sri Lankan Businesses 🇱🇰</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-number">1,245</div>
            <div className="stat-label">Total Products</div>
          </div>
          <div className="stat-card warning">
            <div className="stat-icon">⚠️</div>
            <div className="stat-number">8</div>
            <div className="stat-label">Low Stock Items</div>
          </div>
          <div className="stat-card success">
            <div className="stat-icon">🏢</div>
            <div className="stat-number">24</div>
            <div className="stat-label">Suppliers</div>
          </div>
          <div className="stat-card info">
            <div className="stat-icon">💰</div>
            <div className="stat-number">Rs. 45,000</div>
            <div className="stat-label">Total Value</div>
          </div>
        </div>

        <div className="content-grid">
          {/* Left Column - Welcome & Counter */}
          <div className="welcome-card">
            <h2>👋 Welcome to InvenZ!</h2>
            <p>
              Your all-in-one inventory management solution. 
              Track products, manage suppliers, and monitor stock levels in real-time.
            </p>
            
            <div className="counter-section">
              <button 
                className="counter-btn"
                onClick={() => setCount((count) => count + 1)}
              >
                Click Me! {count}
              </button>
              <p className="counter-hint">
                Edit <code>src/App.jsx</code> and save to test HMR
              </p>
            </div>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="quick-actions">
            <h3>⚡ Quick Actions</h3>
            <div className="action-grid">
              <button className="action-btn primary">
                <span>➕</span> Add Product
              </button>
              <button className="action-btn success">
                <span>📥</span> Import Data
              </button>
              <button className="action-btn warning">
                <span>📤</span> Export Report
              </button>
              <button className="action-btn danger">
                <span>⚠️</span> Low Stock Alert
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <h3>✨ Key Features</h3>
          <div className="features-grid">
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <h4>Dashboard</h4>
              <p>Real-time insights & analytics</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📦</span>
              <h4>Products</h4>
              <p>Complete product management</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🏢</span>
              <h4>Suppliers</h4>
              <p>Manage supplier relationships</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📈</span>
              <h4>Stock</h4>
              <p>Real-time stock tracking</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🛒</span>
              <h4>Orders</h4>
              <p>Purchase & sales orders</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📋</span>
              <h4>Reports</h4>
              <p>PDF & Excel reports</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Made with ❤️ in Sri Lanka 🇱🇰 | 
          <span className="footer-brand"> InvenZ</span> v1.0.0
        </p>
        <p className="footer-links">
          <a href="#">Dashboard</a> •
          <a href="#">Products</a> •
          <a href="#">Suppliers</a> •
          <a href="#">Reports</a>
        </p>
      </footer>
    </div>
  )
}

export default App