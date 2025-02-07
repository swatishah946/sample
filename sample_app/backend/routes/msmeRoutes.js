const express = require('express');
const router = express.Router();
const msmeController = require('../controllers/msmeController');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/shipments', authMiddleware, msmeController.createShipment);
router.get('/shipments', msmeController.getShipments);
router.get('/shipments/:id/tracking', msmeController.getShipmentTracking);
router.post('/aggregate-shipments', msmeController.aggregateShipments);
router.get('/matched-shipments', msmeController.getMatchedShipments);
router.post('/assign-provider', msmeController.assignProviderToLoad);

module.exports = router;
