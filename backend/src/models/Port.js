const mongoose = require('mongoose');

const portSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, trim: true },
    country: { type: String, trim: true },
    type: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Port', portSchema);
