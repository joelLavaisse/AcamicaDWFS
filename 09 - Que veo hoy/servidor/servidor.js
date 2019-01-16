//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var controller = require('./controladores/controller')

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/generos', controller.listarGeneros);
app.get('/peliculas/recomendacion?', controller.recomendarPeliculas);
app.get('/peliculas?', controller.mostrarPeliculas);
app.get('/peliculas/:id', controller.mostrarDetalles);

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

