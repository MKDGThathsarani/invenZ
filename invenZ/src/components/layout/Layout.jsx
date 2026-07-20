// src/components/layout/Layout.jsx
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';  // ✅ Footer Import කරන්න
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="layout-body">
        <Sidebar />
        <main className="layout-content">{children}</main>
      </div>
      <Footer />  {/* ✅ Footer Add කරන්න */}
    </div>
  );
};

export default Layout;