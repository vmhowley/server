const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    name:       { type: String, required: true },
    brand:      { type: String, required: true},
    image:     { type: String, required: true},
    size:       { type: String, required: true},
    price:      { type: Number, required: true},
    quantity:   { type: Number, required: true},
    category:   { type: String, required: true},
    condition:  { type: String, required: true},
    
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
