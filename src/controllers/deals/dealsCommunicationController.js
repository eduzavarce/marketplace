const Joi = require('joi');
const {
  findDealById,
  findDealDataByVendorId,
  updateDealStatus,

  reactivateProductById,
  addDealMessage,
} = require('../../repositories');
const { throwError } = require('../../middlewares');
const schemaParams = Joi.object()
  .keys({ idDeal: Joi.number().integer().positive().required() })
  .required();

const schemaBody = Joi.object().keys({
  message: Joi.string().max(500).min(0),
  usernameVendor: Joi.string().min(4).max(20).required(),
  idVendor: Joi.number().positive().integer(),
  idBuyer: Joi.number().positive().integer(),
  idProduct: Joi.number().positive().integer().required(),
  status: Joi.string().required(),
});
const dealsCommunicationController = async (req, res, next) => {
  const { idDeal } = req.params;
  const { body } = req;

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
  try {
    const deal = await findDealById(idDeal);
    if (!deal) throwError(404, 'datos incorrectos');

    console.log('deal info:', deal);
    const { id: dealId, status: dealStatus, dealIdProduct } = deal;
    if (dealStatus === 'rejected' || dealStatus === 'cancelled') {
      throwError(400, 'La venta ha sido cancelada por una de las partes');
    } //!activar

    if (!bodyIdBuyer && !bodyIdVendor) throwError(400, 'datos incompletos');
    if (bodyIdBuyer && bodyIdVendor) throwError(400, 'datos incorrectos');
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
      //!sendRejectionNoticeToBuyer

      res.send('hola Vendedor');
    }
    if (bodyIdBuyer) {
      res.send('hola comprador');
    }
  } catch (error) {
    next(error);
  }
};
module.exports = { dealsCommunicationController };
