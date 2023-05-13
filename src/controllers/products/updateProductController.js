const Joi = require('joi');
const { HTTP_URL, PORT } = process.env;
const { findProductById, updateProduct } = require('../../repositories');
const { throwError } = require('../../middlewares');
const { findCoordinatesByLocationName } = require('../../helpers');

const schema = Joi.object().keys({
  name: Joi.string().min(4).max(100),
  description: Joi.string().min(4).max(100),
  price: Joi.number(),
  category: Joi.string().valid(
    'consoles',
    'games',
    'PC',
    'cloth',
    'controllers',
    'arcade'
  ),
  keywords: Joi.string().max(100),
  country: Joi.string().max(45),
  region: Joi.string().max(45),
  address: Joi.string().max(255),
  status: Joi.string().valid('new', 'used', 'refurbished'),
});
const updateProductController = async (req, res, next) => {
  try {
    const { body, params, auth } = req;
    const { idProduct } = params;
    const { id, role } = auth;
    const {
      name,
      description,
      price,
      category,
      keywords,
      country: bodyCountry,
      region: bodyRegion,
      address: bodyAddress,
      status,
    } = body;

    console.log(body);
    await schema.validateAsync(body);
    const product = await findProductById(idProduct);
    console.log(product);
    if (id !== product.idUser && role !== 'admin') {
      throwError(403, 'Usuario no autorizado');
    }

    await updateProduct(
      name ? name : product.name,
      description ? description : product.description,
      price ? price : product.price,
      category ? category : product.category,
      keywords ? keywords : product.keywords,
      bodyRegion ? bodyRegion : product.region,
      bodyCountry ? bodyCountry : product.country,
      bodyAddress ? bodyAddress : product.address,
      status ? status : product.status,
      idProduct
    );
    let locationLat, locationLong;
    if (bodyAddress) {
      const fullAddress = `${bodyAddress}, ${bodyRegion}, ${bodyCountry} `;
      const coordinates = await findCoordinatesByLocationName(fullAddress);
      locationLat = coordinates.latitude;
      locationLong = coordinates.longitude;
    }

    res.send({
      status: 'ok',
      data: {
        id: idProduct,
        url: `http://${HTTP_URL}:${PORT}/api/v1/products/${idProduct}`,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateProductController;
