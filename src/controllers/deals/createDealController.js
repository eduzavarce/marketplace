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

    // if (!productInfo.isActive) throwError(400, 'Producto no disponible');
    if (!productInfo.isActiveVendor)
      throwError(400, 'No se puede hacer la reserva en este momento');
    //quitar status
    const requestParams = [idBuyer, idProduct, 'requested'];

    const insertId = await createDeal(requestParams);
    productInfo.IdDeal = insertId;
    console.log(productInfo);

    await sendDealAcceptanceRequest(productInfo);
    await sendCreatedDealToBuyer(productInfo);

    const data = {
      id: insertId,
      sellerUsername: productInfo.idVendor,
      productId: idProduct,
      productName: productInfo.name,
      productPrice: productInfo.price,
      productImages: [`pendiente insetar imagenes cuando existan`], //TODO
      productUrl: `${FULL_DOMAIN}/api/v1/products/${idProduct}`,
    };

    res.status(200).send({
      status: 'ok',
      message: 'enviado email de petición de reserva del producto',
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createDealController;
