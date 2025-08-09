const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get all products with optional search and filter
router.get('/products', productController.getProducts);

// Get a single product by ID
router.get('/products/:id', productController.getProductById);

module.exports = router;