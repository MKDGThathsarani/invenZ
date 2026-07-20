// invenz-backend/src/routes/products.js
const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getLowStockProducts
} = require('../controllers/productController');

// Public (authenticated) routes
router.get('/', auth, getProducts);
router.get('/low-stock', auth, getLowStockProducts);
router.get('/:id', auth, getProduct);

// Admin only routes
router.post('/', auth, authorize('admin', 'manager'), createProduct);
router.put('/:id', auth, authorize('admin', 'manager'), updateProduct);
router.delete('/:id', auth, authorize('admin'), deleteProduct);

module.exports = router;