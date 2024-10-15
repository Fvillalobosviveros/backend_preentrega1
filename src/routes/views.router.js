const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Función para cargar productos desde el archivo JSON
function loadProducts() {
    const productsFilePath = path.join(__dirname, '../data/products.json');
    if (fs.existsSync(productsFilePath)) {
        const data = fs.readFileSync(productsFilePath);
        return JSON.parse(data);
    }
    return [];
}

// Ruta para la vista "home" que muestra todos los productos
router.get('/', (req, res) => {
    const products = loadProducts();
    res.render('home', { products });
});

// Ruta para la vista "realTimeProducts" que muestra productos en tiempo real
router.get('/realtimeproducts', (req, res) => {
    const products = loadProducts();
    res.render('realTimeProducts', { products });
});

module.exports = router;
