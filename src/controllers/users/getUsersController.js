const { throwError } = require('../../middlewares');
const { findAllDealsByUserId } = require('../../repositories');
const { findUserById } = require('../../repositories/users/usersRepositories');

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

    const usersDealsHistory = await findAllDealsByUserId(id);
    res.status(200);
    res.send({
      status: 'ok',
      data: { userData, usersDealsHistory },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = usersController;
