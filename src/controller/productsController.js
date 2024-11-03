// src/controller/productsController.js
const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;
        let filter = {};
        
        if (query) {
            filter = { $or: [{ category: query }, { available: query }] };
        }

        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {}
        };

        const products = await Product.paginate(filter, options);
        
        res.json({
            status: "success",
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.hasPrevPage ? products.page - 1 : null,
            nextPage: products.hasNextPage ? products.page + 1 : null,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `/api/products?page=${products.page - 1}` : null,
            nextLink: products.hasNextPage ? `/api/products?page=${products.page + 1}` : null
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.pid);
        if (!product) {
            return res.status(404).json({ status: "error", message: "Producto no encontrado" });
        }
        res.json({ status: "success", payload: product });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};
