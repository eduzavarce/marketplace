const Joi = require('joi');
const {
  findDealById,

  updateDealStatus,
  reactivateProductById,
  addDealMessage,
  findLatestMessageContentByDealId,
} = require('../../repositories');
const { throwError } = require('../../middlewares');
const { sendChatEmails, sendRequestReviewEmails } = require('../../emails');
const schema = Joi.object({
  message: Joi.string().max(500).allow(''),
  address: Joi.string().max(500).allow(''),
  time: Joi.date().allow(''),
  status: Joi.string().allow(''),
});

const dealsCommunicationController = async (req, res, next) => {
  const { idDeal } = req.params;
  const { body, auth } = req;
  try {
    await schema.validateAsync(req.body);
    const { message, address, time, status } = body;

    const { username } = auth;
    const deal = await findDealById(idDeal);
    if (!deal) throwError(404, 'datos incorrectos');
    const {
      idProduct,
      nameProduct,
      idVendor,
      usernameVendor,
      emailVendor,
      idBuyer,
      usernameBuyer,
      emailBuyer,
      statusDeal,
    } = deal;
    console.log(
      'username',
      username,
      usernameBuyer === username,
      usernameBuyer
    );
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
        if (status !== statusDeal) {
          await updateDealStatus(idDeal, status, new Date());
          if (status === 'rejected') {
            await reactivateProductById(idProduct, true);
          }

          if (status === 'completed') {
            await sendRequestReviewEmails(deal);
          } else await sendChatEmails(deal, usernameVendor, body);
        }
      }

      console.log(previousMessages);
      console.log(latestData);
      if (!latestData) {
        await addDealMessage(
          idDeal,
          idVendor,
          idBuyer,
          message,
          address,
          time ? time : null,
          'requested'
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
    } else if (username === usernameBuyer) {
      console.log(status);

      if (status) {
        const validStatus = ['cancelled', 'completed'];
        if (!validStatus.includes(status))
          throwError(
            400,
            'como comprador solo puedes cambiar el status a cancelled o completed'
          );
        if (status !== statusDeal) {
          await updateDealStatus(idDeal, status, new Date());
          if (status === 'cancelled') {
            await reactivateProductById(idProduct, true);
          }

          if (status === 'completed') {
            await sendRequestReviewEmails(deal);
          } else await sendChatEmails(deal, usernameBuyer, body);
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
          'requested'
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
module.exports = { dealsCommunicationController };
