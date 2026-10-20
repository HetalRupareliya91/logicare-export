const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    period: { type: String, trim: true },
    generatedOn: { type: Date },
    summary: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);
