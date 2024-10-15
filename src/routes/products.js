const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Ruta al archivo JSON que contiene los productos
const productsFilePath = path.join(__dirname, '../data/products.json');

// Función para cargar productos desde el archivo JSON
function loadProducts() {
    if (fs.existsSync(productsFilePath)) {
        const data = fs.readFileSync(productsFilePath);
        return JSON.parse(data);
    }
    return [];
}

// Función para guardar productos en el archivo JSON
function saveProducts(products) {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
}

// Cargar los productos al iniciar
let products = loadProducts();

// Ruta GET /api/products - Obtener todos los productos
router.get('/', (req, res) => {
    res.json(products);
});

// Ruta POST /api/products - Añadir un nuevo producto
router.post('/', (req, res) => {
    const { title, description, price } = req.body;
    const newProduct = {
        id: Date.now().toString(),
        title,
        description,
        price
    };
    products.push(newProduct);
    saveProducts(products); // Guardar en el archivo JSON
    req.app.get('io').emit('productListUpdated', products); // Emitir la lista actualizada con WebSockets
    res.status(201).json(newProduct);
});

// Ruta DELETE /api/products/:id - Eliminar un producto
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    products = products.filter(p => p.id !== id);
    saveProducts(products); // Guardar en el archivo JSON
    req.app.get('io').emit('productListUpdated', products); // Emitir la lista actualizada con WebSockets
    res.status(204).send(); // Sin contenido
});

module.exports = router;
