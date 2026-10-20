const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    docType: { type: String, trim: true },
    shipmentNo: { type: String, trim: true },
    fileUrl: { type: String, trim: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Document', documentSchema);
