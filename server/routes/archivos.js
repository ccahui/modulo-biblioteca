const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// =======================================
//  Ver documentos
// =======================================
app.get('/archivos', (req, res) => {

    let archivo = req.query.id

    let pathImg = path.resolve(__dirname, `../../uploads/${archivo}`);

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        pathNoImg = path.resolve(__dirname,'../assets/pdf-no-encontrado.png');
        res.sendFile(pathNoImg);
    }
});



module.exports = app;