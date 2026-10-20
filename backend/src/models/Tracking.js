const mongoose = require('mongoose');

const trackingSchema = new mongoose.Schema(
  {
    shipmentNo: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    event: { type: String, trim: true },
    eventTime: { type: Date },
    remarks: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Tracking', trackingSchema);
