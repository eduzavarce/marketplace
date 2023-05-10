const { findBuyRequestData, createDeal } = require('./deals/dealsRepositories');
const {
  createProduct,
  findProductById,
  insertLocation,
  insertLocationName,
  updateProduct,
} = require('./products/productsRepositories');
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
  findBuyRequestData,
  createDeal,
  createProduct,
  updateProduct,
  insertLocation,
  insertLocationName,
  findProductById,
};
