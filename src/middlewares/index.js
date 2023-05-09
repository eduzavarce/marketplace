const createError = require('./errors/createErrors');
const notFoundError = require('./errors/notFoundError');
const throwError = require('./errors/throwError');
const validateAuth = require('./validateAuth');

module.exports = {
  createError,
  notFoundError,
  throwError,
  validateAuth,
};
