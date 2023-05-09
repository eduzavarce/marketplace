const createDealController = require('./deals/createDealController');
const createProductController = require('./products/createProductController');
const loginUserController = require('./users/loginUserController');
const registerUserController = require('./users/registerUserController');
const updateUserController = require('./users/updateUserController');
const verifyEmailController = require('./users/verifyEmailController');

module.exports = {
  registerUserController,
  loginUserController,
  updateUserController,
  createProductController,
  verifyEmailController,
  createDealController,
};
