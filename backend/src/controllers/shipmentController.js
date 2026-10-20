const Shipment = require('../models/Shipment');
const { asyncHandler, ApiError } = require('../middleware/errorHandler');
const { paginate } = require('../utils/apiFeatures');

exports.list = asyncHandler(async (req, res) => {
  const result = await paginate(Shipment, req.query, 'shipmentNo');
  res.json({ success: true, ...result });
});

exports.get = asyncHandler(async (req, res) => {
  const item = await Shipment.findById(req.params.id);
  if (!item) throw new ApiError(404, 'Shipment not found');
  res.json({ success: true, data: item });
});

exports.create = asyncHandler(async (req, res) => {
  const item = await Shipment.create(req.body);
  res.status(201).json({ success: true, data: item });
});

exports.update = asyncHandler(async (req, res) => {
  const item = await Shipment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) throw new ApiError(404, 'Shipment not found');
  res.json({ success: true, data: item });
});

exports.remove = asyncHandler(async (req, res) => {
  const item = await Shipment.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, 'Shipment not found');
  res.json({ success: true, message: 'Shipment deleted' });
});
