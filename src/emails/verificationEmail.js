const throwError = require('../middlewares/errors/throwError');
const transporter = require('./transporter');
const { SMTP_FROM, HTTP_URL, PORT } = process.env;
const sendVerificationCode = async (email, username, verificationCode) => {
  const verificationLink = `http://${HTTP_URL}:${PORT}/api/vi/user/activate/code=${verificationCode}`;
  const message = {
    from: SMTP_FROM,
    to: email,
    subject: 'Verifica tu cuenta para acceder a marketplace',
    html: `<p>haz click en el enlace para verificar tu cuenta </p>
            <a href=${verificationLink}>Click aquí para enviar</a>
        `,
  };
  transporter.sendMail(message, (error, info) => {
    if (error) {
      throwError(500, 'email no enviado');
    }
    // console.log(info);
  });
};

module.exports = { sendVerificationCode };
