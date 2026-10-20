const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderNo: { type: String, required: true, trim: true },
    customerName: { type: String, trim: true },
    type: { type: String, trim: true },
    totalAmount: { type: Number, default: 0 },
    currency: { type: String, trim: true },
    orderDate: { type: Date },
    status: { type: String, trim: true, default: 'Pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
