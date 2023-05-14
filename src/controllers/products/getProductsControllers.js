const { createImageUrl } = require('../../helpers');
const {
  findAllProducts,
  findImagesByIdProduct,
} = require('../../repositories');

const findAllProductsController = async (req, res, next) => {
  try {
    const products = await findAllProducts();

    const productsImages = await Promise.all(
      products.map(async (product) => {
        const picturesFileNames = await findImagesByIdProduct(product.id);

        const pictures = await Promise.all(
          picturesFileNames.map((picture) => {
            console.log('filename: ', picture.fileName, product.id);
            return createImageUrl(picture.fileName, product.id, 'products');
          })
        );
      })
    );
    console.log(productsImages);

    res.status(200);

    res.send({
      status: 'ok',
      products,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = findAllProductsController;
