const { throwError } = require('../middlewares');
const transporter = require('./transporter');

const { SMTP_FROM, FULL_DOMAIN } = process.env;

const sendDealAcceptanceRequest = async (info) => {
  const formUrl = `${FULL_DOMAIN}/api/v1/deals/${info.IdDeal}?a=${info.idVendor}&b=${info.idBuyer}&c=${info.id}`;
  console.log(formUrl);
  const message = {
    from: SMTP_FROM,
    to: info.emailVendor,
    subject: `Felicidades ${info.usernameVendor}, han ofertado por tu producto`,
    html: `
    <h1>Han hecho una oferta por ${info.name}</h1>
    <p>${info.usernameBuyer} está interesado en la compra, contacta con él utilizando el siguiente formulario para aceptar la transacción.</p>
  
        <p>En caso de no querer realizar la venta, por favor indica tus motivos y selecciona rechazada en el menu y el comprador será informado.</p>
        <h3>Formulario para contactar con el comprador</h3>
      <form action="${formUrl}">
      
           <label for="message">Message:</label>
        <textarea id="message" name="message" rows="10" cols="50" maxlength="500"></textarea><br><br>
        <label for="location">Lugar de entrega:</label>
        <input type="text" id="location" name="location" >
        <label for="time"> Día y hora de entrega </label>
    <input type="datetime-local" id="time" name="time">
        <label for="status">Status:</label>
        <select id="status" name="status" required>
          <option value="approved">Aceptada</option>
          <option value="rejected">Rechazada</option>
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

module.exports = { sendDealAcceptanceRequest };
