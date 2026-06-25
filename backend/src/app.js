const express = require('express');
const cors = require('cors');
const AppError = require('./shared/utils/app-error');
const { authRouter, initAuthModule } = require('./modules/auth');
const { monitoringRouter, initMonitoringModule } = require('./modules/monitoring');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initAuthModule();
initMonitoringModule();

app.use('/api', authRouter);
app.use('/api', monitoringRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} non trouvée`, 404));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erreur interne du serveur';

  if (process.env.NODE_ENV !== 'production') {
    console.error('[ERROR]', err);
  }

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
});

module.exports = app;
