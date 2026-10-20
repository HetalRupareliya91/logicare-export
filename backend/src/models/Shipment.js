const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema(
  {
    shipmentNo: { type: String, required: true, trim: true },
    orderNo: { type: String, trim: true },
    mode: { type: String, trim: true },
    originPort: { type: String, trim: true },
    destinationPort: { type: String, trim: true },
    etd: { type: Date },
    eta: { type: Date },
    status: { type: String, trim: true, default: 'Pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Shipment', shipmentSchema);
