const AllocatedDay = require('../models/AllocatedDay');

// @route   GET api/allocated-days
// @desc    Get all allocated days for a user
// @access  Private
exports.getAllocatedDays = async (req, res) => {
  try {
    const allocatedDays = await AllocatedDay.find({ user: req.user.id }).populate(
      'jurisdiction',
      ['name']
    );
    res.json(allocatedDays);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   POST api/allocated-days
// @desc    Allocate a day
// @access  Private
exports.allocateDay = async (req, res) => {
  const { jurisdiction, date } = req.body;

  try {
    const newAllocatedDay = new AllocatedDay({
      user: req.user.id,
      jurisdiction,
      date,
    });

    const allocatedDay = await newAllocatedDay.save();
    res.json(allocatedDay);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
