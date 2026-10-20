const Document = require('../models/Document');
const { asyncHandler, ApiError } = require('../middleware/errorHandler');
const { paginate } = require('../utils/apiFeatures');

exports.list = asyncHandler(async (req, res) => {
  const result = await paginate(Document, req.query, 'title');
  res.json({ success: true, ...result });
});

exports.get = asyncHandler(async (req, res) => {
  const item = await Document.findById(req.params.id);
  if (!item) throw new ApiError(404, 'Document not found');
  res.json({ success: true, data: item });
});

exports.create = asyncHandler(async (req, res) => {
  const item = await Document.create(req.body);
  res.status(201).json({ success: true, data: item });
});

exports.update = asyncHandler(async (req, res) => {
  const item = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) throw new ApiError(404, 'Document not found');
  res.json({ success: true, data: item });
});

exports.remove = asyncHandler(async (req, res) => {
  const item = await Document.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, 'Document not found');
  res.json({ success: true, message: 'Document deleted' });
});
