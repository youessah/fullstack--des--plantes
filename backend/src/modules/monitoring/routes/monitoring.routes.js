const express = require('express');
const router = express.Router();
const {
  receiveTelemetry,
  getHistory,
} = require('../controllers/monitoring.controller');
const { validateSensorData } = require('../middlewares/validate-sensor.middleware');

router.post('/telemetry', validateSensorData, receiveTelemetry);
router.get('/history/:plantId', getHistory);

module.exports = router;
