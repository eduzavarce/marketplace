const createDealController = require('./deals/createDealController');
const {
  dealsCommunicationController,
} = require('./deals/dealsCommunicationController');
const createProductController = require('./products/createProductController');

const updateProductController = require('./products/updateProductController');
const {
  uploadProductPicturesController,
} = require('./products/uploadProductPicturesController');

const findProductByIdController = require('./products/getProductByIdController');
const findAllProductsController = require('./products/getProductsControllers');

const usersController = require('./users/getUsersController');
const loginUserController = require('./users/loginUserController');
const registerUserController = require('./users/registerUserController');
const updateUserController = require('./users/updateUsersController');
const verifyEmailController = require('./users/verifyEmailController');
const reviewDealParticipantsController = require('./reviews/reviewDealParticipantsController');
const findProductByQuery = require('./products/findProductByQuery');
const ownUserController = require('./users/getOwnUser');
const { getWishlistController } = require('./wishlist/getWishlistController');
const {
  changeWishlistController,
} = require('./wishlist/changeWishlistController');

module.exports = {
  loginUserController,
  registerUserController,
  updateUserController,
  createProductController,
  verifyEmailController,
  usersController,
  createDealController,
  findAllProductsController,
  findProductByIdController,
  dealsCommunicationController,
  updateProductController,
  uploadProductPicturesController,
  reviewDealParticipantsController,
  findProductByQuery,
  ownUserController,
  getWishlistController,
  changeWishlistController,
};
