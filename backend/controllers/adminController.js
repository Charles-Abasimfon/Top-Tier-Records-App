const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// Importing Admin Model
const Admin = require('../models/adminModel');

//@desc To Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//@desc Register Administrator/Recorder/Moderator
//@route POST /api/admin/register
//@access Private
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, admin_level, password, confirmPassword } = req.body;

  // Check for missing required fields: name, email, password, confirmPassword, admin_level
  if (!name || !email || !admin_level || !password || !confirmPassword) {
    res.status(400);
    throw new Error('Please enter all required fields');
  }

  // Checks for existing admin
  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    res.status(400);
    throw new Error(
      'An administrator, recorder or moderator with this email already exists'
    );
  }

  //Check for password match
  if (password !== confirmPassword) {
    res.status(400);
    throw new Error('Passwords do not match');
  }

  //Hash admin password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create admin
  const admin = await Admin.create({ ...req.body, password: hashedPassword });

  if (admin) {
    res.status(201).json({
      shorter_id: admin.shorter_id,
      name: admin.name,
      email: admin.email,
      admin_level: admin.admin_level,
      status: admin.status,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error('Account could not be created');
  }
});

//@desc Login Administrator/Recorder/Moderator
//@route POST /api/admin/login
//@access Public
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for missing fields: email, password
  if (!email || !password) {
    res.status(400);
    throw new Error('Please enter all fields');
  }

  // Check for existing admin
  const admin = await Admin.findOne({ email });
  if (!admin) {
    res.status(400);
    throw new Error(
      'An administrator, recorder or moderator with this email does not exist'
    );
  }

  //Check for password match
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    res.status(400);
    throw new Error('Incorrect password');
  }

  //If admin is found and password is correct
  res.status(201).json({
    shorter_id: admin.shorter_id,
    name: admin.name,
    email: admin.email,
    admin_level: admin.admin_level,
    status: admin.status,
    token: generateToken(admin._id),
  });
});

//@desc Get Logged In Administrator/Recorder/Moderator Data
//@route GET /api/admin/get-logged-in-admin-data
//@access Private
const getLoggedInAdminData = asyncHandler(async (req, res) => {
  res.status(200).json(req.admin);
});

//@desc Update Logged In Administrator Data
//@route PUT /api/admin/update-logged-in-admin-data
//@access Private (Only accessible by admins who are Administrators)
const updateLoggedInAdminData = asyncHandler(async (req, res) => {
  //Check if admin is an Administrator
  if (req.admin.admin_level !== 'Administrator') {
    res.status(401);
    throw new Error('You are not authorized to perform this action');
  }
  const { name, email } = req.body;
  // Check for missing required fields: name, email
  if (!name || !email) {
    res.status(400);
    throw new Error('Please enter all required fields');
  }
  // Check for existing admin with new email
  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    //Check if admin is the same as the logged in admin
    if (adminExists._id.toString() !== req.admin._id.toString()) {
      res.status(400);
      throw new Error(
        'Another administrator, recorder or moderator with this email already exist'
      );
    }
  }
  //Update Admin
  const updatedAdmin = await Admin.findByIdAndUpdate(
    req.admin._id,
    {
      ...req.body,
    },
    { new: true }
  );
  if (updatedAdmin) {
    res.status(201).json({
      shorter_id: updatedAdmin.shorter_id,
      name: updatedAdmin.name,
      email: updatedAdmin.email,
      admin_level: updatedAdmin.admin_level,
      status: updatedAdmin.status,
      token: generateToken(updatedAdmin._id),
    });
  } else {
    res.status(400);
    throw new Error('Update failed, Please try again later.');
  }
});

//@desc Update Logged In Administrator/Recorder/Moderator Password
//@route PUT /api/admin/update-logged-in-admin-password
//@access Private
const updateLoggedInAdminPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  // Check for missing fields: password, confirmPassword
  if (!oldPassword || !newPassword || !confirmNewPassword) {
    res.status(400);
    throw new Error('Please enter all required fields');
  }
  //Check for password match
  if (newPassword !== confirmNewPassword) {
    res.status(400);
    throw new Error('Passwords do not match');
  }
  //Confirm old password
  const admin = await Admin.findById(req.admin._id);
  const isMatch = await bcrypt.compare(oldPassword, admin.password);
  if (!isMatch) {
    res.status(400);
    throw new Error('Old password is Incorrect');
  }
  //Confirm new password length
  if (newPassword.length < 8) {
    res.status(400);
    throw new Error('Password must be at least 8 characters long');
  }
  //Hash new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  //Update Admin
  const updatedAdmin = await Admin.findByIdAndUpdate(
    req.admin._id,
    {
      password: hashedPassword,
    },
    { new: true }
  );

  if (updatedAdmin) {
    res.status(201).json({ message: 'SUCCESSFULLY CHANGED PASSWORD' });
  } else {
    res.status(400);
    throw new Error('Password change failed, Please try again later.');
  }
});

//@desc Get All Recorders & Moderators
//@route GET /api/admin/get-all-recorders-and-moderators
//@access Private
const getAllRecordersAndModerators = asyncHandler(async (req, res) => {
  const recorders_and_moderators = await Admin.find({
    admin_level: { $ne: 'Administrator' },
  })
    .select('-password')
    .sort({ _id: -1 })
    .limit(0);
  res.status(200).json(recorders_and_moderators);
});

//@desc Get A Recorder's or Moderator's Info By Id (id is passed as a parameter)
//@route GET /api/admin/get-recorder-or-moderator-data/?id=:id
//@access Private
const getRecorderOrModeratorDataById = asyncHandler(async (req, res) => {
  const adminId = req.query.id;

  // Check for missing id tag
  if (!adminId) {
    res.status(400);
    throw new Error('Missing id tag');
  }
  // Check for existing admin
  const admin = await Admin.findById(adminId).select('-password');
  if (!admin) {
    res.status(400);
    throw new Error('A recorder or moderator with this id does not exist');
  }
  //If admin/recorder is found
  res.status(201).json(admin);
});

//@desc Update A Recorder or Moderator By Id (id and updateJustStatus are passed as a parameter)
//@route PUT /api/admin/update-recorder-or-moderator-data/?id=:id&updateJustStatus=:updateJustStatus
//@access Private (Only accessible by admins who are Administrators)
const updateRecorderOrModeratorDataById = asyncHandler(async (req, res) => {
  const recorderOrModeratorId = req.query.id;
  const updateJustStatus = req.query.updateJustStatus;
  const { name, email } = req.body;

  //Check if admin is not an Administrator
  if (req.admin.admin_level !== 'Administrator') {
    res.status(400);
    throw new Error('You are not authorized to perform this action');
  }

  // Check for missing id query
  if (!recorderOrModeratorId) {
    res.status(400);
    throw new Error('Missing id query');
  }

  //Check for missing updateJustStatus query
  if (!updateJustStatus) {
    res.status(400);
    throw new Error('Missing updateJustStatus query');
  }

  // If updateJustStatus !== 'true', Do the following:
  if (updateJustStatus !== 'true') {
    // Check for missing required fields: name, email, password, telegram
    if (!name || !email) {
      res.status(400);
      throw new Error('Please enter all required fields');
    }
    // Check for existing recorder or moderator with new email
    const recorderOrModeratorExists = await Admin.findOne({ email });
    if (recorderOrModeratorExists) {
      //Check if recorder or moderator is the same as the recorder or moderator to be updated
      if (
        recorderOrModeratorExists._id.toString() !==
        recorderOrModeratorId.toString()
      ) {
        res.status(400);
        throw new Error('An admin/recorder with this email already exists');
      }
    }
  }
  //Updated RecorderOrModerator
  const updatedRecorderOrModerator = await Admin.findByIdAndUpdate(
    recorderOrModeratorId,
    { ...req.body },
    { new: true }
  ).select('-password');
  if (updatedRecorderOrModerator) {
    res.status(201).json(updatedRecorderOrModerator);
  } else {
    res.status(400);
    throw new Error('Recorder/Moderator could not be updated');
  }
});

//@desc Delete A Recorder or Moderator By Id (id is passed as a parameter)
//@route DELETE /api/admin/delete-recorder-or-moderator/?id=:id
//@access Private
const deleteRecorderOrModeratorById = asyncHandler(async (req, res) => {
  const recorderOrModeratorId = req.query.id;
  if (!recorderOrModeratorId) {
    res.status(400);
    throw new Error('Missing id query');
  }
  //Check for existing recorder or moderator
  const recorderOrModerator = await Admin.findById(recorderOrModeratorId);
  if (!recorderOrModerator) {
    res.status(400);
    throw new Error('A Recorder or Moderator with this id does not exist');
  }
  //Delete Recorder or Moderator
  const deletedRecorderOrModerator = await Admin.findByIdAndDelete(
    recorderOrModeratorId
  );
  if (deletedRecorderOrModerator) {
    res
      .status(204)
      .json({ message: 'Recorder/Moderator Deleted Successfully' });
  } else {
    res.status(400);
    throw new Error('Recorder/Moderator could not be deleted');
  }
});

module.exports = {
  registerAdmin,
  loginAdmin,
  getLoggedInAdminData,
  updateLoggedInAdminData,
  updateLoggedInAdminPassword,
  getAllRecordersAndModerators,
  getRecorderOrModeratorDataById,
  updateRecorderOrModeratorDataById,
  deleteRecorderOrModeratorById,
};
