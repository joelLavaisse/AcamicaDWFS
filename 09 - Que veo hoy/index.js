const express = require('express');

const app = express();

// Rutas
const cliente = require('./cliente');
const servidor = require('./servidor');

app.use('/api', servidor);
app.use('/', cliente);

module.exports = app;
