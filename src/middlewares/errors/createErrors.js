const createError = (error, req, res, next) => {
  const { status, message } = error;
  res.status(status || (error.details ? 422 : 500));
  res.send({
    status: 'error',
    code: status,
    error: message,
  });
};

module.exports = createError;
