const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUserByUsername } = require('../../repositories');
const { throwError } = require('../../middlewares');

const schema = Joi.object().keys({
  username: Joi.string().min(4).max(20).required(),
  password: Joi.string().min(4).max(20).required(),
});

const loginUserController = async (req, res, next) => {
  try {
    const { body } = req;

    await schema.validateAsync(body);

    const { username, password } = body;

    const user = await findUserByUsername(username);
    if (!user) {
      throwError(404, 'El usuario y/o la contraseña no son correctos');
    }

    const { password: passwordHash, name, email, role, id } = user;

    const validPassword = await bcrypt.compare(password, passwordHash);

    if (!validPassword) {
      throwError(404, 'El usuario y/o la contraseña no son correctos');
    }
    const { SECRET } = process.env;

    const payload = { email, role, id, username, name };

    const expiresIn = '1y';

    const token = jwt.sign(payload, SECRET, { expiresIn });

    res.status(200).send({
      status: 'ok',
      data: {
        accessToken: token,
        expiresIn,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = loginUserController;
