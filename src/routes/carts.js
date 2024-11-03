// src/routes/carts.js
const express = require('express');
const router = express.Router();
const cartsController = require('../controller/cartsController');

router.get('/:cid', cartsController.getCartById);
router.post('/:cid/products/:pid', cartsController.addProductToCart);
router.put('/:cid/products/:pid', cartsController.updateProductQuantityInCart);
router.delete('/:cid/products/:pid', cartsController.deleteProductFromCart);
router.delete('/:cid', cartsController.clearCart);

module.exports = router;
