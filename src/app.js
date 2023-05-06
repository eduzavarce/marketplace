const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { createError, notFoundError } = require('./middlewares');
const { PORT, HTTP_URL } = process.env;
const app = express();
app.use(cors);
console.log('hola');
//endpoints
app.get('/', (req, res, next) => {
  res.send();
});
//errores

//app.use(createError);
app.use(notFoundError);

app.listen(PORT, () => {
  console.log(`Server running at ${HTTP_URL}:${PORT} `);
});
