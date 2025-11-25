const express = require('express');
const router = express.Router();

const {
  getCategories,
  getProducts,
  getUsers
} = require('../controllers/apiController');

router.get('/categories', getCategories);
router.get('/products', getProducts);
router.get('/users', getUsers);

module.exports = router;
