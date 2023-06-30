const express = require('express');
const { validateAuth } = require('../../middlewares');
const {
  dealsCommunicationController,
  getDealDetailsByIdController,
} = require('../../controllers');

const dealsRouter = express.Router();

dealsRouter
  .route('/:idDeal')
  .all(validateAuth)
  .post(dealsCommunicationController)
  .get(getDealDetailsByIdController);

module.exports = dealsRouter;
