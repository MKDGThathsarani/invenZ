// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { 
  AuthProvider, 
  NotificationProvider, 
  ProductProvider, 
  SupplierProvider, 
  StockProvider, 
  OrderProvider,
  ThemeProvider 
} from './context';
import './App.css';

// Import all pages
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import ProductDetails from './pages/ProductDetails';
import Suppliers from './pages/Suppliers';
import AddSupplier from './pages/AddSupplier';
import SupplierDetails from './pages/SupplierDetails';
import Stock from './pages/Stock';
import StockMovements from './pages/StockMovements';
import Orders from './pages/Orders';
import PurchaseOrders from './pages/PurchaseOrders';
import SalesOrders from './pages/SalesOrders';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <ProductProvider>
            <SupplierProvider>
              <StockProvider>
                <OrderProvider>
                  <BrowserRouter>
                    <Routes>
                      {/* Dashboard */}
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      
                      {/* Products */}
                      <Route path="/products" element={<Products />} />
                      <Route path="/products/add" element={<AddProduct />} />
                      <Route path="/products/edit/:id" element={<EditProduct />} />
                      <Route path="/products/:id" element={<ProductDetails />} />
                      
                      {/* Suppliers */}
                      <Route path="/suppliers" element={<Suppliers />} />
                      <Route path="/suppliers/add" element={<AddSupplier />} />
                      <Route path="/suppliers/:id" element={<SupplierDetails />} />
                      
                      {/* Stock */}
                      <Route path="/stock" element={<Stock />} />
                      <Route path="/stock/movements" element={<StockMovements />} />
                      
                      {/* Orders */}
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/orders/purchase" element={<PurchaseOrders />} />
                      <Route path="/orders/sales" element={<SalesOrders />} />
                      
                      {/* Reports */}
                      <Route path="/reports" element={<Reports />} />
                      
                      {/* Settings */}
                      <Route path="/settings" element={<Settings />} />
                      
                      {/* Auth */}
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />
                      
                      {/* 404 */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </BrowserRouter>
                </OrderProvider>
              </StockProvider>
            </SupplierProvider>
          </ProductProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;