const { findBuyRequestData, createDeal } = require('./deals/dealsRepositories');
const { findProductById } = require('./products/productsRepositories');
const {
  findUserByEmail,
  findUserByUsername,
  createUser,
  findUserByActivationCode,
  addUserVerificationDate,
} = require('./users/usersRepositories');

module.exports = {
  findUserByEmail,
  findUserByUsername,
  createUser,
  findUserByActivationCode,
  addUserVerificationDate,
  findProductById,
  findBuyRequestData,
  createDeal,
};
