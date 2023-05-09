const createJsonError = require('../../errors/createJsonError');
const isAdmin = require('../../helpers/utils');
const { findAllUsers } = require('../../repositories/usersRepository');

// Listado de todos los usuarios para q el
// administrador pueda gestionarlos
const usersController = async (req, res) => {
  try {
    const { role } = req.auth;
    isAdmin(role);

    const users = await findAllUsers();

    res.status(200);
    res.send({ data: users });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = usersController;
