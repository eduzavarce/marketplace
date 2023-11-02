const { createImageUrl } = require('../../helpers');
const { getWishlist, findImagesByIdProduct } = require('../../repositories');

const getWishlistController = async (req, res, next) => {
  try {
    const { id } = req.auth;

    const wishlist = await getWishlist(id);
    for (const product of wishlist) {
      const picturesFileNames = await findImagesByIdProduct(product.id);
      if (picturesFileNames) {
        const pictures = picturesFileNames.map((picture) => {
          const url = createImageUrl(picture.fileName, product.id, 'products');
          return url;
        });
        product.images = pictures;
      }
    }
    res.status(200).send({ status: 'ok', data: wishlist });
  } catch (error) {
    next(error);
  }
};
module.exports = { getWishlistController };
