const { sendVerificationCode } = require('./verificationEmail');
const sendVerifiedConfirmation = require('./verifiedAccountEmail');

module.exports = { sendVerificationCode, sendVerifiedConfirmation };
