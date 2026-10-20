const Tracking = require('../models/Tracking');
const { asyncHandler, ApiError } = require('../middleware/errorHandler');
const { paginate } = require('../utils/apiFeatures');

exports.list = asyncHandler(async (req, res) => {
  const result = await paginate(Tracking, req.query, 'shipmentNo');
  res.json({ success: true, ...result });
});

exports.get = asyncHandler(async (req, res) => {
  const item = await Tracking.findById(req.params.id);
  if (!item) throw new ApiError(404, 'Tracking not found');
  res.json({ success: true, data: item });
});

exports.create = asyncHandler(async (req, res) => {
  const item = await Tracking.create(req.body);
  res.status(201).json({ success: true, data: item });
});

exports.update = asyncHandler(async (req, res) => {
  const item = await Tracking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) throw new ApiError(404, 'Tracking not found');
  res.json({ success: true, data: item });
});

exports.remove = asyncHandler(async (req, res) => {
  const item = await Tracking.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, 'Tracking not found');
  res.json({ success: true, message: 'Tracking deleted' });
});
