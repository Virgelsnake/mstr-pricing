const express = require('express');
const router = express.Router();
const { syncUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST api/auth/sync
// @desc    Sync user with Firestore database
// @access  Private
router.post('/sync', authMiddleware, syncUser);

module.exports = router;
