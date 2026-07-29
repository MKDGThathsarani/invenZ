// src/models/Product.js
const { pool } = require('../config/database');

class Product {
  static async create(productData) {
    const {
      name, sku, category, supplier, description,
      purchasePrice, sellingPrice, currentStock,
      minStock, maxStock, unit, createdBy
    } = productData;

    const [result] = await pool.execute(
      `INSERT INTO products 
       (name, sku, category, supplier, description, 
        purchase_price, selling_price, current_stock, 
        min_stock, max_stock, unit, created_by) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, sku, category, supplier, description,
       purchasePrice, sellingPrice, currentStock,
       minStock, maxStock, unit, createdBy]
    );

    return this.findById(result.insertId);
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      `SELECT p.*, u.name as created_by_name 
       FROM products p 
       LEFT JOIN users u ON p.created_by = u.id 
       WHERE p.id = ?`,
      [id]
    );
    return rows[0] || null;
  }

  static async findAll(filters = {}) {
    let sql = `SELECT p.*, u.name as created_by_name 
               FROM products p 
               LEFT JOIN users u ON p.created_by = u.id 
               WHERE 1=1`;
    const params = [];

    if (filters.category) {
      sql += ' AND p.category = ?';
      params.push(filters.category);
    }

    if (filters.search) {
      sql += ' AND (p.name LIKE ? OR p.sku LIKE ?)';
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    if (filters.status) {
      sql += ' AND p.status = ?';
      params.push(filters.status);
    }

    sql += ' ORDER BY p.created_at DESC';

    const [rows] = await pool.execute(sql, params);
    return rows;
  }

  static async update(id, productData) {
    const {
      name, sku, category, supplier, description,
      purchasePrice, sellingPrice, currentStock,
      minStock, maxStock, unit
    } = productData;

    await pool.execute(
      `UPDATE products SET 
       name = ?, sku = ?, category = ?, supplier = ?, 
       description = ?, purchase_price = ?, selling_price = ?,
       current_stock = ?, min_stock = ?, max_stock = ?, unit = ?
       WHERE id = ?`,
      [name, sku, category, supplier, description,
       purchasePrice, sellingPrice, currentStock,
       minStock, maxStock, unit, id]
    );

    return this.findById(id);
  }

  static async delete(id) {
    await pool.execute('DELETE FROM products WHERE id = ?', [id]);
    return true;
  }

  static async updateStock(id, newStock) {
    await pool.execute(
      'UPDATE products SET current_stock = ? WHERE id = ?',
      [newStock, id]
    );
    return this.findById(id);
  }

  static async getLowStock() {
    const [rows] = await pool.execute(
      'SELECT * FROM products WHERE current_stock <= min_stock'
    );
    return rows;
  }

  static async getOutOfStock() {
    const [rows] = await pool.execute(
      'SELECT * FROM products WHERE current_stock <= 0'
    );
    return rows;
  }

  static async getCategories() {
    const [rows] = await pool.execute(
      'SELECT DISTINCT category FROM products WHERE category IS NOT NULL AND category != ""'
    );
    return rows.map(row => row.category);
  }
}

module.exports = Product;