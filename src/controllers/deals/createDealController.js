const { throwError } = require('../../middlewares');
const Joi = require('joi');
const { findBuyRequestData, createDeal } = require('../../repositories');
const {
  sendDealAcceptanceRequest,
  sendCreatedDealToBuyer,
} = require('../../emails');
const schema = Joi.number().integer().positive();
const { FULL_DOMAIN } = process.env;

const createDealController = async (req, res, next) => {
  const { idProduct } = req.params;
  const { id: idBuyer, email: emailBuyer, username: usernameBuyer } = req.auth;
  try {
    await schema.validateAsync(idProduct);
    const productInfo = await findBuyRequestData(idProduct);
    if (!productInfo) throwError(404, 'Producto no encontrado');
    Object.assign(productInfo, {
      idBuyer,
      emailBuyer,
      usernameBuyer,
    });
    if (productInfo.idUser === idBuyer)
      throwError(403, 'No puedes comprar tu propio producto');
    if (!productInfo.isActive) throwError(403, 'Producto no disponible');
    if (!productInfo.isActiveVendor)
      throwError(400, 'No se puede hacer la reserva en este momento');
    //quitar status
    const requestParams = [idBuyer, idProduct, 'requested'];

    const insertId = await createDeal(requestParams);
    productInfo.idDeal = insertId;

    await sendDealAcceptanceRequest(productInfo);
    await sendCreatedDealToBuyer(productInfo);

    const data = {
      id: insertId,
      productName: productInfo.name,
      productUrl: `${FULL_DOMAIN}/api/v1/products/${idProduct}`,
    };

    res.status(200).send({
      status: 'ok',
      message:
        'enviado emails donde comprador y vendedor se pueden comunicar y cambiar el estado de la venta',
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createDealController;
