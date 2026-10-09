const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true },
    page: { type: Number, required: true },
    thumbnailUrl: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Bookmark || mongoose.model('Bookmark', bookmarkSchema);
