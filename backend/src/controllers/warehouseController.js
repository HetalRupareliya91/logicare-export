const Warehouse = require('../models/Warehouse');
const { asyncHandler, ApiError } = require('../middleware/errorHandler');
const { paginate } = require('../utils/apiFeatures');

exports.list = asyncHandler(async (req, res) => {
  const result = await paginate(Warehouse, req.query, 'name');
  res.json({ success: true, ...result });
});

exports.get = asyncHandler(async (req, res) => {
  const item = await Warehouse.findById(req.params.id);
  if (!item) throw new ApiError(404, 'Warehouse not found');
  res.json({ success: true, data: item });
});

exports.create = asyncHandler(async (req, res) => {
  const item = await Warehouse.create(req.body);
  res.status(201).json({ success: true, data: item });
});

exports.update = asyncHandler(async (req, res) => {
  const item = await Warehouse.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) throw new ApiError(404, 'Warehouse not found');
  res.json({ success: true, data: item });
});

exports.remove = asyncHandler(async (req, res) => {
  const item = await Warehouse.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, 'Warehouse not found');
  res.json({ success: true, message: 'Warehouse deleted' });
});
