// src/routes/stockRoutes.js
const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  getLowStock,
  getOutOfStock,
  updateStock
} = require('../controllers/stockController');

router.get('/low-stock', auth, getLowStock);
router.get('/out-of-stock', auth, getOutOfStock);
router.put('/:id', auth, updateStock);

module.exports = router;