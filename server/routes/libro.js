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
        res.render('libro/libro', {
            libros
        });

    });
});

app.get('/libro/registrar', function (req, res) {
    Libro.find({}, (err, libros) => {
        if (err) {
            console.log('Error GET: /Libro')
            libros = [];
        }
        res.render('libro/crear', {
            libros
        });

    });
});

app.get('/libro/editar', function (req, res) {
    let id = req.query.id
    console.log(id);
    Libro.findOne({
            _id: id
        })
        .exec((err, libro) => {
            if (err) {
                console.log('Error GET: /Libro/editart')
                libro = {};
            }
            res.render('libro/editar', {
                libro
            });

        });
});

app.post('/libro', function (req, res) {
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

app.post('/libro/editar', (req, res) => {

    var id = req.body.id;
    console.log(id)
    Libro.findById(id, (err, libroBuscado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }
        if (!libroBuscado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `No se pudo actualizar el libro con [id] ${id}`
                }

            });
        }
        let data = req.body;
        libroBuscado.autor = data.autor;
        libroBuscado.anio = data.anio;
        libroBuscado.editorial = data.editorial;
        libroBuscado.titulo = data.titulo;


        libroBuscado.save((err, libroGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.redirect('/libro');

        });
    });
});



module.exports = app;