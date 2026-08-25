// Fase 5: envuelve un controlador async para no repetir try/catch en cada uno.
// Si la funcion envuelta lanza un error (o hace throw new ApiError(...)),
// asyncHandler lo atrapa y lo manda a next(error), que termina en errorHandler.
function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = asyncHandler;
