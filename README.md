## Codigo Fuente
Node JS conceptos generales, WebServer
Instalar con:
```
npm install
```
## Se require instalar MongoDB y que se este EJECUTANDO en el puerto 27017
```
mongod --port 27017
```
## Iniciando forma 1
Luego de la descarga de las dependencias, incluida las dependencias de DESARROLLO (nodemon):
```
npm start
```
## Iniciando forma 2
Descargar nodemon de forma global en el sistema
```
npm install -g nodemon
```
Nodemon Detectara cambios en archivos de la extensiones js, hbs y reinicira el Servidor
```
nodemon -e js,hbs app.js
```