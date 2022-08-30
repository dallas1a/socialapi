const router = require('express').Router();
const UserRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

router.use('/users', UserRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;