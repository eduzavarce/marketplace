const Joi = require('joi');
const { throwError } = require('../../middlewares');
const {
  findDealById,
  addReview,
  findExistingUserReviewsByDealId,
} = require('../../repositories');

const schema = Joi.object({
  comment: Joi.string().max(255).allow(''),
  score: Joi.number().positive().min(1).max(5).required(),
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
    const {
      idVendor,
      idBuyer,
      usernameVendor,
      usernameBuyer,
      idProduct,
      statusDeal,
    } = deal;

    if (idAuth !== idVendor && idAuth !== idBuyer)
      throwError(
        403,
        'Solo el comprador y el vendedor pueden valorar esta venta'
      );
    if (statusDeal !== 'completed')
      throwError(403, 'La venta no ha finalizado, aún no se puede valorar');
    const verifyIfPreviouslyReviewed = await findExistingUserReviewsByDealId(
      idDeal,
      idAuth
    );
    if (verifyIfPreviouslyReviewed)
      throwError(403, 'Ya haz valorado esta venta');
    let response;
    if (idAuth === idVendor) {
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
    if (idAuth === idBuyer) {
      await addReview(
        idDeal,
        idProduct,
        idAuth,
        idVendor,
        'Vendor',
        score,
        comments
      );
      response = {
        status: 'ok',
        data: {
          reviewer: usernameBuyer,
          vendor: usernameVendor,
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
