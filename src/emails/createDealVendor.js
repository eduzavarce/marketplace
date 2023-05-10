const { throwError } = require('../middlewares');
const transporter = require('./transporter');

const { SMTP_FROM } = process.env;

const requestDealAcceptanceEmail = async (emailInfo) => {
  const message = {
    from: SMTP_FROM,
    to: email,
    subject: 'Bienvenido a marketplace!',
    html: `<p>Hola ${name}! Gracias por completar tu registro en marketplace. Ya puedes acceder a tu cuenta sin restricciones! </p>`,
  };
  transporter.sendMail(message, (error) => {
    if (error) {
      throwError(500, 'Error en el envío del email');
    }
  });
  return;
};

module.exports = {requestDealAcceptanceEmail};
