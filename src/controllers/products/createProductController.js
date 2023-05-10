const Joi = require('joi');
const { HTTP_URL, PORT } = process.env;
const { createProduct } = require('../../repositories');
const { throwError } = require('../../middlewares');
const {
  insertLocationName,
  insertLocation,
} = require('../../repositories/products/productsRepositories');

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
    if (body['[locationName]']) {
      insertLocationName(body['[locationName]'], product);
    } else {
      const [locationLat, locationLong] = body['[location]'].split(',');
      insertLocation(locationLat, locationLong, product);
    }

    res.status(200).send({
      status: 'ok',
      data: {
        id: product,
        url: `http://${HTTP_URL}:${PORT}/api/v1/products/${product}`,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createProductController;
