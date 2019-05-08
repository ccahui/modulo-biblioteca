const express = require('express');
const app = express();
const Libro = require('../models/libro');
// =======================================
//  Metodos
// =======================================

app.get('/libro', function (req, res) {

    Libro.find({}, (err, libros) => {
        if (err) {
            console.log('Error GET: /Libro')
            libros = [];
        }
        res.render('libro', {
            libros
        });

    });
})
app.post('/libro',function(req, res){
    let data = req.body;
    console.log(data)
    let libro = new Libro(data);

    libro.save((err, libroDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.redirect('/libro')
    });
});


module.exports = app;