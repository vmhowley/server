const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    image: { type: String, required: true},
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
