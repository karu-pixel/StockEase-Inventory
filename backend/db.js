// backend/db.js
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Make sure you have a .env file in your backend folder with these variables:
// DB_HOST=localhost
// DB_USER=your_db_username
// DB_PASSWORD=your_db_password
// DB_NAME=your_db_name

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',      // fallback username
  password: process.env.DB_PASSWORD || '',  // fallback password
  database: process.env.DB_NAME || 'stockease',  // fallback database
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Export promise-based pool
module.exports = pool.promise();
