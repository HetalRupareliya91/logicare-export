const Carrier = require('../models/Carrier');
const { asyncHandler, ApiError } = require('../middleware/errorHandler');
const { paginate } = require('../utils/apiFeatures');

exports.list = asyncHandler(async (req, res) => {
  const result = await paginate(Carrier, req.query, 'name');
  res.json({ success: true, ...result });
});

exports.get = asyncHandler(async (req, res) => {
  const item = await Carrier.findById(req.params.id);
  if (!item) throw new ApiError(404, 'Carrier not found');
  res.json({ success: true, data: item });
});

exports.create = asyncHandler(async (req, res) => {
  const item = await Carrier.create(req.body);
  res.status(201).json({ success: true, data: item });
});

exports.update = asyncHandler(async (req, res) => {
  const item = await Carrier.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) throw new ApiError(404, 'Carrier not found');
  res.json({ success: true, data: item });
});

exports.remove = asyncHandler(async (req, res) => {
  const item = await Carrier.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, 'Carrier not found');
  res.json({ success: true, message: 'Carrier deleted' });
});
