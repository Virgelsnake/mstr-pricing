const express = require('express');
const router = express.Router();
const { getAllocatedDays, allocateDay } = require('../controllers/allocatedDayController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET api/allocated-days
// @desc    Get all allocated days for a user
// @access  Private
router.use(authMiddleware);
router.route('/').get(getAllocatedDays).post(allocateDay);

module.exports = router;
