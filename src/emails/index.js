const { sendChatMessageToBuyer } = require('./chatMessagesToBuyer');
const { sendChatMessageToVendor } = require('./chatMessagesToVendor');
const { sendCreatedDealToBuyer } = require('./createDealBuyer');
const { sendDealAcceptanceRequest } = require('./createDealVendor');
const { sendVerificationCode } = require('./verificationEmail');
const sendVerifiedConfirmation = require('./verifiedAccountEmail');

module.exports = {
  sendVerificationCode,
  sendVerifiedConfirmation,
  sendDealAcceptanceRequest,
  sendCreatedDealToBuyer,
  sendChatMessageToBuyer,
  sendChatMessageToVendor,
};
