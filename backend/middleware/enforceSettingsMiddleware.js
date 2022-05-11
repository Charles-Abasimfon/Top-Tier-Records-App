const asyncHandler = require('express-async-handler');
const Settings = require('../models/settingsModel');

const enforceSettings = asyncHandler(async (req, res, next) => {
  let settingToBeEnforced = req.body.settingToBeEnforced;
  if (req.admin.admin_level === 'Administrator') {
    next();
  } else {
    //Check for missing setting to be queried or enforced
    if (!settingToBeEnforced) {
      res.status(400);
      throw new Error('Missing setting to be enforced');
    }
    //Get settings
    const settings = await Settings.find({}).sort({ _id: 1 }).limit(1).lean();
    if (settings[0]) {
      //Check if action is allowed
      if (settings[0][settingToBeEnforced] === true) {
        next();
      } else {
        res.status(401);
        throw new Error('Action not allowed');
      }
    } else {
      res.status(400);
      throw new Error('Could not get settings');
    }
  }
});

module.exports = {
  enforceSettings,
};
