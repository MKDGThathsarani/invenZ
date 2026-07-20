import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * PublicRoute Component
 * Redirects to dashboard if user is already authenticated
 * Used for pages like Login, Register, ForgotPassword
 */
const PublicRoute = ({ children, redirectTo = '/' }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading spinner while checking auth status
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // If user is authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // If not authenticated, render the public page
  return children;
};

export default PublicRoute;