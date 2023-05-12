const { throwError } = require('../middlewares');
const transporter = require('./transporter');

const { SMTP_FROM, FULL_DOMAIN } = process.env;

const sendChatMessageToBuyer = async (info) => {
  const formUrl = `${FULL_DOMAIN}/api/v1/deals/${info.idProductDeal}?a=${info.idProductBuyer}&b=${info.idProductVendor}&c=${info.id}`;
  const message = {
    from: SMTP_FROM,
    to: info.emailBuyer,
    subject: `Actualización de la compra de  ${info.name}!`,
    html: `
    <p>${info.usernameVendor} dice:</p>
    <h3>Mensaje</h3>
    <p>${info.message}</p>
    <h1>ESTE MAIL LO CAMBIAREMOS PARA QUE NOS LLEVE A UNA PAGINA AUTENTICADA QUE TENGA LA MISMA FUNCIONALIDAD</h1>

        <h3>Formulario para actualizar proceso, enviar mensajes o COMPLETAR PARA PODER VALORAR AL OTRO. </h3>
      <form action="${formUrl}" method="POST">
      
      <label for="message">Motivos de rechazo de la reserva:</label>
      <textarea id="message" name="message" rows="10" cols="50" maxlength="500"></textarea><br><br>
      <input type="hidden" id="usernameBuyer" name="usernameBuyer" value="${info.usernameBuyer}" />
      <input type="hidden" id="chat" name="chat" value="chat" />
      <input type="hidden" id="idBuyer" name="idBuyer" value="${info.idProductBuyer}" />
      <input type="hidden" id="idProduct" name="idProduct" value="${info.id}" />
      
        <label for="status">Status:</label>
        <select id="status" name="status">
          <option value="requested">Esperando respuesta</option>
          <option value="cancelled">Cancelar</option>
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

module.exports = { sendChatMessageToBuyer };
