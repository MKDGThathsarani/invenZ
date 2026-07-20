// src/routes/categories.js
const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');

// Get all categories
router.get('/', auth, async (req, res) => {
  try {
    const { promisePool } = require('../config/database');
    const [rows] = await promisePool.query('SELECT * FROM categories ORDER BY name');
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch categories' });
  }
});

// Get single category
router.get('/:id', auth, async (req, res) => {
  try {
    const { promisePool } = require('../config/database');
    const [rows] = await promisePool.query('SELECT * FROM categories WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch category' });
  }
});

// Create category
router.post('/', auth, authorize('admin', 'manager'), async (req, res) => {
  try {
    const { name, description, icon, color } = req.body;
    const { promisePool } = require('../config/database');
    const [result] = await promisePool.query(
      'INSERT INTO categories (name, description, icon, color) VALUES (?, ?, ?, ?)',
      [name, description, icon, color]
    );
    const [rows] = await promisePool.query('SELECT * FROM categories WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create category' });
  }
});

// Update category
router.put('/:id', auth, authorize('admin', 'manager'), async (req, res) => {
  try {
    const { name, description, icon, color } = req.body;
    const { promisePool } = require('../config/database');
    const [result] = await promisePool.query(
      'UPDATE categories SET name = ?, description = ?, icon = ?, color = ? WHERE id = ?',
      [name, description, icon, color, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    const [rows] = await promisePool.query('SELECT * FROM categories WHERE id = ?', [req.params.id]);
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update category' });
  }
});

// Delete category
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const { promisePool } = require('../config/database');
    const [result] = await promisePool.query('DELETE FROM categories WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete category' });
  }
});

module.exports = router;