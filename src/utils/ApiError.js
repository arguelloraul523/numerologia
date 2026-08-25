// Fase 5: error personalizado con codigo HTTP.
// Se usa asi: throw new ApiError(404, 'mensaje') desde cualquier controlador,
// y el errorHandler central (src/middlewares/errorHandler.js) lo convierte
// en la respuesta JSON con ese mismo status code.
class ApiError extends Error {
  constructor(statusCode, message, errores = null) {
    super(message);
    this.statusCode = statusCode;
    this.errores = errores;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
