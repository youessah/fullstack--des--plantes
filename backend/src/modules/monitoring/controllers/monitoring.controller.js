const MonitoringService = require('../services/monitoring.service');
const { publishSensorDataReceived } = require('../events/monitoring.events');
const AppError = require('../../../shared/utils/app-error');

const monitoringService = new MonitoringService();

const receiveTelemetry = async (req, res, next) => {
  try {
    const telemetry = req.validated;
    const sensorData = await monitoringService.recordTelemetry(telemetry);

    publishSensorDataReceived(sensorData);

    res.status(201).json({
      status: 'success',
      message: 'Télémétrie enregistrée avec succès',
      data: sensorData,
    });
  } catch (error) {
    next(error);
  }
};

const getHistory = async (req, res, next) => {
  try {
    const { plantId } = req.params;
    if (!plantId) {
      throw new AppError('Identifiant de plante manquant', 400);
    }

    let limit = Number(req.query.limit) || 100;
    if (!Number.isInteger(limit) || limit <= 0) {
      limit = 100;
    }
    if (limit > 1000) {
      limit = 1000;
    }

    const history = await monitoringService.getTelemetryHistory(plantId, limit);

    res.status(200).json({
      status: 'success',
      data: history,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  receiveTelemetry,
  getHistory,
};
