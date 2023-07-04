const express = require('express');
const { validateAuth } = require('../../middlewares');
const {
  createProductController,
  createDealController,
  uploadProductPicturesController,
  findAllProductsController,
  findProductByIdController,
  findProductByQuery,
  productsCommunicationController,
  updateProductController,
  getProductChatDetailsByIdController,
} = require('../../controllers');

const productsRouter = express.Router();

productsRouter.route('/create').all(validateAuth).post(createProductController);
productsRouter.route('/search/?').get(findProductByQuery);
productsRouter.route('/').get(findAllProductsController);
productsRouter
  .route('/chat/:idProduct')
  .all(validateAuth)
  .post(productsCommunicationController)
  .get(getProductChatDetailsByIdController);
productsRouter
  .route('/:idProduct')
  .get(findProductByIdController)
  .all(validateAuth)
  .post(createDealController)
  .patch(updateProductController)
  .put(uploadProductPicturesController);

module.exports = productsRouter;
