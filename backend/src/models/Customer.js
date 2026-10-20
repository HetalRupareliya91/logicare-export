const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true, trim: true },
    contactName: { type: String, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    country: { type: String, trim: true },
    gstin: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Customer', customerSchema);
