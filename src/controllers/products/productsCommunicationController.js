const Joi = require('joi');
const {
  findDealById,
  updateDealStatus,
  reactivateProductById,
  addDealMessage,
  findLatestMessageContentByDealId,
  findProductById,
} = require('../../repositories');
const { throwError } = require('../../middlewares');
const { sendProductChatEmails } = require('../../emails');
const schema = Joi.object({
  message: Joi.string().max(500).allow(''),
});

const productsCommunicationController = async (req, res, next) => {
  try {
    const { idProduct } = req.params;
    const { body, auth } = req;

    await schema.validateAsync(req.body);
    const { message } = body;

    const { username } = auth;
    const product = await findProductById(idProduct);
    if (!product) throwError(404, 'producto no existe');
    const {
      idProduct,
      idVendor,
      usernameVendor,
      idBuyer,
      usernameBuyer,
      statusDeal,
    } = deal;
    const authorizedUsers = [usernameBuyer, usernameVendor];
    if (!authorizedUsers.includes(username))
      throwError(403, 'Error, usuario incorrecto');
    if (
      statusDeal === 'cancelled' ||
      statusDeal === 'rejected' ||
      statusDeal === 'completed'
    )
      throwError(
        400,
        'esta venta ha finalizado, no se pueden enviar mensajes.'
      );
    const previousMessages = await findLatestMessageContentByDealId(idDeal);
    const latestData = previousMessages[0];
    if (username === usernameVendor) {
      if (status) {
        const validStatus = ['approved', 'rejected', 'completed'];
        if (!validStatus.includes(status))
          throwError(
            400,
            'como vendedor solo puedes cambiar el status a approved, rejected o completed'
          );

        if (status === 'completed') {
          await sendRequestReviewEmails(deal);
        } else await sendProductChatEmails(deal, usernameVendor, body);
      }

      if (status !== statusDeal) {
        await updateDealStatus(idDeal, status, new Date());
        if (status === 'rejected') {
          await reactivateProductById(idProduct, true);
        }
      }
      if (!latestData) {
        await addDealMessage(
          idDeal,
          idVendor,
          idBuyer,
          message,
          address,
          time ? time : null,
          status ? status : 'requested'
        );
      } else {
        await addDealMessage(
          idDeal,
          idVendor,
          idBuyer,
          message,
          address ? address : latestData.location,
          time ? time : latestData.time,
          status ? status : latestData.status
        );
      }
    } else if (username === usernameBuyer) {
      if (status) {
        const validStatus = ['cancelled', 'completed'];
        if (!validStatus.includes(status))
          throwError(
            400,
            'como comprador solo puedes cambiar el status a cancelled o completed'
          );

        if (status === 'cancelled') {
          await sendRequestReviewEmails(deal);
        } else await sendProductChatEmails(deal, usernameBuyer, body);

        if (status !== statusDeal) {
          await updateDealStatus(idDeal, status, new Date());
          if (status === 'cancelled') {
            await reactivateProductById(idProduct, true);
          }
        }
      }

      if (!latestData) {
        await addDealMessage(
          idDeal,
          idBuyer,
          idVendor,
          message,
          address,
          time ? time : null,
          status ? status : 'requested'
        );
      } else {
        await addDealMessage(
          idDeal,
          idBuyer,
          idVendor,
          message,
          address ? address : latestData.location,
          time ? time : latestData.time,
          status ? status : latestData.status
        );
      }
    }
    const data = await findDealById(idDeal);
    const messageLog = await findLatestMessageContentByDealId(idDeal);

    res.status(200).send({
      status: 'ok',
      sender: username,
      content: body,
      currentDealDetails: data,
      messageLog,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { productsCommunicationController };
