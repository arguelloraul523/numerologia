// Fase 5: puente entre express-validator y ApiError.
// Se usa despues de un arreglo de reglas de validacion en la ruta, ej:
// router.post('/login', loginValidators, validate, login)
const { validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

function validate(req, res, next) {
  const resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    const errores = resultado.array().map((err) => ({ campo: err.path, mensaje: err.msg }));
    return next(new ApiError(400, 'Error de validación en los datos enviados', errores));
  }

  next();
}

module.exports = validate;
