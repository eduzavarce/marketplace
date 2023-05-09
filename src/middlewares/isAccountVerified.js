const { findUserByUsername } = require('../repositories');
const throwError = require('./errors/throwError');

const isAccountVerified = async (req, res, next) => {
  const { username } = req.body;
  try {
    const { verifiedAt } = await findUserByUsername(username);
    if (!verifiedAt) throwError(403, 'Validación de email requerida');
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = isAccountVerified;
