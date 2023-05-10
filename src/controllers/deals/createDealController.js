const { throwError } = require('../../middlewares');
const Joi = require('joi');
const { findBuyRequestData, createDeal } = require('../../repositories');
const { requestDealAcceptanceEmail } = require('../../emails');
const schema = Joi.number().integer().positive();

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

    // await requestDealAcceptanceEmail(productInfo);
    console.log(productInfo);
    // console.log({
    //   name,
    //   description,
    //   price,
    //   category,
    //   isActive,
    //   usernameVendor,
    //   emailVendor,
    //   idVendor,
    //   isActiveVendor,
    //   idBuyer,
    //   emailBuyer,
    //   usernameBuyer,
    // });
    res.send('holitas');
  } catch (error) {
    next(error);
  }
};

module.exports = createDealController;
