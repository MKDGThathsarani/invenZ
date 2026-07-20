// src/controllers/productController.js
const Product = require('../models/Product');

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.getAll(req.query);
    res.json({ success: true, data: products });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
};

// Get single product
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch product' });
  }
};

// Create product
const createProduct = async (req, res) => {
  try {
    const id = await Product.create(req.body);
    const product = await Product.findById(id);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ success: false, message: 'Failed to create product' });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const updated = await Product.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    const product = await Product.findById(req.params.id);
    res.json({ success: true, data: product });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ success: false, message: 'Failed to update product' });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete product' });
  }
};

// Get low stock products
const getLowStockProducts = async (req, res) => {
  try {
    const products = await Product.getLowStock();
    res.json({ success: true, data: products });
  } catch (error) {
    console.error('Get low stock error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch low stock products' });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getLowStockProducts
};