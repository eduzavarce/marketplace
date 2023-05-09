const Joi = require('joi');
const bcrypt = require('bcrypt');
const randomString = require('randomstring');
const {
  findUserByEmail,
  findUserByUsername,
  createUser,
} = require('../../repositories');
const throwError = require('../../middlewares/errors/throwError');
const { sendVerificationCode } = require('../../emails');

const schema = Joi.object().keys({
  username: Joi.string().min(4).max(20).required(),
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(4).max(20).required(),
  repeatPassword: Joi.ref('password'),
});

const registerUserController = async (req, res, next) => {
  try {
    const { body } = req;

    const { email, username, password } = body;

    await schema.validateAsync(body);

    const emailExists = await findUserByEmail(email);

    if (emailExists) {
      throwError(400, 'El email ya existe');
    }

    const usernameExists = await findUserByUsername(username);

    if (usernameExists) {
      throwError(400, 'El usuario ya existe');
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const verificationCode = randomString.generate(64);

    const user = await createUser(
      username,
      email,
      passwordHash,
      verificationCode
    );
    const verificationLink = await sendVerificationCode(
      email,
      username,
      verificationCode
    );

    res.status(200).send({
      status: 'ok',
      data: {
        id: user,
        testVerificationLink: verificationLink,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = registerUserController;
