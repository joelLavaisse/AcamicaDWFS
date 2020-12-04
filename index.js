const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

//tell express that we want to use the www folder
//for our static assets
app.use('/cv-online', express.static(path.join(__dirname, '01 - CV online')));
app.use('/home-banking', express.static(path.join(__dirname, '02 - Home banking')));
app.use('/', (req, res) => res.send('aca toy!'));

// Listen for requests
app.listen(port, function () {
  console.log('The server is running on http://localhost:' + port);
});