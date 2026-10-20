const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNo: { type: String, required: true, trim: true },
    customerName: { type: String, trim: true },
    amount: { type: Number, default: 0 },
    currency: { type: String, trim: true },
    issueDate: { type: Date },
    dueDate: { type: Date },
    status: { type: String, trim: true, default: 'Pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Invoice', invoiceSchema);
