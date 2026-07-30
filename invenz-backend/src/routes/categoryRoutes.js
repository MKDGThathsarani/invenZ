// invenZ-backend/src/routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

// Get all categories
router.get('/', auth, async (req, res) => {
  try {
    const { pool } = require('../config/database');
    const [rows] = await pool.execute(
      'SELECT DISTINCT category FROM products WHERE category IS NOT NULL AND category != ""'
    );
    const categories = rows.map(row => row.category);
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Failed to get categories' });
  }
});

module.exports = router;