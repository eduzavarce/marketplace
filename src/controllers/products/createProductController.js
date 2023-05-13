const Joi = require('joi');
const { HTTP_URL, PORT } = process.env;
const { createProduct } = require('../../repositories');
const { findCoordinatesByLocationName } = require('../../helpers');

const schema = Joi.object().keys({
  name: Joi.string().min(4).max(100).required(),
  description: Joi.string().min(4).max(100).required(),
  price: Joi.number().required(),
  category: Joi.string()
    .valid('consoles', 'games', 'PC', 'cloth', 'controllers', 'arcade')
    .required(),
  keywords: Joi.string().max(100),
  region: Joi.string().max(45).required(),
  country: Joi.string().max(45).required(),
  address: Joi.string().max(255).required(),
  status: Joi.string().valid('new', 'used', 'refurbished').required(),
});

const createProductController = async (req, res, next) => {
  try {
    const { body, auth } = req;
    const { id } = auth;
    const {
      name,
      description,
      price,
      category,
      region,
      country,
      address,
      keywords,
      status,
    } = body;
    await schema.validateAsync({
      name,
      description,
      price,
      category,
      keywords,
      region,
      country,
      address,
      status,
    });

    const fullAddress = `${address}, ${region}, ${country} `;
    const coordinates = await findCoordinatesByLocationName(fullAddress);
    const locationLat = coordinates.latitude;
    const locationLong = coordinates.longitude;

    const product = await createProduct(
      name,
      description,
      price,
      category,
      keywords,
      region,
      country,
      address,
      locationLat,
      locationLong,
      id,
      status
    );

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
