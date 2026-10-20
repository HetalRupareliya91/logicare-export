const mongoose = require('mongoose');

const customsDeclarationSchema = new mongoose.Schema(
  {
    declarationNo: { type: String, required: true, trim: true },
    shipmentNo: { type: String, trim: true },
    type: { type: String, trim: true },
    dutyAmount: { type: Number, default: 0 },
    filedOn: { type: Date },
    status: { type: String, trim: true, default: 'Pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CustomsDeclaration', customsDeclarationSchema);
