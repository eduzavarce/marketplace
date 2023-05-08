const Joi = require('joi');
const {
  findUserByEmail,
} = require('../../repositories/users/usersRepositories');

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

    console.log(body);
    await schema.validateAsync(body);

    const emailExists = await findUserByEmail(email);

    console.log(emailExists);

    res.send('hola');
  } catch (error) {
    next(error);
  }
};

module.exports = registerUserController;
