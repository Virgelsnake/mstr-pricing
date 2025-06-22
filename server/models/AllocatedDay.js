const mongoose = require('mongoose');

const AllocatedDaySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  jurisdiction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'jurisdiction',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('allocatedDay', AllocatedDaySchema);
