// @desc    Get all jurisdictions for a user
// @route   GET /api/jurisdictions
// @access  Private
exports.getJurisdictions = async (req, res) => {
  try {
    const jurisdictionsRef = req.db.collection('jurisdictions');
    const snapshot = await jurisdictionsRef.where('userId', '==', req.user.id).get();

    if (snapshot.empty) {
      return res.json([]);
    }

    const jurisdictions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
    const newJurisdiction = {
      name,
      daysAllowed,
      userId: req.user.id,
    };

    const docRef = await req.db.collection('jurisdictions').add(newJurisdiction);
    res.json({ id: docRef.id, ...newJurisdiction });
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

  try {
    const jurisdictionRef = req.db.collection('jurisdictions').doc(req.params.id);
    const doc = await jurisdictionRef.get();

    if (!doc.exists) {
      return res.status(404).json({ msg: 'Jurisdiction not found' });
    }

    if (doc.data().userId !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (daysAllowed) updatedFields.daysAllowed = daysAllowed;

    await jurisdictionRef.update(updatedFields);

    res.json({ id: req.params.id, ...doc.data(), ...updatedFields });
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
    const jurisdictionRef = req.db.collection('jurisdictions').doc(req.params.id);
    const doc = await jurisdictionRef.get();

    if (!doc.exists) {
      return res.status(404).json({ msg: 'Jurisdiction not found' });
    }

    if (doc.data().userId !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await jurisdictionRef.delete();

    res.json({ msg: 'Jurisdiction removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
