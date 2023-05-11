const express = require('express');
const { validateAuth } = require('../../middlewares');
const {
  createProductController,
  createDealController,
  findAllProductsController,
} = require('../../controllers');
const updateProductController = require('../../controllers/products/updateProductController');

const productsRouter = express.Router();

productsRouter.route('/create').all(validateAuth).post(createProductController);
productsRouter.route('/').get(findAllProductsController);
productsRouter
  .route('/:idProduct')
  .all(validateAuth)
  .post(createDealController)
  .patch(updateProductController);

module.exports = productsRouter;
