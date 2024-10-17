const express = require('express');
const serverless = require("serverless-http");

const mongoose = require('mongoose');
const Producto = require('./models/Producto');
const cors = require('cors');
const app = express();
const router = express.Router();
app.use(cors());

// Middleware para poder recibir JSON en las solicitudes
router.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb+srv://benito:d6P2VtPRTKqAXWEV@cluster0.vdiynua.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar con MongoDB', err));

// Ruta simple de prueba
router.get('/', (req, res) => {
    res.send('Bienvenido a mi aplicación web');
});

// Inicia el servidor

// Ruta para obtener todos los productos
router.get('/productos', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener productos', error });
    }
});

// Ruta para añadir un nuevo producto
router.post('/producto', async (req, res) => {
    const { name, brand, image, size, price, quantity, category, condition } = req.body;

    const nuevoProducto = new Producto({ name, brand, image, size, price, quantity, category, condition });

    try {
        const productoGuardado = await nuevoProducto.save();
        res.status(201).json(productoGuardado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al guardar producto', error: error.message });
    }
});

// Ruta para actualizar un producto

router.put('/:id', async (req, res) => {
    const { name, brand, image, size, price, quatity, category, condition } = req.body;

    const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, { name, brand, image, size, price, qunatity, category, condition }, { new: true });

    if (!productoActualizado) return res.status(404).json({ message: 'Producto no encontrado' });

    res.json(productoActualizado);
});

// Ruta para eliminar un producto

router.delete('/:id', async (req, res) => {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ message: 'Producto eliminado' });
  });

app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);
