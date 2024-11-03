// src/routes/views.router.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Cart = require('../models/Cart');

router.get('/products', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { price: 1 }
    };
    const products = await Product.paginate({}, options);
    res.render('home', {
        products: products.docs,
        page: products.page,
        totalPages: products.totalPages,
        hasNextPage: products.hasNextPage,
        hasPrevPage: products.hasPrevPage,
        nextPage: products.page + 1,
        prevPage: products.page - 1
    });
});

router.get('/products/:pid', async (req, res) => {
    const product = await Product.findById(req.params.pid);
    res.render('productDetail', { product });
});

router.get('/carts/:cid', async (req, res) => {
    const cart = await Cart.findById(req.params.cid).populate('products.product');
    res.render('cartDetail', { cart });
});

module.exports = router;
