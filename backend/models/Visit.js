const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: String,
  time: String,
  propertyId: String,
  sellerId: String, // track seller to notify them
  assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
});

module.exports = mongoose.model('Visit', visitSchema);
