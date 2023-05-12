const Joi = require('joi');
const bcrypt = require('bcrypt');
const path = require('path');

const {
  findUserByUsername,
  updateUser,
  findUserById,
} = require('../../repositories');
const { throwError } = require('../../middlewares');
const { uploadImage } = require('../../helpers');
const { findCoordinatesByLocationName } = require('../../helpers');

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

    const { id: authId, role } = req.auth;
    let {
      id: idDataBase,
      name,
      lastname,
      password,
      bio,
      avatar,
      country,
      region,
      address,
      locationLat,
      locationLong,
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
      locationLat: bodyLocationLat,
      locationLong: bodyLocationLong,
    } = body;
    // console.log('USER', user);
    // console.log('body', req.body);

    let passwordHash;

    if (bodyPassword) {
      await schemaPassword.validateAsync({ bodyPassword, repeatPassword });
      passwordHash = await bcrypt.hash(bodyPassword, 10);

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
      avatar = await uploadImage(usersImagesFolder, idDataBase, images.data);
    }

    if (bodyAddress) {
      const fullAddress = `${bodyAddress}, ${bodyRegion}, ${bodyCountry} `;
      const coordinates = await findCoordinatesByLocationName(fullAddress);
      locationLat = coordinates.latitude;
      locationLong = coordinates.longitude;
      console.log(coordinates);
    }
    console.log(body.lat, body.long);
    await updateUser(
      bodyName ? bodyName : name,
      bodyLastname ? bodyLastname : lastname,
      bodyPassword ? passwordHash : password,
      avatar,
      bodyBio ? bodyBio : bio,
      bodyCountry ? bodyCountry : country,
      bodyRegion ? bodyRegion : region,
      bodyAddress ? bodyAddress : address,
      bodyLocationLat ? bodyLocationLat : locationLat,
      bodyLocationLong ? bodyLocationLong : locationLong,
      idDataBase
    );
    const responseUser = await findUserById(idDataBase);
    delete responseUser.password;
    delete responseUser.verificationCode;
    delete responseUser.verifiedAt;
    delete responseUser.type;
    delete responseUser.taxNumber;
    /*
    if (email !== userById.email) {
      const verificationCode = randomstring.generate(64);
      await addVerificationCode(id, verificationCode);
      await sendVerificationCode(name, email, verificationCode);
    }



    res.send({ id, name, email, role: userById.role });
    */
    res.status(200).send({
      status: 'ok',
      data: responseUser,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = updateUserController;
