const createProductController = require('./products/createProductController');
const loginUserController = require('./users/loginUserController');
const registerUserController = require('./users/registerUserController');
const updateUserController = require('./users/updateUserController');

module.exports = {
  registerUserController,
  loginUserController,
  updateUserController,
  createProductController,
};
