const Customer = require('../models/Customer');
const { asyncHandler, ApiError } = require('../middleware/errorHandler');
const { paginate } = require('../utils/apiFeatures');

exports.list = asyncHandler(async (req, res) => {
  const result = await paginate(Customer, req.query, 'companyName');
  res.json({ success: true, ...result });
});

exports.get = asyncHandler(async (req, res) => {
  const item = await Customer.findById(req.params.id);
  if (!item) throw new ApiError(404, 'Customer not found');
  res.json({ success: true, data: item });
});

exports.create = asyncHandler(async (req, res) => {
  const item = await Customer.create(req.body);
  res.status(201).json({ success: true, data: item });
});

exports.update = asyncHandler(async (req, res) => {
  const item = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) throw new ApiError(404, 'Customer not found');
  res.json({ success: true, data: item });
});

exports.remove = asyncHandler(async (req, res) => {
  const item = await Customer.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, 'Customer not found');
  res.json({ success: true, message: 'Customer deleted' });
});
