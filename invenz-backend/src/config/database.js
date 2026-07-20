// invenz-backend/src/config/database.js
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'invenz_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Promisify pool for async/await
const promisePool = pool.promise();

// Connect to database
const connectDB = async () => {
  try {
    const connection = await promisePool.getConnection();
    console.log('✅ MySQL Database connected successfully!');
    connection.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = { pool, promisePool, connectDB };