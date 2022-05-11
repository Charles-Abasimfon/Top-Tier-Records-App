const express = require('express');
const router = express.Router();
const {
  createSettings,
  getSettings,
  updateSettings,
} = require('../controllers/settingsController');
// Importing protect middleware
const { protect } = require('../middleware/authMiddleware');
const { onlyAdministrators } = require('../middleware/onlyAdministrators');

router.post('/create', protect, onlyAdministrators, createSettings);
router.get('/get', protect, getSettings);
router.put('/update', protect, onlyAdministrators, updateSettings);

module.exports = router;
