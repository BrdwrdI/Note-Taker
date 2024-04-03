const router = require('espress').Router();

const apiRoutes = require('./apiRoutes');
const htmlRoutes = require('./htmlRoutes');

router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

module.exports = router;