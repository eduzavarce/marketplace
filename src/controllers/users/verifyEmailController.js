const { throwError } = require('../../middlewares');
const {
  findUserByActivationCode,
  addUserVerificationDate,
} = require('../../repositories');
const Joi = require('joi');
const schema = Joi.object()
  .keys({ code: Joi.string().length(64).required() })
  .required();
const verifyEmailController = async (req, res, next) => {
  try {
    const { params } = req;
    await schema.validateAsync(params);
    const { code } = params;
    if (!code) throwError(400, 'Petición inválida');
    const user = await findUserByActivationCode(code);
    if (!user) throwError(400, 'Código de validación incorrecto');
    const { email, name, verifiedAt } = user;
    if (verifiedAt !== null) throwError(400, 'Usuario verificado previamente');
    await addUserVerificationDate(email, name);
    await res
      .status(200)
      .send({ status: 'ok', message: 'Email verificado correctamente' });
  } catch (error) {
    next(error);
  }
};
module.exports = verifyEmailController;
