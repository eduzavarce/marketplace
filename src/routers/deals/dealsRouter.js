const express = require('express');
const { validateAuth } = require('../../middlewares');
const { dealsCommunicationController } = require('../../controllers');

const dealsRouter = express.Router();

dealsRouter.route('/:idDeal').get(dealsCommunicationController);

module.exports = dealsRouter;
