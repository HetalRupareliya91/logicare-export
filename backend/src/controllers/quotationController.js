const Quotation = require('../models/Quotation');
const { asyncHandler, ApiError } = require('../middleware/errorHandler');
const { paginate } = require('../utils/apiFeatures');

exports.list = asyncHandler(async (req, res) => {
  const result = await paginate(Quotation, req.query, 'quoteNo');
  res.json({ success: true, ...result });
});

exports.get = asyncHandler(async (req, res) => {
  const item = await Quotation.findById(req.params.id);
  if (!item) throw new ApiError(404, 'Quotation not found');
  res.json({ success: true, data: item });
});

exports.create = asyncHandler(async (req, res) => {
  const item = await Quotation.create(req.body);
  res.status(201).json({ success: true, data: item });
});

exports.update = asyncHandler(async (req, res) => {
  const item = await Quotation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) throw new ApiError(404, 'Quotation not found');
  res.json({ success: true, data: item });
});

exports.remove = asyncHandler(async (req, res) => {
  const item = await Quotation.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, 'Quotation not found');
  res.json({ success: true, message: 'Quotation deleted' });
});
