const Joi = require('joi');
const { HTTP_URL, PORT } = process.env;
const { createProduct } = require('../../repositories');
const {
  insertLocationName,
  insertLocation,
} = require('../../repositories/products/productsRepositories');

const schema = Joi.object().keys({
  name: Joi.string().min(4).max(100).required(),
  description: Joi.string().min(4).max(100).required(),
  price: Joi.number().required(),
  category: Joi.string()
    .valid('consoles', 'games', 'PC', 'cloth', 'controllers', 'arcade')
    .required(),
  keywords: Joi.string().max(100),
  idUser: Joi.string().required(),
  defaultPicture: Joi.all(),
  status: Joi.string().valid('new', 'used', 'refurbished').required(),
});

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
    await schema.validateAsync({
      name,
      description,
      price,
      category,
      keywords,
      idUser,
      defaultPicture,
      status,
    });
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
