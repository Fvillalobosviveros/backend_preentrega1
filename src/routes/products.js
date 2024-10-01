const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

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

let products = loadProducts(); // Cargar productos al iniciar

// Ruta GET /api/products
router.get('/', (req, res) => {
  const limit = req.query.limit;
  const limitedProducts = limit ? products.slice(0, limit) : products;
  res.json(limitedProducts);
});

// Ruta GET /api/products/:pid
router.get('/:pid', (req, res) => {
  const product = products.find(p => p.id === req.params.pid);
  if (!product) return res.status(404).send('Producto no encontrado');
  res.json(product);
});

// Ruta POST /api/products
router.post('/', (req, res) => {
  const { title, description, code, price, stock, category, thumbnails = [] } = req.body;
  const newProduct = {
    id: Date.now().toString(),
    title,
    description,
    code,
    price,
    status: true,
    stock,
    category,
    thumbnails
  };
  products.push(newProduct);
  saveProducts(products); // Guardar en archivo
  res.status(201).json(newProduct);
});

// Ruta PUT /api/products/:pid
router.put('/:pid', (req, res) => {
  const product = products.find(p => p.id === req.params.pid);
  if (!product) return res.status(404).send('Producto no encontrado');
  Object.assign(product, req.body);
  saveProducts(products); // Guardar cambios
  res.json(product);
});

// Ruta DELETE /api/products/:pid
router.delete('/:pid', (req, res) => {
  products = products.filter(p => p.id !== req.params.pid);
  saveProducts(products); // Guardar en archivo
  res.status(204).send();
});

module.exports = router;
