const { throwError } = require('../middlewares');
const transporter = require('./transporter');

const { SMTP_FROM, FULL_DOMAIN } = process.env;
//<p>Ponte en contacto con  <a href = "mailto:${info.emailBuyer}">${info.usernameBuyer}</a> para acordar lugar y hora de entrega.</p>
const sendDealAcceptanceRequest = async (info) => {
  const linkUrl = `${FULL_DOMAIN}/deals/${info.IdDeal}`;
  const message = {
    from: SMTP_FROM,
    to: info.emailVendor,
    subject: `Felicidades ${info.usernameVendor}, han ofertado por tu producto`,
    html: `
    <h1>Han hecho una oferta por ${info.name}</h1>
    <p>${info.usernameBuyer} está interesado en la compra, contacta con él utilizando el siguiente enlace para aceptar la transacción y proponer una hora y dirección de entrega, .</p>
  
    <p><a href="${linkUrl}" >CLICK AQUí PARA COMUNICARTE</a></p>
  
    `,
  };
  transporter.sendMail(message, (error) => {
    if (error) {
      throwError(500, 'Error en el envío del email');
    }
  });
  return;
};

module.exports = { sendDealAcceptanceRequest };
