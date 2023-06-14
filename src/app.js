const express = require('express');
require('dotenv').config();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { createError, notFoundError } = require('./middlewares');
const {
  usersRouter,
  productsRouter,
  dealsRouter,
  reviewsRouter,
} = require('./routers');
const { PORT, HTTP_URL } = process.env;
const port = PORT || 3005;
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static('public'));

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/deals', dealsRouter);
app.use('/api/v1/reviews', reviewsRouter);

//endpoints temporales para probar funcionamiento de los emails hasta que tengamos frontend.
app.get('/deals/:id', (req, res) => {
  res.status(200).send('página en construcción, por ahora usa el postman!');
});
app.get('/reviews/:id', (req, res) => {
  res.status(200).send('página en construcción, por ahora usa el postman!');
});
//-----

app.use(createError);
app.use(notFoundError);

app.listen(port, () => {
  console.log(`Server running at ${HTTP_URL}:${port} `);
});
