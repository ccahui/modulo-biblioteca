const express = require('express');
const app = express();

// =======================================
//  Contenedor de todas las rutas
// =======================================
app.use(require('./usuario'));
app.use(require('./libro'));
app.use(require('./buscador'));

module.exports = app;