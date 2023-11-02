const { throwError } = require('../../middlewares');
const {
  checkIfInWishlist,
  addToWishlist,
  changeWishlistStatus,
  findProductById,
} = require('../../repositories');

const changeWishlistController = async (req, res, next) => {
  const { id } = req.auth;
  const { idProduct } = req.params;
  try {
    const product = await findProductById(idProduct);

    if (!product) throwError(404, 'El producto no existe');
    if (!product.isActive) throwError(400, 'El producto no está disponible');
    const isInWishList = await checkIfInWishlist(id, idProduct);
    if (!isInWishList) {
      await addToWishlist(id, idProduct);
    } else {
      const { id, isActive } = isInWishList;
      await changeWishlistStatus(id, !isActive);
    }
    const currentStatus = await checkIfInWishlist(id, idProduct);

    res.status(200).send({ status: 'ok', data: currentStatus });
  } catch (error) {
    next(error);
  }
};
module.exports = { changeWishlistController };
