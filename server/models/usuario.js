const mongoose = require('mongoose');
let Schema = mongoose.Schema;

// =======================================
//  ROLES VALIDOS
// =======================================

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    apellido: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true
    }
}, {
    collection: 'usuarios'
});

// =======================================
//  Eliminar un campo que se retorna a el frontEnd
// =======================================

module.exports = mongoose.model('Usuario', usuarioSchema);