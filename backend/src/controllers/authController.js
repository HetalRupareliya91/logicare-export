const jwt = require('jsonwebtoken');
const User = require('../models/User');
const env = require('../config/env');
const { asyncHandler, ApiError } = require('../middleware/errorHandler');

const sign = (user) =>
  jwt.sign({ id: user._id, role: user.role, name: user.name }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, company } = req.body;
  if (!name || !email || !password) throw new ApiError(400, 'Name, email and password are required');
  const user = await User.create({ name, email, password, company, role: 'customer' });
  res.status(201).json({ success: true, token: sign(user), user: user.toSafeJSON() });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: (email || '').toLowerCase() }).select('+password');
  if (!user || !(await user.comparePassword(password || ''))) throw new ApiError(401, 'Invalid email or password');
  res.json({ success: true, token: sign(user), user: user.toSafeJSON() });
});

exports.me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) throw new ApiError(404, 'User not found');
  res.json({ success: true, user: user.toSafeJSON() });
});
