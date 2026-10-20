const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema(
  {
    code: { type: String, required: true, trim: true },
    name: { type: String, trim: true },
    symbol: { type: String, trim: true },
    rateToInr: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Currency', currencySchema);
