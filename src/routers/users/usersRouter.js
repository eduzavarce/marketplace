const express = require('express');

const {
  registerUserController,
  loginUserController,
  updateUserController,
} = require('../../controllers');
const { validateAuth } = require('../../middlewares');

const usersRouter = express.Router();

//TODO endpoints
//!puplicos
/// tienda.com/api/v1/users/login
usersRouter.route('/login').post(loginUserController);
usersRouter
  .route('/:username/profile')
  .all(validateAuth)
  .patch(updateUserController);
// tienda.com/api/v1/users/register

usersRouter.route('/register').post(registerUserController);
///  usersRouter.route('/activate/:code').get(registerUserController)

//!privados

// tienda.com/api/v1/users/profile
module.exports = usersRouter;
