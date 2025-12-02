// backend/controllers/apiController.js

const pool = require('../db');
const bcrypt = require('bcrypt');

// ===== READ: categories =====
const getCategories = (req, res) => {
  pool.query('SELECT * FROM categories')
    .then(([results]) => res.json(results))
    .catch(error => res.status(500).json({ error }));
};

// ===== READ: products (all) =====
const getProducts = (req, res) => {
  pool.query('SELECT * FROM products')
    .then(([results]) => res.json(results))
    .catch(error => res.status(500).json({ error }));
};

// ===== READ: single product by ID =====
const getProductById = (req, res) => {
    const { id } = req.params; 

    pool.query('SELECT * FROM products WHERE product_id = ?', [id])
        .then(([results]) => {
            if (results.length === 0) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(results[0]); 
        })
        .catch(error => res.status(500).json({ error }));
};

// ===== READ: users (without passwords) =====
const getUsers = (req, res) => {
  pool.query(
    'SELECT user_id, username, email, created_at FROM users'
  )
    .then(([results]) => res.json(results))
    .catch(error => res.status(500).json({ error }));
};

// ===== CREATE: user (Registration) =====
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // 1. Check if user already exists
        const [existingUser] = await pool.query('SELECT user_id FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'User with this email already exists.' });
        }

        // 2. Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // 3. Insert new user into the database
        // FIX: Changed 'password' to 'password_hash' to match your database image
        const [result] = await pool.query(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );

        res.status(201).json({
            message: 'User registered successfully',
            user_id: result.insertId,
        });

    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: 'Failed to register user', error: error.message });
    }
};

// ===== READ: user (Login/Authentication) =====
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        // 1. Find user by email
        // FIX: Changed 'password' to 'password_hash' and used 'AS password' so the rest of the code works
        const [users] = await pool.query('SELECT user_id, password_hash AS password FROM users WHERE email = ?', [email]);
        const user = users[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' }); 
        }

        // 2. Compare the submitted password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // 3. Successful login
        res.status(200).json({ 
            message: 'Login successful', 
            user_id: user.user_id 
        });

    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// ===== CREATE: product =====
const createProduct = (req, res) => {
  const { product_name, category_id, price, quantity } = req.body;

  if (!product_name || !category_id || price == null || quantity == null) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  pool.query(
    'INSERT INTO products (product_name, category_id, price, quantity) VALUES (?, ?, ?, ?)',
    [product_name, category_id, price, quantity]
  )
    .then(([result]) =>
      res.status(201).json({ 
        message: 'Product created successfully',
        product_id: result.insertId,
      })
    )
    .catch(error => res.status(500).json({ error }));
};

// ===== UPDATE: product =====
const updateProduct = (req, res) => {
  const { id } = req.params;
  const { product_name, category_id, price, quantity } = req.body;

  pool.query(
    'UPDATE products SET product_name = ?, category_id = ?, price = ?, quantity = ? WHERE product_id = ?',
    [product_name, category_id, price, quantity, id]
  )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product updated successfully' });
    })
    .catch(error => res.status(500).json({ error }));
};

// ===== DELETE: product =====
const deleteProduct = (req, res) => {
  const { id } = req.params;

  pool.query(
    'DELETE FROM products WHERE product_id = ?',
    [id]
  )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    })
    .catch(error => res.status(500).json({ error }));
};

module.exports = {
  getCategories,
  getProducts,
  getProductById,
  getUsers,
  registerUser, 
  loginUser, 
  createProduct,
  updateProduct,
  deleteProduct,
};