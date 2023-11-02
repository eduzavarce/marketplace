const { findUserByUsername } = require('../repositories');
const throwError = require('./errors/throwError');

const isAccountVerified = async (req, res, next) => {
  const { username } = req.body;
  try {
    const user = await findUserByUsername(username);
    if (!user) throwError(404, 'usuario no encontrado');

    const { verifiedAt } = user;

    if (!verifiedAt) throwError(403, 'Validación de email requerida');
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = isAccountVerified;
