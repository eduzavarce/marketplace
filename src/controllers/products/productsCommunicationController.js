const Joi = require('joi');
const {
  findProductById,
  findChatIdbyUserAndProductId,
  createNewChat,
  createNewChatMessage,
} = require('../../repositories');
const { throwError } = require('../../middlewares');
const { sendProductChatEmails } = require('../../emails/sendProductChatEmails');
const schema = Joi.object({
  message: Joi.string().max(500).allow(''),
});

const productsCommunicationController = async (req, res, next) => {
  try {
    const { idProduct } = req.params;
    const { body, auth } = req;
    await schema.validateAsync(req.body);
    const { message } = body;
    const { id: idUser, username } = auth;

    const product = await findProductById(idProduct);
    if (!product) throwError(404, 'El producto no existe');
    const { idUser: idVendor } = product;
    let chatInfo = await findChatIdbyUserAndProductId(idUser, idProduct);
    console.log('primero', chatInfo);
    if (!chatInfo && idUser === idVendor)
      throwError(
        403,
        'El producto es tuyo, no comenzar una conversación contigo mismo'
      );
    const chatId =
      chatInfo?.id || (await createNewChat(idProduct, idUser, idVendor));
    console.log(chatId);
    if (!chatInfo) {
      chatInfo = await findChatIdbyUserAndProductId(idUser, idProduct);
      console.log('segundo', chatInfo);
    }
    await createNewChatMessage(chatId, idUser, message);
    const emaiInfo = {
      emailRecipient:
        chatInfo.idBuyer === idUser
          ? chatInfo.emailVendor
          : chatInfo.emailBuyer,
      nameProduct: chatInfo.nameProduct,
      idProduct,
      message,
    };
    console.log(emaiInfo);
    await sendProductChatEmails(emaiInfo, username);
    res.status(200).send({
      status: 'ok',
      message: 'mensaje enviado correctamente',
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { productsCommunicationController };
