const express = require('express');
const { validateAuth } = require('../../middlewares');
const { reviewDealParticipantsController } = require('../../controllers');

const reviewsRouter = express.Router();

reviewsRouter
  .route('/:idDeal')
  .all(validateAuth)
  .post(reviewDealParticipantsController);
module.exports = reviewsRouter;
