const Joi = require('joi');
const { HTTP_URL, PORT } = process.env;
const {
  createProduct,
  findProductById,
  findUserById,
} = require('../../repositories');
const { findCoordinatesByLocationName } = require('../../helpers');

const schema = Joi.object().keys({
  name: Joi.string().min(4).max(100).required(),
  description: Joi.string().min(4).max(255).required(),
  price: Joi.number().required(),
  category: Joi.string()
    .valid(
      'music',
      'video',
      'photography',
      'gaming',
      'computer',
      'collector',
      'television',
      'cloth',
      'others'
    )
    .required(),
  keywords: Joi.string().max(100),
  region: Joi.string().max(45).allow(''),
  country: Joi.string().max(45).allow(''),
  address: Joi.string().max(200).allow(''),
  city: Joi.string().max(200).allow(''),
  status: Joi.string().valid('new', 'used', 'refurbished').required(),
  useSavedAddress: Joi.bool(),
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
      city,
      keywords,
      status,
      useSavedAddress,
    } = body;
    await schema.validateAsync({
      name,
      description,
      price,
      category,
      keywords,
      region,
      city,
      country,
      address,
      status,
    });
    let locationLat, locationLong;
    if (address) {
      const fullAddress = `${address}, ${region}, ${country} `;
      const coordinates = await findCoordinatesByLocationName(fullAddress);
      locationLat = coordinates?.latitude;
      locationLong = coordinates?.longitude;
    }
    console.log(body);
    let product;
    if (useSavedAddress) {
      const user = await findUserById(id);
      const { address, city, region, country, locationLat, locationLong } =
        user;
      product = await createProduct(
        name,
        description,
        price,
        category,
        keywords,
        region,
        country,
        address,
        city,
        locationLat,
        locationLong,
        id,
        status
      );
    } else {
      product = await createProduct(
        name,
        description,
        price,
        category,
        keywords,
        region,
        country,
        address,
        city,
        locationLat ? locationLat : null,
        locationLong ? locationLong : null,
        id,
        status
      );
    }

    const productInfo = await findProductById(product);

    res.status(200).send({
      status: 'ok',
      data: {
        productInfo,
        url: `http://${HTTP_URL}:${PORT}/api/v1/products/${product}`,
        uploadImagesUrl: `http://${HTTP_URL}:${PORT}/api/v1/products/${product}`,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createProductController;
