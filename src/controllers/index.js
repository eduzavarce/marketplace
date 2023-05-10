const createDealController = require('./deals/createDealController');
const createProductController = require('./products/createProductController');
const usersController = require('./users/getUsersController');
const loginUserController = require('./users/loginUserController');
const registerUserController = require('./users/registerUserController');
const updateUserController = require('./users/updateUsersController');
const verifyEmailController = require('./users/verifyEmailController');

module.exports = {
  loginUserController,
  registerUserController,
  updateUserController,
  createProductController,
  verifyEmailController,
  usersController,
  createDealController,
};
