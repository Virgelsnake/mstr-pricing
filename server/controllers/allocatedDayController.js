// @route   GET api/allocated-days
// @desc    Get all allocated days for a user
// @access  Private
exports.getAllocatedDays = async (req, res) => {
  try {
    const allocatedDaysRef = req.db.collection('allocatedDays');
    const snapshot = await allocatedDaysRef.where('userId', '==', req.user.id).get();

    if (snapshot.empty) {
      return res.json([]);
    }

    const allocatedDays = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
  const { jurisdictionId, date } = req.body;

  try {
    // Get jurisdiction name for denormalization
    const jurisdictionRef = req.db.collection('jurisdictions').doc(jurisdictionId);
    const jurisdictionDoc = await jurisdictionRef.get();
    if (!jurisdictionDoc.exists) {
      return res.status(404).json({ msg: 'Jurisdiction not found' });
    }

    const newAllocatedDay = {
      userId: req.user.id,
      jurisdictionId,
      jurisdictionName: jurisdictionDoc.data().name, // Denormalization
      date,
    };

    const docRef = await req.db.collection('allocatedDays').add(newAllocatedDay);
    res.json({ id: docRef.id, ...newAllocatedDay });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
