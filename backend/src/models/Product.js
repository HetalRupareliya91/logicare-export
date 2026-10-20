const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    sku: { type: String, trim: true },
    hsCode: { type: String, trim: true },
    unitPrice: { type: Number, default: 0 },
    unit: { type: String, trim: true },
    originCountry: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
