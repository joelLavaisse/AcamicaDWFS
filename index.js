const express = require('express');
const path = require('path');
const queVeoHoyRoute = require('./09 - Que veo hoy/servidor/servidor');

const app = express();
const port = process.env.PORT || 3000;

app.use('/cv-online', express.static(path.join(__dirname, '01 - CV online')));
app.use('/home-banking', express.static(path.join(__dirname, '02 - Home banking')));
app.use('/rompecabezas', express.static(path.join(__dirname, '03 - Rompecabezas')));
app.use('/pixel-art', express.static(path.join(__dirname, '04 - Pixel art')));
app.use('/ciudad-zombie', express.static(path.join(__dirname, '05 - Ciudad zombie')));
app.use('/reservando', express.static(path.join(__dirname, '06 - Reservando')));
app.use('/encuestados', express.static(path.join(__dirname, '07 - Encuestados')));
app.use('/mapa-interactivo', express.static(path.join(__dirname, '08 - Mapa interactivo')));
app.use('/que-veo-hoy', express.static(path.join(__dirname, '09 - Que veo hoy/cliente')));
app.use('/peli-vs-peli', express.static(path.join(__dirname, '10 - Peli vs peli')));

// APIs proyectos 09 y 10
app.use('/api/que-veo-hoy', queVeoHoyRoute);

app.use('/', (req, res) => res.send('aca toy!'));

// Listen for requests
app.listen(port, function () {
  console.log('The server is running on http://localhost:' + port);
});