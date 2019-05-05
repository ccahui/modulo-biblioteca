const express = require('express');
const app = express();

// =======================================
//  Metodos
// =======================================

app.get('/usuario', function (req, res) {
    res.render('home', {
        nombre: 'Cristian Cahui /Usuario',
    });
})
module.exports = app;