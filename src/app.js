const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API de Numerología funcionando',
  });
});

// Rutas (las vas agregando conforme avances)
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/numerology', require('./routes/numerologyRoutes'));
app.use('/api/v1/readings', require('./routes/readingRoutes'));
app.use('/api/v1/compatibility', require('./routes/compatibilityRoutes'));

module.exports = app;