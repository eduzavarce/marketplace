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
  wishlistRouter,
} = require('./routers');
const morgan = require('morgan');
const { PORT, HTTP_URL } = process.env;
const port = PORT || 3005;
const app = express();
app.use(cors());
app.use(morgan('tiny'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static('public'));

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/deals', dealsRouter);
app.use('/api/v1/reviews', reviewsRouter);
app.use('/api/v1/wishlist', wishlistRouter);

app.use(createError);
app.use(notFoundError);

app.listen(port, () => {
  console.log(`Server running at ${HTTP_URL}:${port} `);
});
