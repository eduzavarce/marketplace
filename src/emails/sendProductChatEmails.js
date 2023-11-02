const { throwError } = require('../middlewares');
const transporter = require('./transporter');

const { SMTP_FROM } = process.env;

const sendProductChatEmails = async (info, sender) => {
  const mailList = [info.emailRecipient];
  const linkUrl = `http://localhost:5173/chat/${info.idProduct}`;
  const emailMessage = {
    from: SMTP_FROM,
    bcc: mailList,
    subject: `Recibido mensaje sobre ${info.nameProduct}`,
    html: `
      <h1>${sender} ha enviado un nuevo mensaje</h1>
      <p><em>"${info.message}"</em></p>
    
      <p><a href="${linkUrl}" >CLICK AQUí PARA RESPONDER</a></p>
    
      `,
  };
  transporter.sendMail(emailMessage, (error) => {
    if (error) {
      throwError(500, 'Error en el envío del email');
    }
  });
};
module.exports = { sendProductChatEmails };
