const { z } = require('zod');
const AppError = require('../../../shared/utils/app-error');

const sensorSchema = z.object({
  plantId: z.string().min(1, "L'identifiant de la plante est requis"),
  temperature: z.coerce
    .number({ invalid_type_error: 'La température doit être un nombre' })
    .nonnegative('La température doit être positive'),
  humidity: z.coerce
    .number({ invalid_type_error: "L'humidité doit être un nombre" })
    .nonnegative("L'humidité doit être positive"),
  light: z.coerce
    .number({ invalid_type_error: 'La luminosité doit être un nombre' })
    .nonnegative('La luminosité doit être positive'),
});

const validateSensorData = (req, res, next) => {
  try {
    const validated = sensorSchema.parse(req.body);
    req.validated = validated;
    next();
  } catch (error) {
    const message = error.errors?.[0]?.message || 'Erreur de validation des données de capteur';
    next(new AppError(message, 400));
  }
};

module.exports = {
  validateSensorData,
};
