const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true, trim: true },
    contactName: { type: String, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    country: { type: String, trim: true },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Supplier', supplierSchema);
