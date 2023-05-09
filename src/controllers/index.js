const createProductController = require('./products/createProductController');
const loginUserController = require('./users/loginUserController');
const registerUserController = require('./users/registerUserController');
const getUsersController = require('./users/getUsersController');
const updateUserController = require('./users/updateUsersController');
const verifyEmailController = require('./users/verifyEmailController');

module.exports = {
  registerUserController,
  loginUserController,
  getUsersController,
  updateUserController,
  createProductController,
  verifyEmailController,
};
