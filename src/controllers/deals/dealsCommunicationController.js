const dealsCommunicationController = async (req, res, next) => {
  try {
    console.log('hola');
    res.send('holita');
  } catch (error) {
    next(error);
  }
};
module.exports = { dealsCommunicationController };
