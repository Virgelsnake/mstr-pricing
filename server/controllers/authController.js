const admin = require('firebase-admin');

// @desc    Sync user with Firestore
// @route   POST /api/auth/sync
// @access  Private
exports.syncUser = async (req, res) => {
  const { email, name } = req.body;
  const { id } = req.user; // uid from firebase

  try {
    const userRef = req.db.collection('users').doc(id);
    const doc = await userRef.get();

    if (!doc.exists) {
      // If user does not exist in Firestore, create them
      await userRef.set({
        name,
        email,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      console.log(`New user created in Firestore with UID: ${id}`);
    }

    res.json({ msg: 'User synced successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
