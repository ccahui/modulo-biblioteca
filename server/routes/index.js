const express = require('express');
const app = express();

// =======================================
//  Contenedor de todas las rutas
// =======================================
app.use(require('./usuario'));
app.use(require('./libro'));
app.use(require('./buscador'));
app.use(require('./upload'));
app.use(require('./archivos'));


module.exports = app;