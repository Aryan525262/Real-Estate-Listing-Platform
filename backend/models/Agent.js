const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  phone: {
    type: String,
    required: true,
  },

  profilePicture: {
    type: String, // URL to the profile image
  },

  experience: {
    type: Number, // In years
    default: 0,
  },

  specialties: {
    type: [String], // e.g., ['Residential', 'Commercial', 'Rentals']
    default: [],
  },

  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },

  isAvailable: {
    type: Boolean,
    default: true,
  },

  assignedVisits: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Visit',
    }
  ],

  ratings: {
    average: {
      type: Number,
      default: 0,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
  },

  bio: {
    type: String,
    maxlength: 1000,
  },

  dateJoined: {
    type: Date,
    default: Date.now,
  },
});

// Create a geospatial index on location field
agentSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Agent', agentSchema);