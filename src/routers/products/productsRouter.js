const express = require('express');
const { validateAuth } = require('../../middlewares');
const {
  createProductController,
  createDealController,
  findAllProductsController,
} = require('../../controllers');

const productsRouter = express.Router();

productsRouter.route('/create').all(validateAuth).post(createProductController);
productsRouter.route('/').get(findAllProductsController);
productsRouter
  .route('/:idProduct')
  .all(validateAuth)
  .post(createDealController);

module.exports = productsRouter;
