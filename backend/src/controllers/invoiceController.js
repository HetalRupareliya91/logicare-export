const Invoice = require('../models/Invoice');
const { asyncHandler, ApiError } = require('../middleware/errorHandler');
const { paginate } = require('../utils/apiFeatures');

exports.list = asyncHandler(async (req, res) => {
  const result = await paginate(Invoice, req.query, 'invoiceNo');
  res.json({ success: true, ...result });
});

exports.get = asyncHandler(async (req, res) => {
  const item = await Invoice.findById(req.params.id);
  if (!item) throw new ApiError(404, 'Invoice not found');
  res.json({ success: true, data: item });
});

exports.create = asyncHandler(async (req, res) => {
  const item = await Invoice.create(req.body);
  res.status(201).json({ success: true, data: item });
});

exports.update = asyncHandler(async (req, res) => {
  const item = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) throw new ApiError(404, 'Invoice not found');
  res.json({ success: true, data: item });
});

exports.remove = asyncHandler(async (req, res) => {
  const item = await Invoice.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, 'Invoice not found');
  res.json({ success: true, message: 'Invoice deleted' });
});
