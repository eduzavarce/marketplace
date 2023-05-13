const { throwError } = require('../middlewares');
const transporter = require('./transporter');

const { SMTP_FROM, FULL_DOMAIN } = process.env;

const sendRequestReviewEmails = async (info) => {
  const mailList = [info.emailBuyer, info.emailVendor];
  const linkUrl = `${FULL_DOMAIN}/reviews/${info.idDeal}`;
  const emailMessage = {
    from: SMTP_FROM,
    bcc: mailList,
    subject: `Valora la venta de ${info.nameProduct}.`,
    html: `
      <p>Ha finalizado la venta, es hora de valorar al comprador/ vendedor!!!</p>

    
      <p><a href="${linkUrl}" >CLICK AQUí PARA VALORAR</a></p>
    
      `,
  };
  transporter.sendMail(emailMessage, (error) => {
    if (error) {
      throwError(500, 'Error en el envío del email');
    }
  });
};
module.exports = { sendRequestReviewEmails };
