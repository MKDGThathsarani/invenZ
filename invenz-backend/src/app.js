// src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const stockRoutes = require('./routes/stockRoutes');

// Middleware
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/stock', stockRoutes);

// ✅ Temporary fix for missing routes - return empty data
app.get('/api/orders/purchase', (req, res) => {
  res.json({ orders: [], count: 0 });
});
app.get('/api/orders/sales', (req, res) => {
  res.json({ orders: [], count: 0 });
});
app.get('/api/orders/stats', (req, res) => {
  res.json({ total: 0, pending: 0, completed: 0 });
});
app.get('/api/stock/movements', (req, res) => {
  res.json({ movements: [], count: 0 });
});
app.get('/api/stock/overview', (req, res) => {
  res.json({ totalItems: 0, totalValue: 0, lowStock: 0 });
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Error Handler
app.use(errorHandler);

module.exports = app;