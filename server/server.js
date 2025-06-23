const express = require('express');
const admin = require('firebase-admin');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());

// Firebase Admin SDK Setup
// IMPORTANT: Create a serviceAccountKey.json file in a 'config' directory.
// You can get this from your Firebase project settings.
// See: https://firebase.google.com/docs/admin/setup
let serviceAccount;
try {
  serviceAccount = require('./config/serviceAccountKey.json');
} catch (e) {
  console.error('Error: serviceAccountKey.json not found in ./config directory.');
  console.error('Please create the file with your Firebase service account credentials.');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log('Firebase Connected...');

// Expose firestore db to routes
app.use((req, res, next) => {
  req.db = admin.firestore();
  next();
});

// Use Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/jurisdictions', require('./routes/jurisdictions'));
app.use('/api/allocated-days', require('./routes/allocatedDays'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('../client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
