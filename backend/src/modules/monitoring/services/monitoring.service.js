const MonitoringRepository = require('../repositories/monitoring.repository');
const AppError = require('../../../shared/utils/app-error');

class MonitoringService {
  constructor() {
    this.repository = new MonitoringRepository();
  }

  async recordTelemetry(sensorData) {
    if (!sensorData || !sensorData.plantId) {
      throw new AppError('Données de télémétrie invalides', 400);
    }

    return this.repository.createSensorData(sensorData);
  }

  async getTelemetryHistory(plantId, limit = 100) {
    if (!plantId || typeof plantId !== 'string') {
      throw new AppError('Identifiant de plante invalide', 400);
    }

    const normalizedLimit = Number.isInteger(limit) && limit > 0 ? limit : 100;
    return this.repository.getHistoryByPlantId(plantId, normalizedLimit);
  }
}

module.exports = MonitoringService;
