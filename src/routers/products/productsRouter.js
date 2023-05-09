const express = require('express');
const { validateAuth } = require('../../middlewares');
const { createProductController } = require('../../controllers');

const productsRouter = express.Router();

productsRouter.route('/create').all(validateAuth).post(createProductController);

module.exports = productsRouter;
