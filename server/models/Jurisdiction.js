const mongoose = require('mongoose');

const jurisdictionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  daysAllowed: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Jurisdiction', jurisdictionSchema);
