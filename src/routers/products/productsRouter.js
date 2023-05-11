const express = require('express');
const { validateAuth } = require('../../middlewares');
const {
  createProductController,
  createDealController,
  uploadProductPicturesController,
  findAllProductsController,
  findProductByIdController,
} = require('../../controllers');
const updateProductController = require('../../controllers/products/updateProductController');

const productsRouter = express.Router();

productsRouter.route('/create').all(validateAuth).post(createProductController);
productsRouter.route('/').get(findAllProductsController);
productsRouter
  .route('/:idProduct')
  .get(findProductByIdController)
  .all(validateAuth)
  .post(createDealController)
  .patch(updateProductController)
  .put(uploadProductPicturesController);

module.exports = productsRouter;
