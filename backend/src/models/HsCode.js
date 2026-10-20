const mongoose = require('mongoose');

const hsCodeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    dutyRate: { type: Number, default: 0 },
    gstRate: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('HsCode', hsCodeSchema);
