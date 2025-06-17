const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['buyer', 'seller'], required: true },
    profile: {
      phone: String,
      address: String,
      preferences: Object
    }
}, { timestamps: true });

module.exports = model('User', UserSchema);