const { throwError } = require('../middlewares');
const transporter = require('./transporter');

const { SMTP_FROM } = process.env;

const sendCreatedDealToBuyer = async (info) => {
  const linkUrl = `http://localhost:5173/deals/${info.idDeal}`;
  const message = {
    from: SMTP_FROM,
    to: info.emailBuyer,
    subject: `Felicidades ${info.usernameBuyer}, has realizado una oferta!`,
    html: `
    <h1>Has hecho una oferta por ${info.name}</h1>
    <p>${info.usernameVendor} ha recibido tu oferta y la está valorando, se pondrá en contacto contigo para proponer hora, fecha y sitio de entrega.</p>
  
    <p><a href="${linkUrl}" >CLICK AQUí PARA COMUNICARTE</a></p>
  
    `,
  };
  transporter.sendMail(message, (error) => {
    if (error) {
      throwError(500, 'Error en el envío del email');
    }
  });
};

module.exports = { sendCreatedDealToBuyer };
