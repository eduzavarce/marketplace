const { findAllProducts } = require('../../repositories');

const findAllProductsController = async (req, res, next) => {
  try {
    const products = await findAllProducts();

    res.status(200);
    res.send({
      status: 'ok',
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = findAllProductsController;
