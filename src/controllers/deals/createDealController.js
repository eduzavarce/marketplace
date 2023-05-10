const { throwError } = require('../../middlewares');
const { findBuyRequestData, createDeal } = require('../../repositories');

const createDealController = async (req, res, next) => {
  try {
    const { idProduct } = req.params;

    const {
      id: idBuyer,
      email: emailBuyer,
      username: usernameBuyer,
    } = req.auth;

    const product = await findBuyRequestData(idProduct);
    console.log(product);

    if (!isActive) throwError(400, 'El producto ya está reservado');
    if (!isActiveVendor)
      throwError(400, 'No se puede hacer la reserva en este momento');

    const requestParams = [idBuyer, idProduct, 'requested'];

    // await createDeal(requestParams);

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
