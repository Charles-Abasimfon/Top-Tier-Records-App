const asyncHandler = require('express-async-handler');

const onlyAdministrators = asyncHandler(async (req, res, next) => {
  if (req.admin.admin_level === 'Administrator') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized');
  }
});

module.exports = {
  onlyAdministrators,
};
