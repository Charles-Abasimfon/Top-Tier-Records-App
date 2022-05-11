const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Admin = require('../models/adminModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if admin still exists
      const currentAdmin = await Admin.findById(decoded.id).select('-password');
      //If admin does not exist, return error
      if (!currentAdmin) {
        return next(new ErrorResponse(`Admin no longer exists`, 404));
      } else {
        //Check is admin is not an Administrator and has been suspended
        if (
          currentAdmin.admin_level !== 'Administrator' &&
          currentAdmin.status === 'Suspended'
        ) {
          return next(
            new ErrorResponse(`Recorder/Moderator has been suspended`, 401)
          );
        }
        //If admin exists, set admin to req.admin and call next middleware
        req.admin = currentAdmin;
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized to access this route');
    }
  }

  //If token is not found, return error
  if (!token) {
    res.status(401);
    throw new Error('Not authorized to access this route');
  }
});

module.exports = {
  protect,
};
