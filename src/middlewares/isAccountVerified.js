const { findUserByUsername } = require('../repositories');
const throwError = require('./errors/throwError');

const isAccountVerified = async (req, res, next) => {
  const { username } = req.body;
  try {
    const user = await findUserByUsername(username);
    if (!user) throwError(404, 'El usuario y/o la contraseña no son correctos');
    console.log(user);
    const { verifiedAt } = user;

    if (!verifiedAt) throwError(403, 'Validación de email requerida');
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = isAccountVerified;
