// server.js - SIMPLE VERSION
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./src/routes/auth');
const productRoutes = require('./src/routes/products');
const errorHandler = require('./src/middleware/error');
const { connectDB } = require('./src/config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// Routes - Only Auth and Products
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'InvenZ API is running' });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 InvenZ Backend running on http://localhost:${PORT}`);
  console.log(`📚 Health Check: http://localhost:${PORT}/api/health`);
});