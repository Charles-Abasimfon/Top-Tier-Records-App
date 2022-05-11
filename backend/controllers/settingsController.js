const asyncHandler = require('express-async-handler');
const Settings = require('../models/settingsModel');

//@desc Create Settings
//@route POST /api/settings/create
//@access Private
const createSettings = asyncHandler(async (req, res) => {
  //Check if admin is an Administrator
  if (req.admin.admin_level !== 'Administrator') {
    res.status(401);
    throw new Error('You are not authorized to perform this action');
  }
  //Check if settings document in Settings collection exists already
  const settingsExists = await Settings.findOne({});
  if (settingsExists) {
    res.status(400);
    throw new Error('Settings document already exists');
  }
  const data = {
    ...req.body,
  };
  const settings = await Settings.create(data);
  if (settings) {
    res.status(204).json({ message: 'Setting created successfully' });
  } else {
    res.status(400);
    throw new Error('Setting could not be created, please try again');
  }
});

//@desc Get Settings
//@route GET /api/settings/get
//@access Private
const getSettings = asyncHandler(async (req, res) => {
  const settings = await Settings.find({}).sort({ _id: 1 }).limit(1).lean();
  if (settings[0]) {
    res.status(200).json(settings[0]);
  } else {
    res.status(400);
    throw new Error('Could not get settings');
  }
});

//@desc Update Settings
//@route PUT /api/settings/update/?id=:id
//@access Private
const updateSettings = asyncHandler(async (req, res) => {
  //Check if admin is an Administrator
  if (req.admin.admin_level !== 'Administrator') {
    res.status(401);
    throw new Error('You are not authorized to perform this action');
  }
  const data = {
    ...req.body,
  };

  const settingsId = req.query.id;
  //Check if settingsId is missing
  if (!settingsId) {
    res.status(400);
    throw new Error('Settings id is missing');
  }

  const settings = await Settings.findByIdAndUpdate(settingsId, data, {
    new: true,
  });
  if (settings) {
    res.status(204).json({ message: 'Setting updated successfully' });
  } else {
    res.status(400);
    throw new Error('Settings could not be updated, please try again');
  }
});

module.exports = {
  createSettings,
  getSettings,
  updateSettings,
};
