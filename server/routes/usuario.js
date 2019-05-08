const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
// =======================================
//  Metodos
// =======================================

app.get('/usuario', function (req, res) {

    Usuario.find({}, (err, usuarios) => {
        if (err) {
            console.log('Error GET: /usuario')
            usuarios = [];
        }
        res.render('usuario/usuario', {
            usuarios
        });

    });
})
app.post('/usuario',function(req, res){
    let data = req.body;
    console.log(data)
    let usuario = new Usuario(data);

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.redirect('/usuario')
    });
});


module.exports = app;