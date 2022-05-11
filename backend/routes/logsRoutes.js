const express = require('express');
const router = express.Router();
const {
  createLog,
  getAllLogs,
  getLogsByJobId,
  searchLogs,
} = require('../controllers/logsController');
// Importing protect middleware
const { protect } = require('../middleware/authMiddleware');

router.post('/create', protect, createLog);
router.get('/get-all', protect, getAllLogs);
router.get('/get-logs-by-job-id', protect, getLogsByJobId);
router.get('/search-logs', protect, searchLogs);

module.exports = router;
