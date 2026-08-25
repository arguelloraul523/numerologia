// Fase 5: manejador de errores centralizado.
// Se registra al final de src/app.js, despues de todas las rutas.
// Cualquier error que llegue aqui (por next(error) o por asyncHandler)
// se traduce a una respuesta JSON con el status code correcto.
const ApiError = require('../utils/ApiError');

function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Error interno del servidor';
  let errores = err.errores || null;

  // Errores de validacion propios de Mongoose (ej. campos required en el modelo)
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Error de validación';
    errores = Object.values(err.errors).map((e) => ({ campo: e.path, mensaje: e.message }));
  }

  // Llave duplicada, ej. registrar un email que ya existe
  if (err.code === 11000) {
    statusCode = 409;
    const campo = Object.keys(err.keyValue || {})[0] || 'campo';
    message = `El valor de "${campo}" ya está en uso`;
  }

  // Errores lanzados por jwt.verify() en el middleware de auth (Fase 2-c)
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Token inválido';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expirado';
  }

  // Un ObjectId mal formado en la URL o el body
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Valor inválido para el campo "${err.path}"`;
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }

  res.status(statusCode).json({ success: false, message, errores });
}

// Cualquier ruta que no exista cae aqui antes de llegar al errorHandler
function notFound(req, res, next) {
  next(new ApiError(404, `Ruta no encontrada: ${req.method} ${req.originalUrl}`));
}

module.exports = { errorHandler, notFound };
