const express = require('express');
const { validateAuth } = require('../../middlewares');
const {
  createProductController,
  createDealController,
} = require('../../controllers');

const productsRouter = express.Router();

productsRouter
  .route('/products/create')
  .all(validateAuth)
  .post(createProductController);

productsRouter
  .route('/:idProduct')
  .all(validateAuth)
  .post(createDealController);

module.exports = productsRouter;
