const { createImageUrl } = require('../../helpers');
const {
  findAllProducts,
  findImagesByIdProduct,
} = require('../../repositories');

const findAllProductsController = async (req, res, next) => {
  try {
    const products = await findAllProducts();

    await Promise.all(
      products.map(async (product) => {
        const picturesFileNames = await findImagesByIdProduct(product.id);
        // console.log(picturesFileNames);
        if (picturesFileNames) {
          const pictures = picturesFileNames.map((picture) => {
            // console.log('hola');
            // console.log('filename: ', picture.fileName, product.id);
            const url = createImageUrl(
              picture.fileName,
              product.id,
              'products'
            );
            return url;
          });
          product.images = pictures;
        }
      })
    );

    res.status(200);

    res.send({
      status: 'ok',
      products,
      // images: productsImages,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = findAllProductsController;
