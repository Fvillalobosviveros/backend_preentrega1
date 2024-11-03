// app.js
const express = require('express');
const mongoose = require('mongoose');
const { create } = require('express-handlebars');
const productsRouter = require('./src/routes/products');
const cartsRouter = require('./src/routes/carts');
const viewsRouter = require('./src/routes/views.router');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Conectado a MongoDB'))
  .catch(error => console.error('Error de conexión:', error));

app.engine('.handlebars', create({ extname: '.handlebars' }).engine);
app.set('view engine', '.handlebars');
app.set('views', './views');

app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
