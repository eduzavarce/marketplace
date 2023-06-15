const { getWishlist } = require('../../repositories');

const getWishlistController = async (req, res, next) => {
  try {
    const { id } = req.auth;

    const wishlist = await getWishlist(id);

    res.status(200).send({ status: 'ok', data: wishlist });
  } catch (error) {
    next(error);
  }
};
module.exports = { getWishlistController };
