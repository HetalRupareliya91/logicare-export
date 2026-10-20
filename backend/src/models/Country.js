const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    isoCode: { type: String, trim: true },
    region: { type: String, trim: true },
    restricted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Country', countrySchema);
