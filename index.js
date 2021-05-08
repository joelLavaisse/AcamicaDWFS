const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Rutas
const cvOnline = require('./01 - CV online');
const homeBanking = require('./02 - Home banking');
const rompecabezas = require('./03 - Rompecabezas');
const pixelArt = require('./04 - Pixel art');
const ciudadZombie = require('./05 - Ciudad zombie');
const reservando = require('./06 - Reservando');
const encuestados = require('./07 - Encuestados');
const mapaInteractivo = require('./08 - Mapa Interactivo');
const queVeoHoy = require('./09 - Que veo hoy');
const peliVsPeli = require('./10 - Peli vs peli');

app.use('/cv-online', cvOnline);
app.use('/home-banking', homeBanking);
app.use('/rompecabezas', rompecabezas);
app.use('/pixel-art', pixelArt);
app.use('/ciudad-zombie', ciudadZombie);
app.use('/reservando', reservando);
app.use('/encuestados', encuestados);
app.use('/mapa-interactivo', mapaInteractivo);
app.use('/que-veo-hoy', queVeoHoy);
app.use('/peli-vs-peli', peliVsPeli);

app.use('/', (req, res) => res.send('aca toy!'));

// Listen for requests
app.listen(port, function () {
  console.log('The server is running on http://localhost:' + port);
});