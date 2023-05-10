const dealsCommunicationController = async (req, res, next) => {
  try {
    const { body } = req;
    console.log(req.params, 'query', req.query);
    console.log('req');
    res.send('holita');
  } catch (error) {
    next(error);
  }
};
module.exports = { dealsCommunicationController };
