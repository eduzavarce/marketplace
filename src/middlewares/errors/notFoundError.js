const notFoundError = () => {
  res.status(404).send({ status: 'error', message: 'Not found' });
};

module.exports = notFoundError;
