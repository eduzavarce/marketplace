const isAdmin = require('../../helpers/utils');
const { findAllUsers } = require('../../repositories/usersRepository');

const usersController = async (req, res, next) => {
  try {
    const { role } = req.auth;
    isAdmin(role);

    const users = await findAllUsers();

    res.status(200);
    res.send({ data: users });
  } catch (error) {
    next(error);
  }
};

module.exports = usersController;
