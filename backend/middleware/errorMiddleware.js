//THIS IS A MIDDLEWARE THAT CHANGES A BIT OF HOW THE throw Error DISPLAYS ERRORS
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
