const Joi = require('joi');
const bcrypt = require('bcrypt');
const randomstring = require('randomstring');
const path = require('path');
const { ensureDir } = require('fs-extra');

const {
  findUserById,
  findUserByEmail,

  udpateUserById,
  addVerificationCode,
} = require('../../repositories');
const { throwError, createError } = require('../../middlewares');
const { sendVerificationCode } = require('../../emails');
const { uploadImage } = require('../../helpers');

const schema = Joi.object().keys({
  name: Joi.string().min(3).max(45),
  lastname: Joi.string().min(3).max(45),
  email: Joi.string().email(),
  password: Joi.string().optional(),
  repeatPassword: Joi.string().optional(),
  avatar: Joi.string().min(3).max(80),
  bio: Joi.string().min(3).max(255),
  country: Joi.string().min(3).max(45),
  region: Joi.string().min(3).max(45),
  address: Joi.string().min(3).max(255),
});

const schemaPassword = Joi.object().keys({
  password: Joi.string().min(4).max(20).required(),
  repeatPassword: Joi.ref('password'),
});

const updateUserController = async (req, res) => {
  try {
    const { id } = req.auth;

    //Validamos los datos del body
    const { body } = req;
    await schema.validateAsync(body);
    const { name, email, password, repeatPassword } = req.body;

    const userById = await findUserById(id);
    const user = await findUserByEmail(email);

    if (user && user.id !== id) {
      throwError(409, 'Ya existe un usuario con ese email');
    }

    let updatedPassword = userById.password;
    if (password) {
      await schemaPassword.validateAsync({ password, repeatPassword });
      const passwordHash = await bcrypt.hash(password, 12);

      updatedPassword = passwordHash;
    }

    await udpateUserById({ id, name, email, password: updatedPassword });

    if (email !== userById.email) {
      const verificationCode = randomstring.generate(64);
      await addVerificationCode(id, verificationCode);
      await sendVerificationCode(name, email, verificationCode);
    }

    //avatar

    const usersImagesFolder = path.join(
      __dirname,
      '../../../public',
      `/users/${id}`
    );
    const filename = await uploadImage(usersImagesFolder, id, images.data);
    await insertUsersImageName(id, filename);

    res.send({ id, name, email, role: userById.role });
  } catch (err) {
    createError(err, res);
  }
};

module.exports = updateUserController;
