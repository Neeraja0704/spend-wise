const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    name: { type: String, required: true },
    password: { type: String, required: true }, // will be hashed in production
    avatar: String,
    budget: { type: Number, default: 5000 },
    currency: { type: String, default: 'INR' },
    loginMethod: { type: String, enum: ['email', 'google', 'github'], default: 'email' },
    settings: {
      emailNotifications: { type: Boolean, default: true },
      budgetAlerts: { type: Boolean, default: true },
      theme: { type: String, enum: ['light', 'dark'], default: 'light' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
