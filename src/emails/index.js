const { sendCreatedDealToBuyer } = require('./createDealBuyer');
const { sendDealAcceptanceRequest } = require('./createDealVendor');
const { sendVerificationCode } = require('./verificationEmail');
const sendVerifiedConfirmation = require('./verifiedAccountEmail');

module.exports = {
  sendVerificationCode,
  sendVerifiedConfirmation,
  sendDealAcceptanceRequest,
  sendCreatedDealToBuyer,
};
