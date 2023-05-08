const registerUserController = async (req, res, next) => {
  try {
    res.send('hola');
  }
  catch (error) {
    next(error);
  }
};

module.exports = registerUserController;
