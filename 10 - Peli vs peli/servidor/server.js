var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var controller = require('./controladores/controller');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());

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

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});