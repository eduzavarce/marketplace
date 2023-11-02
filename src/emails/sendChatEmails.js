const { throwError } = require('../middlewares');
const transporter = require('./transporter');

const { SMTP_FROM } = process.env;

const sendChatEmails = async (info, sender) => {
  console.log(info);
  const mailList = [info.emailBuyer, info.emailVendor];
  const linkUrl = `http://localhost:5173/deals/${info.idDeal}`;
  const emailMessage = {
    from: SMTP_FROM,
    bcc: mailList,
    subject: `Mensaje de actualización de estado venta ${info.nameProduct}`,
    html: `
      <h1>${sender} ha enviado un nuevo mensaje</h1>
    
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
