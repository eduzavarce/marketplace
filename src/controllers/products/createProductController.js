const Joi = require('joi');
const { createProduct } = require('../../repositories');
const { throwError } = require('../../middlewares');

const locationSchema = Joi.string();

const createProductController = async (req, res, next) => {
  try {
    const { body } = req;
    const {
      name,
      description,
      price,
      category,
      keywords,
      idUser,
      location,
      defaultPicture,
      status,
    } = body;
    const product = await createProduct(
      name,
      description,
      price,
      category,
      keywords,
      idUser,
      status
    );
    const consola = await locationSchema.validateAsync(location);
    console.log(consola);
    const [locationLat, locationLong] = location;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = createProductController;
