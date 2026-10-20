const CustomsDeclaration = require('../models/CustomsDeclaration');
const { asyncHandler, ApiError } = require('../middleware/errorHandler');
const { paginate } = require('../utils/apiFeatures');

exports.list = asyncHandler(async (req, res) => {
  const result = await paginate(CustomsDeclaration, req.query, 'declarationNo');
  res.json({ success: true, ...result });
});

exports.get = asyncHandler(async (req, res) => {
  const item = await CustomsDeclaration.findById(req.params.id);
  if (!item) throw new ApiError(404, 'CustomsDeclaration not found');
  res.json({ success: true, data: item });
});

exports.create = asyncHandler(async (req, res) => {
  const item = await CustomsDeclaration.create(req.body);
  res.status(201).json({ success: true, data: item });
});

exports.update = asyncHandler(async (req, res) => {
  const item = await CustomsDeclaration.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) throw new ApiError(404, 'CustomsDeclaration not found');
  res.json({ success: true, data: item });
});

exports.remove = asyncHandler(async (req, res) => {
  const item = await CustomsDeclaration.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, 'CustomsDeclaration not found');
  res.json({ success: true, message: 'CustomsDeclaration deleted' });
});
