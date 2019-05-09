const express = require('express');
const app = express();
const Libro = require('../models/libro');
// =======================================
//  Metodos
// =======================================

app.get('/buscar/libro/:busqueda', function (req, res) {
    var busqueda = req.params.busqueda;
    var regExp = new RegExp(busqueda, 'i'); // Busqueda de coincidencia  
    console.log(busqueda);


    Libro.find({})
        .or([{
            'titulo': regExp
        }, {
            'autor': regExp
        },  {
            'anio': regExp
        }, {
            'editorial': regExp
        }]).exec((err, libros) => {
            if (err) {
                console.log('Error GET: /buscar/libro:busqueda')
                libros = [];
            }
            res.render('buscador/buscador',{ 
                busqueda,
                libros
            });


        });


});


module.exports = app;