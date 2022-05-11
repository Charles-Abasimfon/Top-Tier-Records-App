const express = require('express');
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  getLoggedInAdminData,
  updateLoggedInAdminData,
  updateLoggedInAdminPassword,
  getAllRecordersAndModerators,
  getRecorderOrModeratorDataById,
  updateRecorderOrModeratorDataById,
  deleteRecorderOrModeratorById,
} = require('../controllers/adminController');
// Importing protect middleware
const { protect } = require('../middleware/authMiddleware');
const { onlyAdministrators } = require('../middleware/onlyAdministrators');

router.post('/register', protect, onlyAdministrators, registerAdmin);
router.post('/login', loginAdmin);
router.get('/get-logged-in-admin-data', protect, getLoggedInAdminData);
router.put(
  '/update-logged-in-admin-data',
  protect,
  onlyAdministrators,
  updateLoggedInAdminData
);
router.put(
  '/update-logged-in-admin-password',
  protect,
  updateLoggedInAdminPassword
);
router.get(
  '/get-all-recorders-and-moderators',
  protect,
  onlyAdministrators,
  getAllRecordersAndModerators
);
router.get(
  '/get-recorder-or-moderator-data',
  protect,
  onlyAdministrators,
  getRecorderOrModeratorDataById
);
router.put(
  '/update-recorder-or-moderator-data',
  protect,
  onlyAdministrators,
  updateRecorderOrModeratorDataById
);
router.delete(
  '/delete-recorder-or-moderator',
  protect,
  onlyAdministrators,
  deleteRecorderOrModeratorById
);

module.exports = router;
