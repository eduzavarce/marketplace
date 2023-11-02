const { throwError } = require('../../middlewares');
const {
  findUserByActivationCode,
  addUserVerificationDate,
} = require('../../repositories');
const Joi = require('joi');
const schema = Joi.object()
  .keys({ code: Joi.string().length(64).required() })
  .required();
const { FULL_DOMAIN } = process.env;
const verifyEmailController = async (req, res, next) => {
  try {
    const { params } = req;
    await schema.validateAsync(params);
    const { code } = params;
    if (!code) throwError(400, 'Petición inválida');
    const user = await findUserByActivationCode(code);
    if (!user) throwError(404, 'Código de validación incorrecto');
    const { email, name, verifiedAt, username } = user;
    if (verifiedAt !== null) throwError(403, 'Usuario verificado previamente');
    await addUserVerificationDate(email, name);

    res.status(200).send({
      status: 'ok',
      message: 'Email verificado correctamente',
      profileUrl: `${FULL_DOMAIN}/users/private/${username} (url para editar perfil en el navegador, no existe aun)`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmailController;
