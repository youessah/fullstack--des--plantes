const eventBus = require('../../../shared/events/event-bus');

const MONITORING_EVENTS = {
  SENSOR_DATA_RECEIVED: 'SENSOR_DATA_RECEIVED',
};

const publishSensorDataReceived = (payload) => {
  eventBus.emit(MONITORING_EVENTS.SENSOR_DATA_RECEIVED, payload);
};

const registerMonitoringEvents = () => {
  // Module-local event listeners can be added here if nécessaire.
};

module.exports = {
  MONITORING_EVENTS,
  publishSensorDataReceived,
  registerMonitoringEvents,
};
