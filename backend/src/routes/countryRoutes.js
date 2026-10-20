const router = require('express').Router();
const c = require('../controllers/countryController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, c.list);
router.get('/:id', protect, c.get);
router.post('/', protect, authorize('admin', 'staff'), c.create);
router.put('/:id', protect, authorize('admin', 'staff'), c.update);
router.delete('/:id', protect, authorize('admin'), c.remove);

module.exports = { basePath: '/countries', router };
