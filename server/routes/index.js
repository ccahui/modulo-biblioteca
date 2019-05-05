const express = require('express');
const app = express();

// =======================================
//  Contenedor de todas las rutas
// =======================================
app.use(require('./usuario'));

module.exports = app;