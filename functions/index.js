const express = require('express');
const serverless = require("serverless-http");

const mongoose = require('mongoose');
const Producto = require('./models/Producto');
const cors = require('cors');
const app = express();
module.exports.handler = serverless(app);
app.use(cors());
// Exportar el handler para ser usado con Serverless Framework

const PORT = 3000;

// Middleware para poder recibir JSON en las solicitudes
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/sneackculture', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar con MongoDB', err));

// Ruta simple de prueba
app.get('/', (req, res) => {
    res.send('Bienvenido a mi aplicación web');
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
// Ruta para obtener todos los productos
app.get('/productos', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener productos' });
    }
});

// Ruta para añadir un nuevo producto
app.post('/producto', async (req, res) => {
    const { nombre, precio, stock } = req.body;

    const nuevoProducto = new Producto({ nombre, precio, stock });

    try {
        const productoGuardado = await nuevoProducto.save();
        res.status(201).json(productoGuardado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al guardar producto' });
    }
});

