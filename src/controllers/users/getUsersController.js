const { createImageUrl } = require('../../helpers');
const { throwError } = require('../../middlewares');
const {
  findAvgReviewsByUserId,
  findProductForResponsesByUserId,
  findImagesByIdProduct,
} = require('../../repositories');
const {
  findUserByUsername,
} = require('../../repositories/users/usersRepositories');
const { FULL_DOMAIN } = process.env;
const usersController = async (req, res, next) => {
  try {
    const { username } = req.params;

    const userData = await findUserByUsername(username);
    if (!userData) throwError(404, 'el usuario no existe');

    if (userData.avatar) {
      userData.avatarUrl = createImageUrl(
        userData.avatar,
        userData.id,
        'users'
      );
    } else userData.avatarUrl = `${FULL_DOMAIN}/users/default-avatar.png`;

    let products = await findProductForResponsesByUserId(userData.id);
    products = products.filter((product) => product.isActive);
    const avgReviews = await findAvgReviewsByUserId(userData.id);

    for await (const product of products) {
      const picturesFileNames = await findImagesByIdProduct(product.id);
      // console.log(picturesFileNames);
      if (picturesFileNames) {
        const pictures = picturesFileNames.map((picture) => {
          // console.log('hola');
          // console.log('filename: ', picture.fileName, product.id);
          const url = createImageUrl(picture.fileName, product.id, 'products');
          return url;
        });
        product.images = pictures;
      }
    }

    const response = {
      status: 'ok',
      data: {
        userData: {
          username: userData.username,
          avatar: userData.avatar,
          bio: userData.bio,
          avgScore: avgReviews?.avgScore || 0,
          avatarUrl: userData.avatarUrl,
        },
        products,
      },
    };

    res.status(200);
    res.send(response);
  } catch (error) {
    next(error);
  }
};

module.exports = usersController;
