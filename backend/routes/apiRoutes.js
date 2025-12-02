// backend/routes/apiRoutes.js
const express = require('express');
const router = express.Router();

const {
  getCategories,
  getProducts,
  getUsers,
  getProductById,
  registerUser,
  loginUser, // <--- ADDED TO IMPORTS
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/apiController');

// GET ROUTES (READ)
router.get('/categories', getCategories);
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.get('/users', getUsers);

// POST ROUTES (CREATE & AUTH)
router.post('/users/register', registerUser);
router.post('/users/login', loginUser); // <--- NEW LOGIN ROUTE
router.post('/products', createProduct);

// PUT/DELETE ROUTES (UPDATE/DELETE)
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;