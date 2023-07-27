const express = require('express');

const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(routes);

app.listen(8080, () => {
  console.log('Servidor iniciado em http://localhost:8080');
});
