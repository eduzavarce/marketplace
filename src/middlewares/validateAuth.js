const jwt = require('jsonwebtoken');
const createJsonError = require('../errors/createJsonError');
const throwJsonError = require('../errors/throwJsonError');

const extractAccessToken = (headers) => {
  const { authorization } = headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throwJsonError(400, 'Autorización No Válida');
  }

  return authorization.split(' ')[1];
  // return authorization.slice(7, authorization.length);
};

const validateAuth = (req, res, next) => {
  try {
    const { headers } = req;
    const { JWT_SECRET } = process.env;

    const token = extractAccessToken(headers);
    const decodedToken = jwt.verify(token, JWT_SECRET);

    const { id, name, email, role } = decodedToken;
    req.auth = { id, name, email, role };

    //req.name = name;
    //req.email = email;
    //req.role = role;

    next();
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = validateAuth;
