const { throwError } = require('../../middlewares');
const { findAllUsers } = require('../../repositories/users/usersRepositories');

const usersController = async (req, res, next) => {
  try {
    // const { role } = req.auth;
    // isAdmin(role);

    const users = await findAllUsers();

    res.status(200);
    res.send({ data: users });
  } catch (error) {
    next(error);
  }
};

module.exports = usersController;
