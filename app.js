const express = require('express')
const app = express()
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./hbs/helpers');
require('./server/config/config');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());


const PORT = process.env.PORT || 3000;

// =======================================
//  Conexion con la DB
// =======================================
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.URI_DB, (err) => {
    if (err) {
        console.log('ERROR');
        throw err;
    }
    console.log("Base de datos \x1b[32m%s\x1b[0m", 'ONLINE')
});

// Middleware, el cliente se servira de toda la carpeta
app.use(express.static(__dirname + '/public'));
// Express HBS
hbs.registerPartials(__dirname + '/views/components');
app.set('view engine', 'hbs');
// Helpers

// RUTAS DE USUARIO Y DEMAS
app.use(require('./server/routes/index'))

app.get('/', function (req, res) {
    res.render('home', {
        nombre: 'Cristian Cahui',
    });
})



app.listen(PORT, () => {
    console.log(`Escuchando con el puerto ${ PORT }`);
})