const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    preferences: {
      theme: { type: String, enum: ['light', 'dark', 'sepia'], default: 'sepia' },
      readingMode: { type: String, enum: ['leisure', 'academic'], default: 'leisure' },
      soundscape: { type: String, default: 'none' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
