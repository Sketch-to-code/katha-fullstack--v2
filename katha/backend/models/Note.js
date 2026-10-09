const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true },
    page: { type: Number, required: true },
    highlightedText: { type: String },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Note || mongoose.model('Note', noteSchema);
