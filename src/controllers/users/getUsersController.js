const { createImageUrl } = require('../../helpers');
const { throwError } = require('../../middlewares');
const {
  findAllDealsByUserId,
  findAllDealsChatHistoryByUserId,
} = require('../../repositories');
const { findUserById } = require('../../repositories/users/usersRepositories');
const { FULL_DOMAIN } = process.env;
const usersController = async (req, res, next) => {
  try {
    const { auth } = req;
    const { username } = req.params;
    const { id } = auth;
    if (auth.username !== username)
      throwError(403, 'Este no es el perfil de tu usuario');

    const userData = await findUserById(id);
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

    const userChatHistory = await findAllDealsChatHistoryByUserId(id);
    const usersDealsHistory = await findAllDealsByUserId(id);
    res.status(200);
    res.send({
      status: 'ok',
      data: {
        userData,
        dealsHistory: usersDealsHistory,
        chatHistory: userChatHistory,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = usersController;
