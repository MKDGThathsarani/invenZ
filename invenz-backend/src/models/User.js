// invenz-backend/src/models/User.js
const { promisePool } = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  // Create users table
  static async createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'manager', 'staff') DEFAULT 'staff',
        phone VARCHAR(20),
        avatar VARCHAR(255),
        is_active BOOLEAN DEFAULT TRUE,
        last_login DATETIME,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    await promisePool.query(sql);
  }

  // Find user by email
  static async findByEmail(email) {
    const [rows] = await promisePool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  // Find user by ID
  static async findById(id) {
    const [rows] = await promisePool.query(
      'SELECT id, name, email, role, phone, avatar, is_active, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  // Create new user
  static async create(userData) {
    const { name, email, password, role = 'staff', phone = '' } = userData;
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const [result] = await promisePool.query(
      `INSERT INTO users (name, email, password, role, phone) 
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, role, phone]
    );
    
    return result.insertId;
  }

  // Update user
  static async update(id, data) {
    const fields = [];
    const values = [];
    
    if (data.name) { fields.push('name = ?'); values.push(data.name); }
    if (data.email) { fields.push('email = ?'); values.push(data.email); }
    if (data.phone) { fields.push('phone = ?'); values.push(data.phone); }
    if (data.role) { fields.push('role = ?'); values.push(data.role); }
    if (data.is_active !== undefined) { fields.push('is_active = ?'); values.push(data.is_active); }
    
    if (fields.length === 0) return false;
    
    values.push(id);
    const [result] = await promisePool.query(
      `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    
    return result.affectedRows > 0;
  }

  // Update last login
  static async updateLastLogin(id) {
    await promisePool.query(
      'UPDATE users SET last_login = NOW() WHERE id = ?',
      [id]
    );
  }

  // Compare password
  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  // Delete user
  static async delete(id) {
    const [result] = await promisePool.query(
      'DELETE FROM users WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }

  // Get all users
  static async getAll() {
    const [rows] = await promisePool.query(
      'SELECT id, name, email, role, phone, avatar, is_active, created_at FROM users ORDER BY created_at DESC'
    );
    return rows;
  }
}

// Initialize table
User.createTable();

module.exports = User;