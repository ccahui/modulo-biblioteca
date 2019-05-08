const mongoose = require('mongoose');
let Schema = mongoose.Schema;

// =======================================
//  Libro Esquema
// =======================================

let libroSchema = new Schema({
    titulo: {
        type: String,
        },
    autor: {
        type: String,
    }
}, {
    collection: 'libros'
});


module.exports = mongoose.model('Libro', libroSchema);