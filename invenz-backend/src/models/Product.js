// invenz-backend/src/models/Product.js
const { promisePool } = require('../config/database');

class Product {
  // Create products table
  static async createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category_id INT,
        supplier_id INT,
        name VARCHAR(200) NOT NULL,
        sku VARCHAR(50) UNIQUE NOT NULL,
        description TEXT,
        purchase_price DECIMAL(10,2) DEFAULT 0,
        selling_price DECIMAL(10,2) DEFAULT 0,
        min_stock_level INT DEFAULT 5,
        max_stock_level INT DEFAULT 100,
        current_stock INT DEFAULT 0,
        unit VARCHAR(20) DEFAULT 'pcs',
        barcode VARCHAR(100),
        image VARCHAR(255),
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
        FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE SET NULL
      )
    `;
    await promisePool.query(sql);
  }

  // Get all products
  static async getAll(filters = {}) {
    let sql = `
      SELECT p.*, 
             c.name as category_name, 
             s.name as supplier_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN suppliers s ON p.supplier_id = s.id
      WHERE 1=1
    `;
    const values = [];
    
    if (filters.category_id) {
      sql += ' AND p.category_id = ?';
      values.push(filters.category_id);
    }
    
    if (filters.search) {
      sql += ' AND (p.name LIKE ? OR p.sku LIKE ?)';
      values.push(`%${filters.search}%`, `%${filters.search}%`);
    }
    
    sql += ' ORDER BY p.created_at DESC';
    
    const [rows] = await promisePool.query(sql, values);
    return rows;
  }

  // Get product by ID
  static async findById(id) {
    const [rows] = await promisePool.query(
      `SELECT p.*, c.name as category_name, s.name as supplier_name
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       LEFT JOIN suppliers s ON p.supplier_id = s.id
       WHERE p.id = ?`,
      [id]
    );
    return rows[0];
  }

  // Get product by SKU
  static async findBySku(sku) {
    const [rows] = await promisePool.query(
      'SELECT * FROM products WHERE sku = ?',
      [sku]
    );
    return rows[0];
  }

  // Create product
  static async create(data) {
    const {
      name, sku, description, category_id, supplier_id,
      purchase_price, selling_price, min_stock_level,
      max_stock_level, current_stock, unit, barcode, image
    } = data;
    
    const [result] = await promisePool.query(
      `INSERT INTO products 
       (name, sku, description, category_id, supplier_id,
        purchase_price, selling_price, min_stock_level,
        max_stock_level, current_stock, unit, barcode, image)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, sku, description, category_id, supplier_id,
       purchase_price, selling_price, min_stock_level,
       max_stock_level, current_stock || 0, unit || 'pcs', barcode, image]
    );
    
    return result.insertId;
  }

  // Update product
  static async update(id, data) {
    const fields = [];
    const values = [];
    
    const allowedFields = [
      'name', 'sku', 'description', 'category_id', 'supplier_id',
      'purchase_price', 'selling_price', 'min_stock_level',
      'max_stock_level', 'current_stock', 'unit', 'barcode', 'image', 'is_active'
    ];
    
    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        fields.push(`${field} = ?`);
        values.push(data[field]);
      }
    }
    
    if (fields.length === 0) return false;
    
    values.push(id);
    const [result] = await promisePool.query(
      `UPDATE products SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    
    return result.affectedRows > 0;
  }

  // Delete product
  static async delete(id) {
    const [result] = await promisePool.query(
      'DELETE FROM products WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }

  // Get low stock products
  static async getLowStock() {
    const [rows] = await promisePool.query(
      `SELECT * FROM products 
       WHERE current_stock <= min_stock_level 
       ORDER BY current_stock ASC`
    );
    return rows;
  }

  // Update stock
  static async updateStock(id, quantity) {
    const [result] = await promisePool.query(
      'UPDATE products SET current_stock = current_stock + ? WHERE id = ?',
      [quantity, id]
    );
    return result.affectedRows > 0;
  }
}

// Initialize table
Product.createTable();

module.exports = Product;