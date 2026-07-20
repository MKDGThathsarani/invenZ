import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// Pages
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import Suppliers from '../pages/Suppliers';
import Stock from '../pages/Stock';
import Orders from '../pages/Orders';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* ============================================
          PUBLIC ROUTES (No authentication required)
          ============================================ */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } 
      />
      
      <Route 
        path="/forgot-password" 
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        } 
      />

      {/* ============================================
          PRIVATE ROUTES (Authentication required)
          ============================================ */}
      <Route 
        path="/" 
        element={
          <PrivateRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/products" 
        element={
          <PrivateRoute>
            <Layout>
              <Products />
            </Layout>
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/products/:id" 
        element={
          <PrivateRoute>
            <Layout>
              <Products />
            </Layout>
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/suppliers" 
        element={
          <PrivateRoute>
            <Layout>
              <Suppliers />
            </Layout>
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/suppliers/:id" 
        element={
          <PrivateRoute>
            <Layout>
              <Suppliers />
            </Layout>
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/stock" 
        element={
          <PrivateRoute>
            <Layout>
              <Stock />
            </Layout>
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/stock/movements" 
        element={
          <PrivateRoute>
            <Layout>
              <Stock />
            </Layout>
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/orders" 
        element={
          <PrivateRoute>
            <Layout>
              <Orders />
            </Layout>
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/orders/purchase" 
        element={
          <PrivateRoute>
            <Layout>
              <Orders />
            </Layout>
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/orders/sales" 
        element={
          <PrivateRoute>
            <Layout>
              <Orders />
            </Layout>
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/reports" 
        element={
          <PrivateRoute>
            <Layout>
              <Reports />
            </Layout>
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/settings" 
        element={
          <PrivateRoute>
            <Layout>
              <Settings />
            </Layout>
          </PrivateRoute>
        } 
      />

      {/* ============================================
          404 NOT FOUND
          ============================================ */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;