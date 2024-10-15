const express = require('express');
const { create } = require('express-handlebars');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const productsRouter = require('./src/routes/products');
const cartsRouter = require('./src/routes/carts');
const viewsRouter = require('./src/routes/views.router');


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set('io', io); // Hacer que io esté disponible en las rutas

// Configuración de Handlebars
const hbs = create({ extname: '.handlebars' });
app.engine('.handlebars', hbs.engine);
app.set('view engine', '.handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware para procesar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar las rutas de la API
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Conectar las rutas de vistas
app.use('/', viewsRouter);

// Inicializar el servidor
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
