const createDealController = require('./deals/createDealController');
const createProductController = require('./products/createProductController');
const findAllProductsController = require('./products/getProductsControllers');
const usersController = require('./users/getUsersController');
const loginUserController = require('./users/loginUserController');
const registerUserController = require('./users/registerUserController');
const updateUserController = require('./users/updateUsersController');
const verifyEmailController = require('./users/verifyEmailController');

module.exports = {
  registerUserController,
  loginUserController,
  updateUserController,
  createProductController,
  verifyEmailController,
  usersController,
  createDealController,
  findAllProductsController,
};
