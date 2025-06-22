const Jurisdiction = require('../models/Jurisdiction');

// @desc    Get all jurisdictions for a user
// @route   GET /api/jurisdictions
// @access  Private
exports.getJurisdictions = async (req, res) => {
  try {
    const jurisdictions = await Jurisdiction.find({ user: req.user.id });
    res.json(jurisdictions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Create a jurisdiction
// @route   POST /api/jurisdictions
// @access  Private
exports.createJurisdiction = async (req, res) => {
  const { name, daysAllowed } = req.body;

  try {
    const newJurisdiction = new Jurisdiction({
      name,
      daysAllowed,
      user: req.user.id,
    });

    const jurisdiction = await newJurisdiction.save();
    res.json(jurisdiction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update a jurisdiction
// @route   PUT /api/jurisdictions/:id
// @access  Private
exports.updateJurisdiction = async (req, res) => {
  const { name, daysAllowed } = req.body;

  // Build jurisdiction object
  const jurisdictionFields = {};
  if (name) jurisdictionFields.name = name;
  if (daysAllowed) jurisdictionFields.daysAllowed = daysAllowed;

  try {
    let jurisdiction = await Jurisdiction.findById(req.params.id);

    if (!jurisdiction) return res.status(404).json({ msg: 'Jurisdiction not found' });

    // Make sure user owns jurisdiction
    if (jurisdiction.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    jurisdiction = await Jurisdiction.findByIdAndUpdate(
      req.params.id,
      { $set: jurisdictionFields },
      { new: true }
    );

    res.json(jurisdiction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete a jurisdiction
// @route   DELETE /api/jurisdictions/:id
// @access  Private
exports.deleteJurisdiction = async (req, res) => {
  try {
    let jurisdiction = await Jurisdiction.findById(req.params.id);

    if (!jurisdiction) return res.status(404).json({ msg: 'Jurisdiction not found' });

    // Make sure user owns jurisdiction
    if (jurisdiction.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Jurisdiction.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Jurisdiction removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
