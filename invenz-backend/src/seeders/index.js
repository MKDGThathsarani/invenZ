// invenz-backend/src/seeders/index.js
const bcrypt = require('bcryptjs');
const { promisePool } = require('../config/database');

const seed = async () => {
  try {
    console.log('🌱 Seeding database...');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Insert users
    await promisePool.query(
      `INSERT IGNORE INTO users (name, email, password, role) VALUES 
       ('Admin', 'admin@invenz.com', ?, 'admin'),
       ('Manager', 'manager@invenz.com', ?, 'manager'),
       ('Staff', 'staff@invenz.com', ?, 'staff')`,
      [hashedPassword, hashedPassword, hashedPassword]
    );

    // Insert categories
    await promisePool.query(
      `INSERT IGNORE INTO categories (name, description, icon, color) VALUES 
       ('Electronics', 'Electronic items and gadgets', '💻', '#1B5E20'),
       ('Food & Beverage', 'Food products and drinks', '🍔', '#FF9800'),
       ('Clothing', 'Apparel and fashion', '👕', '#4CAF50'),
       ('Books', 'Books and publications', '📚', '#2196F3'),
       ('Home & Garden', 'Home and garden items', '🏠', '#9C27B0')`
    );

    // Insert suppliers
    await promisePool.query(
      `INSERT IGNORE INTO suppliers (name, contact_person, email, phone) VALUES 
       ('Tech Distributors Ltd', 'Mr. Kumar', 'tech@distributors.com', '011-234-5678'),
       ('Food Supply Co.', 'Mrs. Perera', 'food@supply.com', '011-345-6789'),
       ('Fashion Hub', 'Ms. Silva', 'fashion@hub.com', '011-456-7890')`
    );

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seed();