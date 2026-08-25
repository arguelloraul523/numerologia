// Fase 2-b: se crea app.js para centralizar Express y montar las 4 rutas por dominio.
// Fase 5: se agregan auditLogger (registra cada petición) y, al final,
// notFound + errorHandler (manejo de errores centralizado).
const express = require('express');

const { auditLogger } = require('./middlewares/audit.middleware');
const { errorHandler, notFound } = require('./middlewares/errorHandler');

const authRoutes = require('./routes/auth.routes');
const numerologyRoutes = require('./routes/numerology.routes');
const readingsRoutes = require('./routes/readings.routes');
const compatibilityRoutes = require('./routes/compatibility.routes');

const app = express();

app.use(express.json());
app.use(auditLogger);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API de Numerología funcionando',
  });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/numerology', numerologyRoutes);
app.use('/api/v1/readings', readingsRoutes);
app.use('/api/v1/compatibility', compatibilityRoutes);

// notFound y errorHandler siempre van al final, después de todas las rutas
app.use(notFound);
app.use(errorHandler);

module.exports = app;
