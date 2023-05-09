const express = require('express');
const { registerUserController } = require('../../controllers');
const usersRouter = express.Router();

//TODO endpoints
//!puplicos
/// tienda.com/api/v1/users/login

// tienda.com/api/v1/users/register

usersRouter.route('/register').post(registerUserController);
///  usersRouter.route('/activate/:code').get(registerUserController)

//!privados

// tienda.com/api/v1/users/profile
module.exports = usersRouter;
