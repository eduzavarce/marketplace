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
    <h1>ESTE MAIL LO CAMBIAREMOS PARA QUE NOS LLEVE A UNA PAGINA AUTENTICADA QUE TENGA LA MISMA FUNCIONALIDAD</h1>

        <p>formulario para actualizar proceso, enviar mensajes o COMPLETAR PARA PODER VALORAR AL OTRO. </p>
        <h3>Actualizar proceso de compra</h3>
      <form action="${formUrl}" method="POST">
      
      <label for="message">Motivos de rechazo de la reserva:</label>
      <textarea id="message" name="message" rows="10" cols="50" maxlength="500"></textarea><br><br>
      <input type="hidden" id="usernameVendor" name="usernameBuyer" value="${info.usernameBuyer}" />
      <input type="hidden" id="idVendor" name="idBuyer" value="${info.idBuyer}" />
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

module.exports = { sendCreatedDealToBuyer };
