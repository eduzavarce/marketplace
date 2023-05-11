const jwt = require('jsonwebtoken');
const throwError = require('./errors/throwError');

const validateAuth = async (req, res, next) => {
  try {
    let { authorization } = req.headers;
    if (!authorization)
      throwError(403, 'por favor haz login antes de continuar');
    const [bearer, userToken] = authorization.split(' ');

    if (!userToken || bearer !== 'Bearer') {
      throwError(400, 'Petición incompleta');
    }
    const { SECRET } = process.env;
    try {
      const token = jwt.verify(userToken, SECRET);
      const { email, role, id, username, name } = token;
      req.auth = {
        email,
        role,
        id,
        username,
        name,
      };
    } catch {
      throwError(400, 'Autorización no válida');
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateAuth;
