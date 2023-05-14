const { createImageUrl } = require('../../helpers');
const { throwError } = require('../../middlewares');
const {
  findAllDealsByUserId,
  findAllDealsChatHistoryByUserId,
  findAvgReviewsByUserId,
  findImagesByIdProduct,
  findProductForResponsesByUserId,
} = require('../../repositories');
const {
  findUserByUsername,
} = require('../../repositories/users/usersRepositories');
const { FULL_DOMAIN } = process.env;
const ownUserController = async (req, res, next) => {
  try {
    const { auth } = req;
    const { username } = req.params;

    if (auth.username !== username) throwError(403, 'Usuario inválido');

    const userData = await findUserByUsername(username);
    if (!userData) throwError(404, 'usuario no existe');
    const avgReviews = await findAvgReviewsByUserId(userData.id);
    userData.avgScore = avgReviews.avgScore;
    delete userData.password;
    delete userData.verificationCode;
    delete userData.verifiedAt;
    delete userData.type;
    delete userData.taxNumber;
    if (userData.avatar) {
      userData.avatarUrl = createImageUrl(
        userData.avatar,
        userData.id,
        'users'
      );
    } else userData.avatarUrl = `${FULL_DOMAIN}/users/default-avatar.png`;

    const products = await findProductForResponsesByUserId(userData.id);

    for await (const product of products) {
      const picturesFileNames = await findImagesByIdProduct(product.id);
      if (picturesFileNames) {
        const pictures = picturesFileNames.map((picture) => {
          const url = createImageUrl(picture.fileName, product.id, 'products');
          return url;
        });
        product.images = pictures;
      }
    }

    const userChatHistory = await findAllDealsChatHistoryByUserId(userData.id);
    const usersDealsHistory = await findAllDealsByUserId(userData.id);
    const response = {
      status: 'ok',
      data: {
        userData,

        products,
        dealsHistory: usersDealsHistory,
        chatHistory: userChatHistory,
      },
    };

    //  else {
    //   response = {
    //     status: 'ok',
    //     data: {
    //       userData: {
    //         username: userData.username,
    //         avatar: userData.avatar,
    //         bio: userData.bio,
    //
    //         avatarUrl: userData.avatarUrl,
    //       },
    //       products,
    //     },
    //   };
    // }

    res.status(200);
    res.send(response);
  } catch (error) {
    next(error);
  }
};

module.exports = ownUserController;
