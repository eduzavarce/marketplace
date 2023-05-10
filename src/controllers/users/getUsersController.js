const { throwError } = require('../../middlewares');
const { findAllUsers } = require('../../repositories/users/usersRepositories');

// Listado de todos los usuarios para q el
// administrador pueda gestionarlos
const usersController = async (req, res) => {
  try {
    // const { role } = req.auth;
    // isAdmin(role);

    const users = await findAllUsers();

    res.status(200);
    res.send({ data: users });
  } catch (error) {
    throwError(error, res);
  }
};

module.exports = usersController;
