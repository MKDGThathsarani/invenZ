// src/controllers/stockController.js
const Product = require('../models/Product');

// Get low stock items
const getLowStock = async (req, res) => {
  try {
    const products = await Product.getLowStock();
    res.json({ products, count: products.length });
  } catch (error) {
    console.error('Get low stock error:', error);
    res.status(500).json({ message: 'Failed to get low stock items' });
  }
};

// Get out of stock items
const getOutOfStock = async (req, res) => {
  try {
    const products = await Product.getOutOfStock();
    res.json({ products, count: products.length });
  } catch (error) {
    console.error('Get out of stock error:', error);
    res.status(500).json({ message: 'Failed to get out of stock items' });
  }
};

// Update stock
const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const updatedProduct = await Product.updateStock(id, stock);
    res.json({
      success: true,
      message: 'Stock updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    console.error('Update stock error:', error);
    res.status(500).json({ message: 'Failed to update stock' });
  }
};

module.exports = { getLowStock, getOutOfStock, updateStock };