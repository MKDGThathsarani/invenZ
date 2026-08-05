// src/routes/stockRoutes.js
const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  getLowStock,
  getOutOfStock,
  updateStock
} = require('../controllers/stockController');

// Make low-stock and out-of-stock endpoints public (no auth required)
router.get('/low-stock', getLowStock);
router.get('/out-of-stock', getOutOfStock);
router.put('/:id', auth, updateStock);

module.exports = router;