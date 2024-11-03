// src/controller/cartsController.js
const Cart = require('../models/Cart');

exports.getCartById = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid).populate('products.product');
        if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
        }
        res.json({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

exports.addProductToCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid);
        const product = cart.products.find(p => p.product.toString() === req.params.pid);
        if (product) {
            product.quantity += req.body.quantity || 1;
        } else {
            cart.products.push({ product: req.params.pid, quantity: req.body.quantity || 1 });
        }
        await cart.save();
        res.json({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

exports.updateProductQuantityInCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid);
        const product = cart.products.find(p => p.product.toString() === req.params.pid);
        if (product) {
            product.quantity = req.body.quantity;
            await cart.save();
            res.json({ status: "success", payload: cart });
        } else {
            res.status(404).json({ status: "error", message: "Producto no encontrado en el carrito" });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

exports.deleteProductFromCart = async (req, res) => {
    try {
        await Cart.findByIdAndUpdate(req.params.cid, { $pull: { products: { product: req.params.pid } } });
        res.json({ status: "success", message: "Producto eliminado del carrito" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

exports.clearCart = async (req, res) => {
    try {
        await Cart.findByIdAndUpdate(req.params.cid, { products: [] });
        res.json({ status: "success", message: "Carrito vacío" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};
