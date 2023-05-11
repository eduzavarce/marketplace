const { findProductById } = require('../../repositories');

const findProductByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await findProductById(id);

    console.log(product);

    res.status(200);
    res.send({
      status: 'ok',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = findProductByIdController;

// id,
// name,
// description,
// price,
// category,
// keywords,
// idSeller,
// images,
// `${HTTP_URL}:${PORT}/api/vi/products/${id}`
// LocationName,
// // fav¿?
