const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    capacity: { type: Number, default: 0 },
    manager: { type: String, trim: true },
    bonded: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Warehouse', warehouseSchema);
