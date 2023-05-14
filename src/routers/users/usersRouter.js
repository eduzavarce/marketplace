const express = require('express');

const {
  usersController,
  registerUserController,
  loginUserController,
  updateUserController,
  verifyEmailController,
  ownUserController,
} = require('../../controllers');
const { validateAuth, isAccountVerified } = require('../../middlewares');

const usersRouter = express.Router();

//TODO endpoints

usersRouter.route('/login').all(isAccountVerified).post(loginUserController);
usersRouter
  .route('/private/:username/')
  .all(validateAuth)
  .patch(updateUserController)
  .get(ownUserController);
usersRouter.route('/:username/').get(usersController);
usersRouter.route('/register').post(registerUserController);
usersRouter.route('/activate/:code').get(verifyEmailController);

module.exports = usersRouter;
