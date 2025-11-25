const pool = require('../db');

// Fetch all categories
const getCategories = (req, res) => {
  pool.query('SELECT * FROM categories', (error, results) => {
    if (error) return res.status(500).json({ error });
    res.json(results);
  });
};

// Fetch all products
const getProducts = (req, res) => {
  pool.query('SELECT * FROM products', (error, results) => {
    if (error) return res.status(500).json({ error });
    res.json(results);
  });
};

// Fetch all users (without passwords for security)
const getUsers = (req, res) => {
  pool.query('SELECT user_id, username, email, created_at FROM users', (error, results) => {
    if (error) return res.status(500).json({ error });
    res.json(results);
  });
};

module.exports = {
  getCategories,
  getProducts,
  getUsers,
};
