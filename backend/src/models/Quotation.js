const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema(
  {
    quoteNo: { type: String, required: true, trim: true },
    customerName: { type: String, trim: true },
    incoterm: { type: String, trim: true },
    amount: { type: Number, default: 0 },
    validUntil: { type: Date },
    status: { type: String, trim: true, default: 'Pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quotation', quotationSchema);
