const { throwError } = require('../middlewares');
const transporter = require('./transporter');

const { SMTP_FROM, FULL_DOMAIN } = process.env;
//<p>Ponte en contacto con  <a href = "mailto:${info.emailBuyer}">${info.usernameBuyer}</a> para acordar lugar y hora de entrega.</p>
const sendChatMessageToVendor = async (info) => {
  const formUrl = `${FULL_DOMAIN}/api/v1/deals/${info.IdDeal}`;
  const message = {
    from: SMTP_FROM,
    to: info.emailVendor,
    subject: `Actualización de la compra de  ${info.name}!`,
    html: `
    <p>${info.usernameBuyer} dice:</p>
    <h3>Mensaje</h3>
    <p>${info.message}</p>
    <h1>ESTE MAIL LO CAMBIAREMOS PARA QUE NOS LLEVE A UNA PAGINA AUTENTICADA QUE TENGA LA MISMA FUNCIONALIDAD</h1>

        <h3>Formulario para actualizar proceso, enviar mensajes o COMPLETAR PARA PODER VALORAR AL OTRO. </h3>
      <form action="${formUrl}" method="POST">
      
        <label for="message">Motivos de rechazo de la reserva:</label>
        <textarea id="message" name="message" rows="10" cols="50" maxlength="500"></textarea><br><br>
        <input type="hidden" id="chat" name="chat" value="chat" />
        <input type="hidden" id="usernameVendor" name="usernameVendor" value="${info.usernameVendor}" />
        <input type="hidden" id="idVendor" name="idVendor" value="${info.idVendor}" />
        <input type="hidden" id="idProduct" name="idProduct" value="${info.id}" />
        
        <label for="status">Status:</label>
        <select id="status" name="status" required>
          <option value="approved">Aceptada</option>
          <option value="rejected">Rechazada</option>
          <option value="completed">Entregado</option>
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

module.exports = { sendChatMessageToVendor };
