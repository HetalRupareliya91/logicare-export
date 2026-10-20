const mongoose = require('mongoose');

const carrierSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    scac: { type: String, trim: true },
    mode: { type: String, trim: true },
    contactEmail: { type: String, trim: true },
    active: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Carrier', carrierSchema);
