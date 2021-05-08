var express = require('express');
const path = require('path');

var app = express.Router();

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/imagenes', express.static(path.join(__dirname, 'imagenes')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/', express.static(path.join(__dirname, 'html')));

module.exports = app;
