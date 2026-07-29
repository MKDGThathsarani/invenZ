-- ============================================================
-- DATABASE: invenz_db
-- ============================================================
CREATE DATABASE IF NOT EXISTS invenz_db;
USE invenz_db;

-- ============================================================
-- TABLE: users
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'manager', 'staff') DEFAULT 'staff',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================
-- TABLE: products
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  sku VARCHAR(50) UNIQUE NOT NULL,
  category VARCHAR(100),
  supplier VARCHAR(200),
  description TEXT,
  purchase_price DECIMAL(10,2) DEFAULT 0,
  selling_price DECIMAL(10,2) DEFAULT 0,
  current_stock INT DEFAULT 0,
  min_stock INT DEFAULT 5,
  max_stock INT DEFAULT 100,
  unit VARCHAR(20) DEFAULT 'pcs',
  status ENUM('active', 'inactive', 'discontinued') DEFAULT 'active',
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- ============================================================
-- TABLE: categories (Optional - for better category management)
-- ============================================================
CREATE TABLE IF NOT EXISTS categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- INSERT DEMO USERS
-- Password: admin123 (hashed)
-- ============================================================
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@invenz.com', '$2a$10$Yh8sF3XqZVnU3M.d5zXJyehGKmMkLQyZqGqZqGqZqGqZqGqZqGqZq', 'admin'),
('Manager User', 'manager@invenz.com', '$2a$10$Yh8sF3XqZVnU3M.d5zXJyehGKmMkLQyZqGqZqGqZqGqZqGqZqGqZq', 'manager'),
('Staff User', 'staff@invenz.com', '$2a$10$Yh8sF3XqZVnU3M.d5zXJyehGKmMkLQyZqGqZqGqZqGqZqGqZqGqZq', 'staff');

-- ============================================================
-- INSERT DEMO PRODUCTS
-- ============================================================
INSERT INTO products (name, sku, category, supplier, description, purchase_price, selling_price, current_stock, min_stock, max_stock, unit) VALUES
('Laptop', 'LAP-001', 'Electronics', 'Tech Distributors Ltd', 'High-performance laptop for professionals.', 85000.00, 95000.00, 45, 5, 100, 'pcs'),
('Wireless Mouse', 'MOU-001', 'Electronics', 'Tech Distributors Ltd', 'Ergonomic wireless mouse with long battery life.', 2500.00, 3500.00, 120, 10, 200, 'pcs'),
('Organic Rice', 'RIC-001', 'Food', 'Food Supply Co.', 'Premium organic rice 5kg pack.', 850.00, 1200.00, 3, 10, 50, 'kg'),
('Gaming Keyboard', 'KEY-001', 'Electronics', 'Tech Distributors Ltd', 'Mechanical gaming keyboard with RGB lights.', 12000.00, 15000.00, 25, 5, 80, 'pcs'),
('Notebook', 'NB-001', 'Books', 'Book World', 'Premium quality notebook 200 pages.', 250.00, 350.00, 150, 20, 300, 'pcs'),
('T-Shirt', 'TS-001', 'Clothing', 'Fashion Hub', 'Cotton t-shirt, size M.', 800.00, 1200.00, 60, 10, 150, 'pcs');

-- ============================================================
-- INSERT DEMO CATEGORIES
-- ============================================================
INSERT INTO categories (name, description) VALUES
('Electronics', 'Electronic devices and accessories'),
('Food', 'Food and grocery items'),
('Clothing', 'Apparel and fashion items'),
('Books', 'Books and stationery'),
('Home & Garden', 'Home and garden products');

-- ============================================================
-- VIEW: product_list (with user names)
-- ============================================================
CREATE OR REPLACE VIEW product_list AS
SELECT 
  p.*,
  u.name AS created_by_name,
  u.email AS created_by_email
FROM products p
LEFT JOIN users u ON p.created_by = u.id;

-- ============================================================
-- SHOW TABLES
-- ============================================================
SHOW TABLES;

-- ============================================================
-- SELECT ALL DATA (for testing)
-- ============================================================
SELECT '=== USERS ===' AS '';
SELECT * FROM users;

SELECT '=== PRODUCTS ===' AS '';
SELECT * FROM products;

SELECT '=== CATEGORIES ===' AS '';
SELECT * FROM categories;