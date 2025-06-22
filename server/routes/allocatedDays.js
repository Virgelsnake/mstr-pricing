const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAllocatedDays, allocateDay } = require('../controllers/allocatedDayController');

// @route   GET api/allocated-days
// @desc    Get all allocated days for a user
// @access  Private
router.get('/', auth, getAllocatedDays);

// @route   POST api/allocated-days
// @desc    Allocate a day
// @access  Private
router.post('/', auth, allocateDay);

module.exports = router;
