const express = require('express');
// =======================================
//  express-fileupload 1.1.1 alpha se presento  errores,
//  debido a esto se uso una version anterior la 1.0.0 para la carga de archivos
// =======================================
const fileUpload = require('express-fileupload');
const app = express();
const path = require('path');
const extensionesValidas = ['pdf'];
const fs = require('fs');

const Libro = require('../models/libro');

app.use(fileUpload());


app.post('/upload/libro', (req, res) => {

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Ningun archivo seleccionado'
            }
        });
    }

    let archivo = req.files.archivo;
    let extension = extensionValida(archivo.name);
    if (!extension) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extension no valida',
            errors: {
                messaje: ' Las extensiones validas son ' + extensionesValidas.join(', ')
            }
        });
    }



    let id = req.body.id; // Id de Libro
    var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;
    let pathNuevo = path.resolve(__dirname, `../../uploads/${nombreArchivo}`);

        archivoLibro(id, nombreArchivo, archivo, pathNuevo, res);


});

// =======================================
//  Verifica si tiene extencion png, jpg, gif, jpeg
//  Retorna NULL si no pertene al array
// =======================================
function extensionValida(nombre) {

    var nombreSplit = nombre.split('.'); // Nombre del Archivo
    var extension = nombreSplit[nombreSplit.length - 1]; // Extension del Archivo

    if (extensionesValidas.indexOf(extension) < 0) {
        return null;
    }
    return extension;
}



// =======================================
//  Subir Archivo Producto
// =======================================
function archivoLibro(id, nombreArchivo, archivo, pathNuevo, res) {

    Libro.findById(id, (err, libro) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al buscar Libro [id]",
                err
            });
        }
        if (!libro) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El libro con el id ' + id + ' no existe',
                err: {
                    message: 'No existe un libro con ese ID'
                }

            });
        }

        archivo.mv(pathNuevo, err => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al mover Archivo',
                    err
                });
            }
            let pathViejo = path.resolve(__dirname, `../../uploads/${libro.pdf}`);
            eliminarArchivo(pathViejo);

            libro.pdf = nombreArchivo;
            libro.save((err, libroActualizado) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al actualizar pdf de Libro',
                        err
                    });
                }
                return res.redirect("/libro")
            });
        });

    });
}
// =======================================
//  Elimina archivo si existe
// =======================================

function eliminarArchivo(path) {
    console.log(path)
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}
module.exports = app;