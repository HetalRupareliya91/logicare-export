const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    reference: { type: String, required: true, trim: true },
    invoiceNo: { type: String, trim: true },
    amount: { type: Number, default: 0 },
    method: { type: String, trim: true },
    paidOn: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);
