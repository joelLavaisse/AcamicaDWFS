var express = require('express');
var cors = require('cors');
var controller = require('./controladores/controller');

var app = express.Router();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get("/generos", controller.listarGeneros);
app.get("/directores", controller.listarDirectores);
app.get("/actores", controller.listarActores);
app.get("/competencias/:id/peliculas", controller.obtenerOpciones);
app.post("/competencias/:id/voto", controller.votar);
app.get("/competencias/:id/resultados", controller.obtenerResultados);
app.get("/competencias/:id", controller.obtenerCompetencia);
app.get("/competencias", controller.listarCompetencias);
app.post("/competencias", controller.crearCompetencia);
app.put("/competencias/:id", controller.editarCompetencia);
app.delete("/competencias/:id/votos", controller.eliminarVotos);
app.delete("/competencias/:id", controller.eliminarCompetencia);

module.exports = app;
