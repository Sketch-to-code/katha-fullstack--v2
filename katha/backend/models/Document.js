const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    author: { type: String, default: 'Unknown' },
    fileUrl: { type: String, required: true },
    pageCount: { type: Number, default: 0 },
    hasNativeCover: { type: Boolean, default: false },
    coverUrl: { type: String },
    lastPageRead: { type: Number, default: 0 },
    lastOpenedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Document || mongoose.model('Document', documentSchema);
