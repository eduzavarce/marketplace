const Joi = require('joi');
const {
  findDealById,
  findDealDataByVendorId,
  updateDealStatus,

  reactivateProductById,
  addDealMessage,
  findDealDataByBuyerId,
} = require('../../repositories');
const { throwError } = require('../../middlewares');
const schemaParams = Joi.object()
  .keys({ idDeal: Joi.number().integer().positive().required() })
  .required();

const schemaBody = Joi.object().keys({
  message: Joi.string().max(500).min(0),
  usernameVendor: Joi.string().min(4).max(20),
  usernameBuyer: Joi.string().min(4).max(20),
  idVendor: Joi.number().positive().integer(),
  idBuyer: Joi.number().positive().integer(),
  idProduct: Joi.number().positive().integer().required(),
  status: Joi.string().required(),
});
const dealsCommunicationController = async (req, res, next) => {
  const { idDeal } = req.params;
  const { body } = req;
  try {
    await schemaParams.validateAsync(req.params);
    await schemaBody.validateAsync(req.body);
    const {
      message,
      idVendor: bodyIdVendor,
      idProduct: bodyIdProduct,
      status: bodyStatus,
      idBuyer: bodyIdBuyer,
    } = body;
    console.log(bodyIdVendor, bodyIdBuyer, bodyIdProduct, bodyStatus);

    const deal = await findDealById(idDeal);

    if (!deal) throwError(404, 'datos incorrectos');

    console.log('deal info:', deal);
    const { id: dealId, status: dealStatus, dealIdProduct } = deal;
    if (dealStatus === 'rejected' || dealStatus === 'cancelled') {
      //!comentar este if para hacer pruebas
      throwError(400, 'La venta ha sido cancelada por una de las partes');
    }

    if (!bodyIdBuyer && !bodyIdVendor) throwError(400, 'datos incompletos');
    if (bodyIdBuyer && bodyIdVendor) throwError(400, 'datos incorrectos');

    //* ----------------------si lo envía el vendedor------------------------------
    if (bodyIdVendor) {
      const validBodyStatus = ['rejected', 'approved'];
      if (!validBodyStatus.includes(bodyStatus))
        throwError(400, 'status incorrecto');
      const dealData = await findDealDataByVendorId(dealId, bodyIdVendor);
      const { idBuyer } = dealData;
      console.log('dealData', dealData);

      if (bodyStatus !== dealStatus)
        await updateDealStatus(dealId, bodyStatus, new Date());
      if (bodyStatus === 'rejected')
        await reactivateProductById(bodyIdProduct, true);
      await addDealMessage(idDeal, bodyIdVendor, idBuyer, message, bodyStatus);

      //! sendRejectionNoticeToBuyer

      res.send('hola Vendedor');
      //* -----------------------si lo envía el comprador ----------------------------
    } else if (bodyIdBuyer) {
      const validBodyStatus = ['requested', 'cancelled'];
      if (!validBodyStatus.includes(bodyStatus))
        throwError(400, 'status incorrecto');
      const dealData = await findDealDataByBuyerId(dealId, bodyIdBuyer);
      const { idVendor } = dealData;
      console.log('dealData', dealData);

      if (bodyStatus !== dealStatus)
        await updateDealStatus(dealId, bodyStatus, new Date());
      if (bodyStatus === 'cancelled')
        await reactivateProductById(bodyIdProduct, true);
      await addDealMessage(idDeal, bodyIdBuyer, idVendor, message, bodyStatus);
      //! sendCancellationNoticeToBuyer
      res.send('hola comprador');
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {};
