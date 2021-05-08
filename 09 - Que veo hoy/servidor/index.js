var express = require('express');
var cors = require('cors');
var controller = require('./controladores/controller')

var app = express.Router();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get('/generos', controller.listarGeneros);
app.get('/peliculas/recomendacion?', controller.recomendarPeliculas);
app.get('/peliculas?', controller.mostrarPeliculas);
app.get('/peliculas/:id', controller.mostrarDetalles);

module.exports = app;
