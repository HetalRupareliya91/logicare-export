const { ApiError } = require('./errorHandler');

const requireFields = (...fields) => (req, res, next) => {
  const missing = fields.filter((f) => req.body[f] === undefined || req.body[f] === '');
  if (missing.length) return next(new ApiError(400, 'Missing fields: ' + missing.join(', ')));
  return next();
};

module.exports = { requireFields };
