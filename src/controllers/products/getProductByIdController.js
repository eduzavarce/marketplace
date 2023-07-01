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
    const product = await findProductById(idProduct);

    const {
      id,
      name,
      description,
      city,
      price,
      category,
      idUser: idVendor,
    } = product;
    const picturesFileNames = await findImagesByIdProduct(idProduct);

    const pictures = picturesFileNames.map((picture) => {
      return createImageUrl(picture.fileName, idProduct, 'products');
    });

    const avgReviews = await findAvgReviewsByUserId(idVendor);
    const vendorData = await findUserById(idVendor);
    const { username } = vendorData;
    const { avgScore } = avgReviews || {};

    const data = {
      id,
      name,
      description,
      city,
      price,
      category,
      usernameVendor: username,
      profileUrlVendor: `${FULL_DOMAIN}/api/v1/users/${username}`,
      avgReviewsVendor: avgScore || null,

      url: `${FULL_DOMAIN}/api/vi/products/${id}`,
    };
    data.images = pictures;
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
