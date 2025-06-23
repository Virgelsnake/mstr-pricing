const express = require('express');
const router = express.Router();
const {
  getJurisdictions,
  createJurisdiction,
  updateJurisdiction,
  deleteJurisdiction,
} = require('../controllers/jurisdictionController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET api/jurisdictions
// @desc    Get all user jurisdictions
// @access  Private
router.use(authMiddleware);

router.route('/').get(getJurisdictions).post(createJurisdiction);

// @route   POST api/jurisdictions
// @desc    Add new jurisdiction
// @access  Private

// @route   PUT api/jurisdictions/:id
// @desc    Update jurisdiction
// @access  Private
router.route('/:id').put(updateJurisdiction).delete(deleteJurisdiction);

// @route   DELETE api/jurisdictions/:id
// @desc    Delete jurisdiction
// @access  Private


module.exports = router;
