const admin = require('firebase-admin');

module.exports = async (req, res, next) => {
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = { id: decodedToken.uid };
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
