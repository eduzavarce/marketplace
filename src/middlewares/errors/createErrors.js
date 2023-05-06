const createError = (error, req, res, next) => {
  next();
};

module.exports = createError;
