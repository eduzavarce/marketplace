const {
  findBuyRequestData,
  createDeal,
  findDealById,
  findDealDataByVendorId,
  updateDealStatus,
  addDealMessage,
} = require('./deals/dealsRepositories');
const {
  createProduct,
  findProductById,
  findAllProducts,
  insertLocation,
  insertLocationName,
  updateProduct,
  reactivateProductById,
} = require('./products/productsRepositories');
const {
  findUserByEmail,
  findUserByUsername,
  createUser,
  findUserByActivationCode,
  addUserVerificationDate,
} = require('./users/usersRepositories');

module.exports = {
  findUserByUsername,
  findUserByEmail,
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
  findAllProducts,
  findDealById,
  findDealDataByVendorId,
  updateDealStatus,
  reactivateProductById,
  addDealMessage,
};
