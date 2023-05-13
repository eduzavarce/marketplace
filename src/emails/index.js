const { sendCreatedDealToBuyer } = require('./createDealBuyer');
const { sendDealAcceptanceRequest } = require('./createDealVendor');
const { sendRequestReviewEmails } = require('./requestReviewEmail');
const { sendChatEmails } = require('./sendChatEmails');
const { sendVerificationCode } = require('./verificationEmail');
const sendVerifiedConfirmation = require('./verifiedAccountEmail');

sendChatEmails;
module.exports = {
  sendVerificationCode,
  sendVerifiedConfirmation,
  sendDealAcceptanceRequest,
  sendCreatedDealToBuyer,
  sendChatEmails,
  sendRequestReviewEmails,
};
