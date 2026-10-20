const router = require('express').Router();
const c = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { requireFields } = require('../middleware/validate');

router.post('/register', requireFields('name', 'email', 'password'), c.register);
router.post('/login', requireFields('email', 'password'), c.login);
router.get('/me', protect, c.me);

module.exports = { basePath: '/auth', router };
