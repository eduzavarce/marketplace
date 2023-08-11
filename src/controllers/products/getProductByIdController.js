const { createImageUrl } = require('../../helpers');
const {
  findProductById,
  findImagesByIdProduct,
  findAvgReviewsByUserId,
  findUserById,
} = require('../../repositories');
const { FULL_DOMAIN } = process.env;
const findProductByIdController = async (req, res, next) => {
  try {
    const { idProduct } = req.params;
    console.log(idProduct);
    const product = await findProductById(idProduct);
    const user = await findUserById(product.idUser);
    console.log(user);
    const picturesFileNames = await findImagesByIdProduct(idProduct);

    const pictures = picturesFileNames.map((picture) => {
      return createImageUrl(picture.fileName, idProduct, 'products');
    });

    const avgReviews = await findAvgReviewsByUserId(product.idUser);

    const { avgScore } = avgReviews || {};

    const data = {
      id: product.id,
      name: product.name,
      description: product.description,
      city: product.city,
      address: product.address,
      country: product.country,
      region: product.region,
      price: product.price,
      category: product.category,
      usernameVendor: user.username,
      profileUrlVendor: `${FULL_DOMAIN}/api/v1/users/${product.usernameVendor}`,
      avgReviewsVendor: avgScore || null,

      url: `${FULL_DOMAIN}/api/vi/products/${product.id}`,
    };
    data.images = pictures;
    console.log(data);
    res.status(200);
    res.send({
      status: 'ok',
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = findProductByIdController;
