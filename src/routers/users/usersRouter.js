const express = require('express');

const {
  usersController,
  registerUserController,
  loginUserController,
  updateUserController,
  verifyEmailController,
} = require('../../controllers');
const { validateAuth, isAccountVerified } = require('../../middlewares');

const usersRouter = express.Router();

//TODO endpoints

usersRouter.route('/login').all(isAccountVerified).post(loginUserController);
usersRouter
  .route('/:username/profile')
  .all(validateAuth)
  .patch(updateUserController)
  .get(usersController);

usersRouter.route('/register').post(registerUserController);
usersRouter.route('/activate/:code').get(verifyEmailController);

usersRouter.route('/profile').put(updateUserController);

// tienda.com/api/v1/users/profile
module.exports = usersRouter;
