const express = require('express');
const { validateAuth } = require('../../middlewares');
const { dealsCommunicationController } = require('../../controllers');

const dealsRouter = express.Router();

dealsRouter.route('/:idDeal').post(dealsCommunicationController);

module.exports = dealsRouter;
