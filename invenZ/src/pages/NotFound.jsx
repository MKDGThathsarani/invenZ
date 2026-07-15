import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1>Page Not Found</h1>
        <p>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="actions">
          <Link to="/" className="btn-primary">
            🏠 Go to Dashboard
          </Link>
          <Link to="/products" className="btn-secondary">
            📦 Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;