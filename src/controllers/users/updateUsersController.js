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
  findUserByUsername,
} = require('../../repositories');
const { throwError } = require('../../middlewares');
const { sendVerificationCode } = require('../../emails');
const { uploadImage } = require('../../helpers');

const schema = Joi.object().keys({
  name: Joi.string().min(3).max(45),
  lastname: Joi.string().min(3).max(45),
  email: Joi.string().email(),
  password: Joi.string().optional(),
  repeatPassword: Joi.string().optional(),
  // avatar: Joi.string().min(3).max(80),
  bio: Joi.string().min(3).max(255),
  country: Joi.string().min(3).max(45),
  region: Joi.string().min(3).max(45),
  address: Joi.string().min(3).max(255),
  images: Joi.string().min(0),
});

const schemaPassword = Joi.object().keys({
  bodyPassword: Joi.string().min(4).max(20).required(),
  repeatPassword: Joi.ref('bodyPassword'),
});

const updateUserController = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await findUserByUsername(username);
    if (!user) throwError(404, 'usuario no encontrado');

    const { authId, role } = req.auth;

    const {
      id: idDataBase,
      name,
      lastname,
      email,
      bio,
      country,
      region,
      address,
    } = user;

    if (role !== 'admin' && authId !== idDataBase)
      throwError(403, 'No es tu perfil de usuario');

    //Validamos los datos del body
    const { body } = req;

    await schema.validateAsync(body);

    const {
      name: bodyName,
      lastname: bodyLastname,
      email: bodyEmail,
      password: bodyPassword,
      bio: bodyBio,
      repeatPassword,
      country: bodyCountry,
      region: bodyRegion,
      address: bodyAddress,
    } = body;
    // console.log('USER', user);
    // console.log('body', req.body);

    if (bodyPassword) {
      await schemaPassword.validateAsync({ bodyPassword, repeatPassword });
      const passwordHash = await bcrypt.hash(bodyPassword, 10);

      body.bodyPassword = passwordHash;
    }
    if (req.files) {
      const { images } = req.files;

      if (Array.isArray(images))
        throwError(400, 'debes introducir solo una imagen');
      const usersImagesFolder = path.join(
        __dirname,
        '../../../public',
        `/users/${idDataBase}`
      );
      const filename = await uploadImage(
        usersImagesFolder,
        idDataBase,
        images.data
      );
      console.log(filename);
    }

    /*
    await udpateUserById({ id, name, email, password: updatedPassword });

    if (email !== userById.email) {
      const verificationCode = randomstring.generate(64);
      await addVerificationCode(id, verificationCode);
      await sendVerificationCode(name, email, verificationCode);
    }

    //avatar


    res.send({ id, name, email, role: userById.role });
    */
    res.send('hola');
  } catch (err) {
    next(err);
  }
};

module.exports = updateUserController;
