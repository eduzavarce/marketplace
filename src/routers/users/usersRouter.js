const express = require('express');

const {
  registerUserController,
  loginUserController,
  updateUserController,
  verifyEmailController,
} = require('../../controllers');
const { validateAuth, isAccountVerified } = require('../../middlewares');

const usersRouter = express.Router();

//TODO endpoints
//!puplicos

usersRouter.route('/login').all(isAccountVerified).post(loginUserController);
usersRouter
  .route('/:username/profile')
  .all(validateAuth)
  .patch(updateUserController);

usersRouter.route('/register').post(registerUserController);
usersRouter.route('/activate/:code').get(verifyEmailController);

//!privados

// tienda.com/api/v1/users/profile
module.exports = usersRouter;
