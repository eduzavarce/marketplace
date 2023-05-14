const { createImageUrl } = require('../../helpers');
const {
  findAllDealsByUserId,
  findAllDealsChatHistoryByUserId,
  findProductByUserId,
  findAvgReviewsByUserId,
} = require('../../repositories');
const {
  findUserByUsername,
} = require('../../repositories/users/usersRepositories');
const { FULL_DOMAIN } = process.env;
const ownUserController = async (req, res, next) => {
  try {
    const { auth } = req;
    const { username } = req.params;

    const userData = await findUserByUsername(username);
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

    const products = await findProductByUserId(userData.id);
    const avgReviews = await findAvgReviewsByUserId(userData.id);

    const userChatHistory = await findAllDealsChatHistoryByUserId(userData.id);
    const usersDealsHistory = await findAllDealsByUserId(userData.id);
    let response;
    if (auth && auth.username === username) {
      response = {
        status: 'ok',
        data: {
          userData,
          products,
          dealsHistory: usersDealsHistory,
          chatHistory: userChatHistory,
        },
      };
    } else {
      response = {
        status: 'ok',
        data: {
          userData: {
            username: userData.username,
            avatar: userData.avatar,
            bio: userData.bio,
            avatarUrl: userData.avatarUrl,
          },
          products,
          avgReviews,
        },
      };
    }

    res.status(200);
    res.send(response);
  } catch (error) {
    next(error);
  }
};

module.exports = ownUserController;
