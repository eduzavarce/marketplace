const Joi = require('joi');
const { HTTP_URL, PORT } = process.env;
const {
  findProductById,
  insertLocation,
  insertLocationName,
  updateProduct,
} = require('../../repositories');
const { throwError } = require('../../middlewares');

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
  idUser: Joi.number().required(),
  defaultPicture: Joi.string(),
  status: Joi.string().valid('new', 'used', 'refurbished'),
});
const updateProductController = async (req, res, next) => {
  try {
    const { body, params, auth } = req;
    const { idProduct } = params;
    const { id } = auth;
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

    if (id !== idUser) {
      throwError(400, 'Usuario no autorizado');
    }

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

    if (name) await updateProduct('name', name, id);
    if (description) await updateProduct('description', description, id);
    if (price) await updateProduct('price', price, id);
    if (category) await updateProduct('category', category, id);
    if (keywords) await updateProduct('keywords', keywords, id);
    if (status) await updateProduct('status', status, id);

    if (body['[locationName]']) {
      insertLocationName(body['[locationName]'], idProduct);
    } else if (body['location]']) {
      const [locationLat, locationLong] = body['[location]'].split(',');
      insertLocation(locationLat, locationLong, idProduct);
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
