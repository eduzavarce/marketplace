const { throwError } = require('../middlewares');
const transporter = require('./transporter');

const { SMTP_FROM, FULL_DOMAIN } = process.env;

const sendCreatedDealToBuyer = async (info) => {
  const formUrl = `${FULL_DOMAIN}/api/v1/deals/${info.IdDeal}?a=${info.idBuyer}&b=${info.idVendor}&c=${info.id}`;
  const message = {
    from: SMTP_FROM,
    to: info.emailBuyer,
    subject: `Felicidades ${info.usernameBuyer}, haz realizado una oferta!`,
    html: `
    <h1>Haz hecho una oferta por ${info.name}</h1>
    <p>${info.usernameVendor} ha recibido tu oferta y la está valorando, se pondrá en contacto contigo para proponer hora, fecha y sitio de entrega.</p>
  
        <p>En caso de no querer continuar con la compra, por favor indica tus motivos y selecciona cancelar en el menu y el vendedor será informado.</p>
        <h3>Formulario para cancelar tu proceso de compra</h3>
      <form action="${formUrl}">
      
        <label for="message">Message:</label>
        <textarea id="message" name="message" rows="10" cols="50" maxlength="500"></textarea><br><br>
        <label for="status">Status:</label>
        <select id="status" name="status">
          <option value="requested">Esperando respuesta</option>
          <option value="cancelled">Cancelar</option>
        </select><br><br>
  
        <button >Submit</button>
      </form>
  
    `,
  };
  transporter.sendMail(message, (error) => {
    if (error) {
      throwError(500, 'Error en el envío del email');
    }
  });
  return;
};

module.exports = { sendCreatedDealToBuyer };
