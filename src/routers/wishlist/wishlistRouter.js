const express = require('express');
const { validateAuth } = require('../../middlewares');
const {
  getWishlistController,
  changeWishlistController,
} = require('../../controllers');

const wishlistRouter = express.Router();
wishlistRouter.route('/').all(validateAuth).get(getWishlistController);
wishlistRouter
  .route('/:idProduct')
  .all(validateAuth)
  .post(changeWishlistController);

module.exports = wishlistRouter;
