const express = require('express');
const app = express();

// =======================================
//  Metodos
// =======================================

app.get('/usuario', function (req, res) {
    res.render('usuario', {
        nombre: 'Cristian Cahui /Usuario',
        people: [
            {firstName: "Yehuda", lastName: "Katz"},
            {firstName: "Carl", lastName: "Lerche"},
            {firstName: "Alan", lastName: "Johnson"}
          ]
    });
})
module.exports = app;