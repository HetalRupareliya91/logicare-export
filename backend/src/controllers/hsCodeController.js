const HsCode = require('../models/HsCode');
const { asyncHandler, ApiError } = require('../middleware/errorHandler');
const { paginate } = require('../utils/apiFeatures');

exports.list = asyncHandler(async (req, res) => {
  const result = await paginate(HsCode, req.query, 'code');
  res.json({ success: true, ...result });
});

exports.get = asyncHandler(async (req, res) => {
  const item = await HsCode.findById(req.params.id);
  if (!item) throw new ApiError(404, 'HsCode not found');
  res.json({ success: true, data: item });
});

exports.create = asyncHandler(async (req, res) => {
  const item = await HsCode.create(req.body);
  res.status(201).json({ success: true, data: item });
});

exports.update = asyncHandler(async (req, res) => {
  const item = await HsCode.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) throw new ApiError(404, 'HsCode not found');
  res.json({ success: true, data: item });
});

exports.remove = asyncHandler(async (req, res) => {
  const item = await HsCode.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, 'HsCode not found');
  res.json({ success: true, message: 'HsCode deleted' });
});
