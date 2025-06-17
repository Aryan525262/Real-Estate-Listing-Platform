const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  sellerId: String,
  visitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Visit' },
  message: String,
  isRead: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notificationSchema);
