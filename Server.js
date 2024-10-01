const express = require('express');
const app = express();
const PORT = 8080;

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Importar las rutas
const productRoutes = require('./src/routes/products');
const cartRoutes = require('./src/routes/carts');

// Usar las rutas
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
