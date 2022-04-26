const { Router } = require('express');
const ridesController = require('../controllers/rides-controller');
const { requireAuth } = require('../middleware/auth-middleware');
const router = Router();

router.post('/create', requireAuth, ridesController.createRide);
router.get('/open', ridesController.getOpenRides);

module.exports = router;
