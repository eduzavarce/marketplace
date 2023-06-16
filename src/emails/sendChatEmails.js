const { throwError } = require('../middlewares');
const transporter = require('./transporter');

const { SMTP_FROM, FULL_DOMAIN } = process.env;

const sendChatEmails = async (info, sender, body) => {
  console.log(info);
  const mailList = [info.emailBuyer, info.emailVendor];
  const linkUrl = `${FULL_DOMAIN}/deals/${info.idDeal}`;
  const emailMessage = {
    from: SMTP_FROM,
    bcc: mailList,
    subject: `Mensaje de actualización de estado venta ${info.nameProduct}`,
    html: `
      <p>${sender} dice : ${body.message}</p>
      <p>${sender} propone esta dirección : ${body.address}</p>
      <p>${sender} propone esta hora : ${body.time}</p>
      <p>El estado actual de la transacción es : ${body.status}</p>

    
      <p><a href="${linkUrl}" >CLICK AQUí PARA RESPONDER</a></p>
    
      `,
  };
  transporter.sendMail(emailMessage, (error) => {
    if (error) {
      throwError(500, 'Error en el envío del email');
    }
  });
};
module.exports = { sendChatEmails };
