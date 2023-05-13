const Joi = require('joi');
const { throwError } = require('../../middlewares');
const {
  findDealById,
  findReviewsByDealId,
  addReview,
} = require('../../repositories');

const schema = Joi.object({
  comment: Joi.string().max(255).allow(''),
  score: Joi.number().integer().positive().min(1).max(5).required(),
});
const reviewDealParticipantsController = async (req, res, next) => {
  try {
    const {
      auth: { id: idAuth },
      params: { idDeal },
      body: { score, comments },
    } = req;
    await schema.validateAsync(req.body);
    const deal = await findDealById(idDeal);
    if (!deal) throwError(404, 'No existe esta venta');
    const { idVendor, idBuyer, usernameVendor, usernameBuyer, idProduct } =
      deal;
    console.log(deal);
    if (idAuth !== idVendor && idAuth !== idBuyer)
      throwError(
        403,
        'Solo el comprador y el vendedor pueden valorar esta venta'
      );
    const existingReviews = await findReviewsByDealId(idDeal);
    let response;
    if (idAuth === idVendor) {
      //   console.log(existingReviews);
      if (existingReviews.idReviewer && existingReviews.idReviewer === idAuth)
        throwError(403, 'Ya haz valorado esta venta');
      await addReview(
        idDeal,
        idProduct,
        idAuth,
        idBuyer,
        'Buyer',
        score,
        comments
      );
      response = {
        status: 'ok',
        data: {
          reviewer: usernameVendor,
          buyer: usernameBuyer,
          score,
          comments,
        },
      };
    }

    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};
module.exports = reviewDealParticipantsController;
