// Fase 5: registro de auditoria. Se monta en src/app.js sobre todas las rutas.
// Usa el evento "finish" de la respuesta para guardar el log SIN bloquear
// ni retrasar la respuesta al cliente (el guardado ocurre despues de responder).
const AuditLog = require('../models/AuditLog');

function auditLogger(req, res, next) {
  res.on('finish', () => {
    AuditLog.create({
      endpoint: req.originalUrl,
      metodo: req.method,
      status_code: res.statusCode,
      user: req.user ? req.user.id : undefined,
    }).catch((err) => {
      console.error('No se pudo guardar el AuditLog:', err.message);
    });
  });

  next();
}

module.exports = { auditLogger };
