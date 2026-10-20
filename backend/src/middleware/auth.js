const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { ApiError } = require('./errorHandler');

const protect = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return next(new ApiError(401, 'Not authorized'));
  try {
    req.user = jwt.verify(token, env.jwtSecret);
    return next();
  } catch (e) {
    return next(new ApiError(401, 'Invalid or expired token'));
  }
};

const authorize = (...roles) => (req, res, next) =>
  roles.includes(req.user && req.user.role) ? next() : next(new ApiError(403, 'Forbidden'));

module.exports = { protect, authorize };
