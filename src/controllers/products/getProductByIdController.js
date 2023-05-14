const { createImageUrl } = require('../../helpers');
const {
  findProductById,
  findImagesByIdProduct,
} = require('../../repositories');

const findProductByIdController = async (req, res, next) => {
  try {
    const { idProduct } = req.params;
    const product = await findProductById(idProduct);

    const { HTTP_URL, PORT } = process.env;
    const {
      id,
      name,
      description,
      price,
      category,
      idUser: idSeller,
    } = product;
    const picturesFileNames = await findImagesByIdProduct(idProduct);

    const pictures = picturesFileNames.map((picture) => {
      console.log('filename: ', picture.fileName, idProduct);
      return createImageUrl(picture.fileName, idProduct, 'products');
    });

    const data = {
      id,
      name,
      description,
      price,
      category,
      idSeller,
      url: `${HTTP_URL}:${PORT}/api/vi/products/${id}`,
    };
    data.pictures = pictures;
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
