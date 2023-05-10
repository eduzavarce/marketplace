const { requestDealAcceptanceEmail } = require('./createDealVendor');
const { sendVerificationCode } = require('./verificationEmail');
const sendVerifiedConfirmation = require('./verifiedAccountEmail');

module.exports = {
  sendVerificationCode,
  sendVerifiedConfirmation,
  requestDealAcceptanceEmail,
};
