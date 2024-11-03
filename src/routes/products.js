// src/routes/products.js
const express = require('express');
const router = express.Router();
const productsController = require('../controller/productsController');

router.get('/', productsController.getProducts);
router.get('/:pid', productsController.getProductById);

module.exports = router;
