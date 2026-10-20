const mongoose = require('mongoose');

const containerSchema = new mongoose.Schema(
  {
    containerNo: { type: String, required: true, trim: true },
    size: { type: String, trim: true },
    sealNo: { type: String, trim: true },
    shipmentNo: { type: String, trim: true },
    grossWeight: { type: Number, default: 0 },
    isReefer: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Container', containerSchema);
