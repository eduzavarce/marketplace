const Joi = require('joi');
const { HTTP_URL, PORT } = process.env;
const {
  findProductById,
  updateProduct,
  findImagesByIdProduct,
} = require('../../repositories');
const { throwError } = require('../../middlewares');
const {
  findCoordinatesByLocationName,
  createImageUrl,
} = require('../../helpers');

const schema = Joi.object().keys({
  name: Joi.string().min(4).max(100),
  description: Joi.string().min(4).max(100),
  price: Joi.number(),
  category: Joi.string().valid(
    'music',
    'video',
    'photography',
    'gaming',
    'computer',
    'collector',
    'television',
    'cloth',
    'others'
  ),
  keywords: Joi.string().max(100).allow(''),
  country: Joi.string().max(45).allow(''),
  region: Joi.string().max(45).allow(''),
  city: Joi.string().max(200).allow(''),
  address: Joi.string().max(200).allow(''),
  status: Joi.string().valid('new', 'used', 'refurbished').allow(''),
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
      city: bodyCity,
      status,
    } = body;

    // await schema.validateAsync(body);
    const product = await findProductById(idProduct.slice(1));
    console.log(product);
    if (product.idUser)
      if (id !== product.idUser && role !== 'admin') {
        throwError(403, 'Usuario no autorizado');
      }

    let locationLat, locationLong;
    if (bodyAddress) {
      const fullAddress = `${bodyAddress}, ${bodyRegion}, ${bodyCountry} `;
      const coordinates = await findCoordinatesByLocationName(fullAddress);
      locationLat = coordinates.latitude;
      locationLong = coordinates.longitude;
    }
    await updateProduct(
      name === '' ? product.name : name,
      description === '' ? product.description : product.description,
      price === '' ? product.price : product.price,
      category === '' ? product.category : category,
      keywords === '' ? product.keywords : keywords,
      bodyRegion === '' ? product.region : bodyRegion,
      bodyCountry === '' ? product.country : bodyCountry,
      bodyAddress === '' ? product.address : bodyAddress,
      bodyCity === '' ? product.city : bodyCity,
      locationLat === '' ? product.locationLat : locationLat,
      locationLong === '' ? product.locationLong : locationLong,
      status === '' ? status : product.status,
      idProduct.slice(1)
    );
    console.log(idProduct);
    const productAfterUpdate = await findProductById(idProduct.slice(1));
    if (id !== product.idUser && role !== 'admin') {
      throwError(403, 'Usuario no autorizado');
    }
    console.log(productAfterUpdate);
    const data = {
      id: productAfterUpdate.id,
      name: productAfterUpdate.id,
      description: productAfterUpdate.description,
      price: productAfterUpdate.price,
      category: productAfterUpdate.category,
      url: `http://${HTTP_URL}:${PORT}/api/vi/products/${id}`,
    };
    const picturesFileNames = await findImagesByIdProduct(idProduct);

    data.pictures = picturesFileNames.map((picture) => {
      return createImageUrl(picture.fileName, idProduct, 'products');
    });

    res.send({
      status: 'ok',
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateProductController;
