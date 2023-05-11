const { findAllProducts } = require('../../repositories');

const findAllProductsController = async (req, res, next) => {
  try {
    const products = await findAllProducts();

    const { HTTP_URL, PORT } = process.env;
    console.log(products);

    const data = {
      id,
      name,
      description,
      price,
      category,
      idSeller,
      url: `${HTTP_URL}:${PORT}/api/vi/products/${id}`,
    };
    res.status(200);
    res.send({
      status: 'ok',
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = findAllProductsController;
