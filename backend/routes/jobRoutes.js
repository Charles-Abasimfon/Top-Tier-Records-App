const express = require('express');
const router = express.Router();
const {
  addJob,
  getAllJobs,
  getJobInfoById,
  updateJobDataById,
  getAllPendingJobs,
  getAllLateJobs,
  getAllCompletedJobs,
  searchJobs,
} = require('../controllers/jobController');
// Importing protect middleware
const { protect } = require('../middleware/authMiddleware');
// Importing enforce settings middleware
const { enforceSettings } = require('../middleware/enforceSettingsMiddleware');

router.post('/add', protect, enforceSettings, addJob);
router.get('/get-all', protect, getAllJobs);
router.get('/get-job-data', protect, getJobInfoById);
router.put('/update-job-data', protect, enforceSettings, updateJobDataById);
router.get('/get-all-pending-jobs', protect, getAllPendingJobs);
router.get('/get-all-late-jobs', protect, getAllLateJobs);
router.get('/get-all-completed-jobs', protect, getAllCompletedJobs);
router.get('/search-jobs', protect, searchJobs);

module.exports = router;
