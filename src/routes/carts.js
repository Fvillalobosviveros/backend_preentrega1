const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Ruta al archivo JSON que contiene los carritos
const cartsFilePath = path.join(__dirname, '../data/carts.json');

// Función para cargar carritos desde el archivo JSON
function loadCarts() {
    if (fs.existsSync(cartsFilePath)) {
        const data = fs.readFileSync(cartsFilePath);
        return JSON.parse(data);
    }
    return [];
}

// Función para guardar carritos en el archivo JSON
function saveCarts(carts) {
    fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
}

let carts = loadCarts(); // Cargar los carritos al iniciar

// Ruta GET /api/carts/:cid - Obtener un carrito específico
router.get('/:cid', (req, res) => {
    const cart = carts.find(c => c.id === req.params.cid);
    if (!cart) return res.status(404).send('Carrito no encontrado');
    res.json(cart);
});

// Ruta POST /api/carts - Crear un nuevo carrito
router.post('/', (req, res) => {
    const newCart = {
        id: Date.now().toString(),
        products: []
    };
    carts.push(newCart);
    saveCarts(carts); // Guardar en archivo JSON
    res.status(201).json(newCart);
});

// Ruta POST /api/carts/:cid/product/:pid - Agregar un producto a un carrito
router.post('/:cid/product/:pid', (req, res) => {
    const cart = carts.find(c => c.id === req.params.cid);
    if (!cart) return res.status(404).send('Carrito no encontrado');

    const { quantity = 1 } = req.body;
    const productIndex = cart.products.findIndex(p => p.id === req.params.pid);

    if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity;
    } else {
        cart.products.push({ id: req.params.pid, quantity });
    }

    saveCarts(carts); // Guardar en archivo JSON
    res.status(201).json(cart);
});

module.exports = router;
