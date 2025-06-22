const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getJurisdictions,
  createJurisdiction,
  updateJurisdiction,
  deleteJurisdiction,
} = require('../controllers/jurisdictionController');

// @route   GET api/jurisdictions
// @desc    Get all user jurisdictions
// @access  Private
router.get('/', auth, getJurisdictions);

// @route   POST api/jurisdictions
// @desc    Add new jurisdiction
// @access  Private
router.post('/', auth, createJurisdiction);

// @route   PUT api/jurisdictions/:id
// @desc    Update jurisdiction
// @access  Private
router.put('/:id', auth, updateJurisdiction);

// @route   DELETE api/jurisdictions/:id
// @desc    Delete jurisdiction
// @access  Private
router.delete('/:id', auth, deleteJurisdiction);

module.exports = router;
