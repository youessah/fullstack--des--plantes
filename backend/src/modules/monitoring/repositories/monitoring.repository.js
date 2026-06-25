const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema(
  {
    plantId: {
      type: String,
      required: true,
      index: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
    light: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    versionKey: false,
  }
);

sensorDataSchema.index({ plantId: 1, createdAt: -1 });

const SensorDataModel = mongoose.models.SensorData || mongoose.model('SensorData', sensorDataSchema);

class MonitoringRepository {
  async createSensorData(sensorData) {
    return SensorDataModel.create(sensorData);
  }

  async getHistoryByPlantId(plantId, limit = 100) {
    return SensorDataModel.find({ plantId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
  }
}

module.exports = MonitoringRepository;
